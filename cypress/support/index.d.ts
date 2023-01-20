declare namespace Cypress {
  interface Chainable {
    loginAdminVisual(): void,
    loginAdmin(): void,
    offline(): void
    online(): void
  }
}