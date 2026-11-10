import { Header } from '~/components/Header';

describe('Header', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('should render the logo, the title as an h1 and the tagline', () => {
    cy.get('[data-cy="header"] img').should('have.attr', 'alt', 'Neurobagel logo');
    cy.get('h1').should('have.text', 'Neurobagel Atlas');
    cy.get('[data-cy="header"]').should(
      'contain',
      'Explore the communities and nodes of the Neurobagel network'
    );
  });

  [
    { key: 'about', label: 'About Neurobagel', href: 'https://neurobagel.org' },
    {
      key: 'connect',
      label: 'Connect a node',
      href: 'https://neurobagel.org/user_guide/production_deployment/#making-your-node-publicly-discoverable',
    },
    { key: 'github', label: 'GitHub', href: 'https://github.com/neurobagel' },
  ].forEach(({ key, label, href }) => {
    it(`should link the ${label} button to its page in a new tab`, () => {
      cy.get(`[data-cy="header-${key}"]`)
        .should('have.attr', 'href', href)
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer')
        .and('have.attr', 'aria-label', label);
    });
  });
});
