describe('Orders Flow', () => {
  it('should create order after wizard', () => {
    cy.visit('/constructor');
    // Заполнить wizard (аналогично constructor.cy.ts)
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/orders/success');
  });
});
