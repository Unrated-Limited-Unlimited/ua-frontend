import { handlers } from '../../src/mocks/handlers';

describe('Login Logout Test', () => {
  it('Logs into a user and logs out', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.visit('http://localhost:5173')
    cy.contains('Profile').click()
    cy.contains('You are not logged in')
  })
})