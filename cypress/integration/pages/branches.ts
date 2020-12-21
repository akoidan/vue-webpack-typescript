import getBranchesResponse from "../../fixtures/getBranchesResponse.json";
import getCommitResponse from "../../fixtures/getCommitResponse.json";

describe("Branches page", (): void => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      response: getBranchesResponse,
      status: 200,
      url: `${String(Cypress.env("APP_API_URL"))}/branches`,
    }).as("get-branches");
  });
  it("navigates to branches", (): void => {
    cy.visit("/");
    cy.get("[data-cy=hamburger-icon]").click();
    cy.contains("Branches").click();
    cy.contains("Repository Branches:");
  });
  it("displays branches", (): void => {
    cy.visit("/branches");
    cy.contains("Repository Branches:");
    cy.contains("babel");
    cy.contains("check");
    cy.matchScreenshot("content");
  });
  it("doesn't load branches twice", (): void => {
    cy.visit("/branches");
    cy.get("[data-cy=hamburger-icon]").click();
    cy.contains("Home").click();
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/`);
    cy.get("[data-cy=hamburger-icon]").click();
    cy.contains("Branches").click();
    cy.assertCalledTimes("get-branches", 1);
  });
  it("navigates to a specific commit", (): void => {
    cy.route({
      method: "GET",
      response: getCommitResponse,
      status: 200,
      url: `${String(Cypress.env("APP_API_URL"))}/commits/82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef`,
    });
    cy.visit("/branches");
    cy.contains("babel").click();
    cy.contains("82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef");
  });
});
