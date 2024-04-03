describe('Login Logout Test', () => {
  it('Check whiskey pages', () => {
    cy.visit('/')
    cy.get('a[href*="/whiskey"]').should('be.visible').click()
    cy.contains('Tullamore Dew').click()
    cy.contains('Favourite')
  }),
  it('Logs into a user and logs out', () => {
    cy.visit('/')
    cy.contains('Profile')
    cy.get('a[href*="/profile"]').should('be.visible').click()
    cy.contains('You are not logged in')
    cy.get('a[href*="/login"]').should('be.visible').click()
    cy.get('input[name="username"]').type('fake@email.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[name="login"]').should('be.visible').click()
    cy.get('a[href*="/profile"]').should('be.visible').click()
    cy.contains('Tor-Arne')
    cy.get('a[href*="/settings"]').should('be.visible').click()
    cy.get('button[name="logout"]').should('be.visible').click()
    cy.get('a[href*="/profile"]').should('be.visible').click()
    cy.contains('You are not logged in')
  })
})