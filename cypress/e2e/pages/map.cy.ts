describe('map', () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can open page", () => {
    cy.visit("http://localhost:3000/map")
    cy.location("pathname").should("eq","/map")
  })
})