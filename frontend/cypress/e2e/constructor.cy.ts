describe('Cake Constructor Wizard', () => {
  it('should complete wizard and calculate price', () => {
    cy.visit('/constructor');
    cy.get('[data-step="0"]').within(() => {
      // Upload sketch (mock file)
      cy.get('input[type="file"]').selectFile('cypress/fixtures/sketch.png');
    });
    cy.get('button[type="button"]').contains('Далее').click();
    // Fill colors
    cy.get('input[placeholder*="Цвет"]').type('#FF0000');
    cy.get('button').contains('Далее').click();
    // ... аналогично для fillings/tiers
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/payment'); // Redirect check
    cy.contains('Предварительная стоимость').should('be.visible');
  });
});
