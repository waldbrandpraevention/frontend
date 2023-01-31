import { TEST_URL } from "../../support/commands"

describe("sidebar", () => {
  beforeEach(() => {
    cy.loginAdmin()
    cy.visit(TEST_URL + "/dashboard")
  })

  it("can toggle sidebar", () => {
    cy.get('[style="flex: 1 1 0%;"] > :nth-child(1) > [data-testid="ps-menu-button-test-id"]').click();
    cy.get(".ps-sidebar-root").should("have.class","ps-collapsed")
    
    cy.get('[style="flex: 1 1 0%;"] > :nth-child(1) > [data-testid="ps-menu-button-test-id"]').click();
    cy.get(".ps-sidebar-root").should("not.have.class","ps-collapsed")
  })

  // it("can toggle submenu", () => {
  //   /* ==== Generated with Cypress Studio ==== */
  //   cy.get('[style="flex: 1 1 0%;"] > .ps-submenu-root > .css-1m2k4gs > .ps-menu-label').click();
  //   cy.get(':nth-child(3) > .ps-submenu-root > .css-1m2k4gs > .ps-menu-label').click();
  //   cy.get(":nth-child(3) > .ps-submenu-root").should("have.class","ps-open");
  //   cy.get('[style="flex: 1 1 0%;"] > :nth-child(1) > [data-testid="ps-menu-button-test-id"]').click();
  //   cy.get('[style="flex: 1 1 0%;"] > .ps-submenu-root > :nth-child(1) > .ps-menu-icon').click();
  //   cy.get(':nth-child(3) > .ps-submenu-root > :nth-child(1) > .ps-menu-icon > svg').click();
  //   /* ==== End Cypress Studio ==== */
  // })
})