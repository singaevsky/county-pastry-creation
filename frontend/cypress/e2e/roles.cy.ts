describe('Roles UI Access', () => {
  const login = (role: string) => {
    cy.intercept('POST', '/auth/login', { statusCode: 200, body: { accessToken: 'mock-token' } }).as('login');
    cy.visit('/login');
    cy.get('input[name="email"]').type(`${role}@example.com`);
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait('@login');
    cy.window().then(win => win.localStorage.setItem('token', 'mock-token'));
  };

  it('should allow client to access constructor', () => {
    cy.intercept('GET', '/recipes/products', { body: [{ id: 1, type: 'torte', maxTiers: 3, maxFillings: 4 }] });
    login('client');
    cy.visit('/constructor');
    cy.get('select[name="productType"]').should('exist');
  });

  it('should allow admin to access dashboard', () => {
    cy.intercept('GET', '/admin/charts/sales', { body: { data: [] } });
    login('admin');
    cy.visit('/admin/dashboard');
    cy.get('[data-testid="sales-chart"]').should('exist');
  });

  it('should allow baker to access fillings edit', () => {
    cy.intercept('GET', '/admin/fillings', { body: [{ id: 1, name: 'cream', cost: 100 }] });
    login('baker');
    cy.visit('/admin/fillings');
    cy.get('input[name="name"]').should('exist');
  });

  it('should allow sales_manager to access orders', () => {
    cy.intercept('GET', '/orders', { body: [{ id: 1, status: 'pending' }] });
    login('sales_manager');
    cy.visit('/orders');
    cy.get('[data-testid="order-list"]').should('exist');
  });

  it('should allow logistics_manager to access geolocation', () => {
    cy.intercept('GET', '/geolocation', { body: [{ id: 1, baker: 'John' }] });
    login('logistics_manager');
    cy.visit('/geolocation');
    cy.get('[data-testid="baker-map"]').should('exist');
  });

  it('should deny client access to admin dashboard', () => {
    login('client');
    cy.visit('/admin/dashboard');
    cy.url().should('include', '/login'); // Redirect to login
  });
});
