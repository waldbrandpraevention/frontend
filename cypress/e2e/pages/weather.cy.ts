describe('weather', () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can open weather page", () => {
    cy.visit("http://localhost:3000/weather")
    cy.location("pathname").should("eq","/weather")
  })
})