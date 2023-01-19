describe('authentication', () => {
  it('can login with valid credentials', () => {
    cy.loginAdmin()
  })

  it('cannot login with invalid credentials', () => {
    cy.visit('http://localhost:3000')
    cy.get('#formBasicEmail').clear();
    cy.get('#formBasicEmail').type('invalid@user.de');
    cy.get('#formBasicPassword').clear();
    cy.get('#formBasicPassword').type('foobar');
    cy.get('button[type=submit]').click();
    cy.location("pathname").should("equal", "/login")
    cy.contains("Anmeldung fehlgeschlagen.")
  })

  it('can logout', () => {
    cy.loginAdmin()

    cy.get('#basic-nav-dropdown').click();
    cy.contains("Abmelden").click()
    cy.location("pathname").should("equal", "/login")
  })
})