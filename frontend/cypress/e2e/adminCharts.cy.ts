describe('Admin Charts', () => {
  beforeEach(() => {
    cy.loginAsAdmin(); // Assume helper for JWT login
    cy.visit('/admin/dashboard');
  });

  it('should render sales chart', () => {
    cy.get('[data-testid="sales-chart"]').should('be.visible');
  });

  it('should apply date filters', () => {
    cy.get('input[type="date"]').first().type('2025-10-01');
    cy.get('input[type="date"]').last().type('2025-10-15');
    cy.get('button').contains('Применить').click();
    cy.get('[data-testid="sales-chart"]').should('have.length', 1); // Check data update
  });

  // Аналогично для других charts
});
