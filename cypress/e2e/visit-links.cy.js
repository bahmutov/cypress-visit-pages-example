// @ts-check
// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import 'cypress-command-chain'

it('checks the title of every page', () => {
  cy.visit('public/index.html')

  const links = []
  cy.get('#links li a')
    .each(($li) => {
      links.push($li[0])
      cy.log(`Got a link!`)
    })
    .then(() => {
      cy.log(`Got ${links.length} links`)

      for (const link of links) {
        const href = link.getAttribute('href')
        const text = link.innerText
        cy.contains('#links li a[href="' + href + '"]', text).click()
        cy.get('.title').should('have.text', text)
        cy.go('back')
      }
    })
})
