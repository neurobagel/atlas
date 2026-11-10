describe('Main user flow', () => {
  it('should load the app and render active and onboarding community cards', () => {
    cy.visit('/');
    cy.get('[data-cy="community-list"]').should('be.visible');
    cy.get('[data-cy="community-card-neurobagel"]').should('contain', 'Neurobagel');
    cy.get('[data-cy="community-card-nichy"]').should('contain', 'NICHY');
  });

  it('should select one card at a time and deselect on a second click', () => {
    cy.visit('/');
    const card = (id: string) => `[data-cy="community-card-${id}"]`;

    // The selected card is the one with the highlight shadow
    cy.get(card('neurobagel')).click();
    cy.get(card('neurobagel')).should('not.have.css', 'box-shadow', 'none');

    cy.get(card('scand')).click();
    cy.get(card('scand')).should('not.have.css', 'box-shadow', 'none');
    cy.get(card('neurobagel')).should('have.css', 'box-shadow', 'none');

    cy.get(card('scand')).click();
    cy.get(card('scand')).should('have.css', 'box-shadow', 'none');
  });

  it("should highlight the selected community's pins on the map and dim the rest", () => {
    cy.visit('/');
    const pin = (id: string) => `[data-cy="map-pin-${id}"]`;

    cy.get('[data-cy="community-card-enigma-pd"]').click();
    ['amsterdam-umc', 'umc-groningen', 'radboud-umc', 'mcgill'].forEach((id) => {
      cy.get(pin(id)).should('have.attr', 'data-state', 'highlighted');
    });
    ['openneuro', 'camh'].forEach((id) => {
      cy.get(pin(id)).should('have.attr', 'data-state', 'dimmed');
    });

    cy.get('[data-cy="community-card-enigma-pd"]').click();
    ['amsterdam-umc', 'openneuro', 'camh'].forEach((id) => {
      cy.get(pin(id)).should('have.attr', 'data-state', 'default');
    });
  });

  it('should show the community stats on active cards instead of loading skeletons', () => {
    cy.visit('/');
    const card = '[data-cy="community-card-enigma-pd"]';

    cy.get(`${card} [data-cy="stat-cell-subjects"]`).should('contain', '2151');
    cy.get(`${card} [data-cy="stat-cell-datasets"]`).should('contain', '12');
    cy.get(`${card} [data-cy$="-loading"]`).should('not.exist');
  });

  it('should show the network totals in the summary bar', () => {
    cy.visit('/');

    cy.get('[data-cy="summary-subjects"]').should('have.text', '121,409');
    cy.get('[data-cy="summary-nodes"]').should('have.text', '16');
    cy.get('[data-cy="summary-communities"]').should('have.text', '11');
    cy.get('[data-cy="summary-countries"]').should('have.text', '7');
  });
});
