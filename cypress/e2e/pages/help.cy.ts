describe('help, imprint and privacy', () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can open imprint page", () => {
    cy.visit("http://localhost:3000/impressum")
    cy.location("pathname").should("eq", "/impressum")
    cy.get("h2").should("contain", "Impressum")
  })

  it("can open privacy page", () => {
    cy.visit("http://localhost:3000/datenschutz")
    cy.location("pathname").should("eq", "/datenschutz")
    cy.get("h2").should("contain", "Datenschutzerklärung")
  })

  it("can open faq page", () => {
    cy.visit("http://localhost:3000/faq")
    cy.location("pathname").should("eq", "/faq")
  })
})