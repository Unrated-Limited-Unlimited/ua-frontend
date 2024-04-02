describe('Login Logout Test', () => {
  it('Check whiskey pages', () => {
    cy.visit('/')
    cy.get('#whiskey-link').should('be.visible').click()
    cy.contains('Tullamore Dew').click()
    cy.contains('Favourite')
  }),
  it('Logs into a user and logs out', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.visit('/')
    cy.contains('Profile').click()
    cy.contains('You are not logged in')
  })
})