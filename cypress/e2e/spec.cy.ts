import { handlers } from '../../src/mocks/handlers';
describe('Login Logout Test', () => {
  it('Logs into a user and logs out', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.visit('http://localhost:5173')
    cy.contains('Profile').click()
    cy.contains('a[name="login"]').click()
    cy.get('input[name="username"]').type('fake@email.com')
    cy.get('input[name="password"]').type('password123')
    cy.contains('button[name="login"]').click()
    cy.contains('Profile').click()
  })
})