import { handlers } from '../../src/mocks/handlers';
describe("Cache Test", () => {
  it('Browserstack cookies', () =>{
    cy.visit('http://localhost:5173')
    cy.wait(10000)
    cy.getCookies().should('not.be.empty')
    cy.clearCookies()
    cy.getCookies().should('be.empty')
    })
})
describe('Login Logout Test', () => {
  it('Logs into a user and logs out', () => {
    cy.wait(20)
    cy.visit('http://localhost:5173')
    cy.contains('Profile').click()
    cy.contains('Login').click()
    cy.get('input[name="username"]').type('fake@email.com')
    cy.get('input[name="password"]').type('password123')
    cy.contains('Log in').click()
    cy.contains('Profile').click()
  })
})