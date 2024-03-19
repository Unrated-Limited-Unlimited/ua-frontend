import { handlers } from '../../src/mocks/handlers';

describe('Login Logout Test', () => {
  it('Loading test', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Friends').click()
    cy.visit('http://localhost:5173')
    cy.contains('Friends').click()
  }),
  it('Check whiskey pages', () => {
    cy.visit('http://localhost:5173')
    cy.contains('whiskey-list (testing)').click()
    cy.contains('Whiskeys')
    cy.contains('Tullamore Dew').click()
    cy.contains('Favourite')
  }),
  it('Logs into a user and logs out', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.visit('http://localhost:5173')
    cy.contains('Profile').click()
    cy.contains('You are not logged in')
  })
})