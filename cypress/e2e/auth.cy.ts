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

  const loggedIn = ["dashboard", "weather", "map", "does/not/exist", "settings/users", "settings/account",
    "settings/system", "zones", "zones/1", "settings/design", "alerts", "advanced", "impressum", "datenschutz"]
  loggedIn.forEach(p => it("redirects to login if not logged accessing " + p, () => {
    cy.visit('http://localhost:3000/' + p)
    cy.location("pathname").should("equal", "/login")
  }))

  loggedIn.forEach(p => it("redirects to " + p + " after login", () => {
    cy.visit('http://localhost:3000/' + p)
    cy.location("pathname").should("equal", "/login")

    cy.get('#formBasicEmail').clear();
    cy.get('#formBasicEmail').type('admin@kiwa.tech');
    cy.get('#formBasicPassword').clear();
    cy.get('#formBasicPassword').type('adminkiwa');
    cy.get('button[type=submit]').click();

    cy.location("pathname").should("equal", "/" + p)
  }))

  it("redirects to dashboard when logged in", () => {
    cy.loginAdmin()

    cy.visit('http://localhost:3000/login')
    cy.location("pathname").should("equal", "/dashboard")

    cy.visit('http://localhost:3000/register/xyz')
    cy.location("pathname").should("equal", "/dashboard")
  })

  /*   it("can request password reset", () => {
      cy.visit('http://localhost:3000')
    }) */
})