import { SummaryBar } from '~/components/SummaryBar';

describe('<SummaryBar />', () => {
  beforeEach(() => {
    cy.mount(<SummaryBar subjects={67985} nodes={16} communities={11} countries={7} />);
  });

  it('should render all four labels', () => {
    ['Total subjects', 'Federated nodes', 'Communities', 'Countries'].forEach((label) => {
      cy.get('[data-cy="summary-bar"]').should('contain', label);
    });
  });

  it('should render the values with thousands separators', () => {
    cy.get('[data-cy="summary-subjects"]').should('have.text', '67,985');
    cy.get('[data-cy="summary-nodes"]').should('have.text', '16');
    cy.get('[data-cy="summary-communities"]').should('have.text', '11');
    cy.get('[data-cy="summary-countries"]').should('have.text', '7');
  });
});
