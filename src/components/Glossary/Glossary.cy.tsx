import { Glossary } from '~/components/Glossary';
import { GLOSSARY } from '~/utils/constants';

describe('Glossary', () => {
  it('should render every term and definition when open', () => {
    cy.mount(<Glossary open onClose={cy.stub()} />);

    cy.get('[data-cy="glossary"]').should('contain', 'Glossary');
    GLOSSARY.forEach(({ term, definition }) => {
      cy.contains('dt', term).should('be.visible');
      cy.contains('dd', definition).should('be.visible');
    });
  });

  it('should give each term a data-cy built from its lowercased name', () => {
    cy.mount(<Glossary open onClose={cy.stub()} />);

    cy.get('[data-cy="glossary-term-node"]').should('contain', 'Node');
    cy.get('[data-cy="glossary-term-active-community"]').should('contain', 'Active (community)');
    cy.get('[data-cy="glossary-term-onboarding-community"]').should(
      'contain',
      'Onboarding (community)'
    );
  });

  it('should render nothing when closed', () => {
    cy.mount(<Glossary open={false} onClose={cy.stub()} />);

    cy.get('[data-cy="glossary"]').should('not.exist');
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Glossary open onClose={onClose} />);

    cy.get('[data-cy="glossary-close"]')
      .should('have.attr', 'aria-label', 'Close glossary')
      .click();
    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('should call onClose when Escape is pressed', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Glossary open onClose={onClose} />);

    cy.get('body').type('{esc}');
    cy.get('@onClose').should('have.been.calledOnce');
  });
});
