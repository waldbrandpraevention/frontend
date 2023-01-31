describe('authentication', () => {
  // it("shows loading screen when api down", () => {
  //   cy.visit('http://localhost:3000')
  //   cy.offline()
  //   cy.wait(5000)
  //   cy.online()
  // })

  it("can programmatically login admin",() => {
    cy.loginAdmin()
  })

  it('can login with valid credentials', () => {
    cy.loginAdminVisual()
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
    cy.loginAdminVisual()

    cy.get('#basic-nav-dropdown').click();
    cy.contains("Abmelden").click()
    cy.location("pathname").should("equal", "/login")
  })

  const loggedIn = ["dashboard", "weather", "map", "does/not/exist", "settings/users", "settings/account",
    "settings/system", "zones", "zones/1", "settings/design", "alerts", "advanced", "impressum", "datenschutz"]
  loggedIn.forEach(p => it("redirects to login if not authenticated accessing " + p, () => {
    cy.visit('http://localhost:3000/' + p)
    cy.location("pathname").should("equal", "/login")
  }))

  loggedIn.forEach(p => it("redirects to requested " + p + " after login", () => {
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
    cy.loginAdminVisual()

    cy.visit('http://localhost:3000/login')
    cy.location("pathname").should("equal", "/dashboard")

    cy.visit('http://localhost:3000/register/xyz')
    cy.location("pathname").should("equal", "/dashboard")
  })

  it("cannot request password reset when empty email", () => {
    cy.visit('http://localhost:3000')
    cy.get('.text-secondary').should('contain.text', 'vergessen?');
    cy.get('.text-secondary').click();
    cy.get('.col-md-auto > .d-grid > .btn').should('contain.text', 'Passwort zurücksetzen');
    cy.get('.col-md-auto > .d-grid > .btn').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Passwort konnte nicht zurückgesetzt werden. "Not Found"');
  })

  it("cannot sign up with empty form", () => {
    cy.visit('http://localhost:3000/register/xyz')
    cy.location("pathname").should("equal", "/register/xyz")
    cy.get('.d-flex').should('contain.text', ' Registrieren');
    cy.get('.d-flex').click();
    cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Registrierung fehlgeschlagen.');
  })
})