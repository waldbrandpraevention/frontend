describe('zone and zoneoverview', () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can open overview page", () => {
    cy.visit("http://localhost:3000/zones")
    cy.location("pathname").should("eq","/zones")
  })
})