/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

const ADMIN_EMAIL = "admin@kiwa.tech"
const ADMIN_PW = "adminkiwa"
const AUTH_URL = "https://kiwa.tech/api/users/login/"
const AUTH_TOKEN_LOCAL_NAME = "wb_access_token"
export const TEST_URL = "http://localhost:3000"

Cypress.Commands.add('loginAdminVisual', () => {
  cy.visit('http://localhost:3000')
  cy.get('#formBasicEmail').clear();
  cy.get('#formBasicEmail').type('admin@kiwa.tech');
  cy.get('#formBasicPassword').clear();
  cy.get('#formBasicPassword').type('adminkiwa');
  cy.get('button[type=submit]').click();
  cy.location("pathname").should("equal", "/dashboard")
})

Cypress.Commands.add('loginAdmin', () => {
  cy.request({ method: "POST", url: AUTH_URL, form: true, body: { username: ADMIN_EMAIL, password: ADMIN_PW } }).then(resp => {
    cy.log(resp.body.access_token);
    localStorage.setItem(AUTH_TOKEN_LOCAL_NAME, resp.body.access_token)
  })
})

Cypress.Commands.add("offline", () => {
  cy.log('**go offline**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.enable',
        })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: true,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
})

Cypress.Commands.add("online", () => {
  cy.log('**go online**')
    .then(() => {
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: false,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.disable',
        })
    })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }