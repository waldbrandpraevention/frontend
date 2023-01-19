describe('account', () => {
  beforeEach(() => {
    cy.loginAdmin()
  })

  it("can open account page", () => {
    cy.visit("http://localhost:3000/account")
    cy.location("pathname").should("eq","/account")
  })
})