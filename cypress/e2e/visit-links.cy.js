// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// this test does nothing, for some reason
// it prints "Got 0 links"
// and does not visit any of the pages :(
it('checks the title of every page', () => {
  cy.visit('public/index.html')

  const links = []
  cy.get('#links li a').each(($li) => {
    links.push($li[0])
    cy.log(`Got a link!`)
  })

  cy.log(`Got ${links.length} links`)

  for (const link of links) {
    cy.wrap(link).click()
    cy.get('.title').should('have.text', link.innerText)
    cy.go('back')
  }
})
