describe("alerts", () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can update interval", () => {
    cy.visit("http://localhost:3000/alerts")
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.my-2 > .d-flex').should('have.text', ' Einstellungen');
    cy.get('.my-2 > .d-flex').click();
    cy.get('.form-control').should('have.value', '10000');
    cy.get('.form-control').type('1000');
    cy.get('.btn-success').click();
    /* ==== End Cypress Studio ==== */
  })
})