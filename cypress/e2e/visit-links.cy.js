// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import 'cypress-command-chain'

it('checks the title of every page', () => {
  cy.visit('public/index.html')

  const links = []
  cy.get('#links li a')
    .each(($li) => {
      const href = $li[0].getAttribute('href')
      links.push(href)
      cy.log(`Got a link!`)
    })
    .then(() => {
      cy.log(`Got ${links.length} links`)

      for (const link of links) {
        cy.get('#links li a[href="' + link + '"]')
          .then(($link) => {
            cy.wrap($link).click()
            cy.get('.title').should('have.text', $link.text())
          })
          .click()
        cy.go('back')
      }
    })
})
