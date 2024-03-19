import { handlers } from '../../src/mocks/handlers';

describe('Login Logout Test', () => {
  it('Click to friend page', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Friends').click()
    cy.contains('Hi, you have no friends.')
  }),
  it('Logs into a user and logs out', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.visit('http://localhost:5173')
    cy.contains('Profile').click()
    cy.contains('You are not logged in')
  })
})