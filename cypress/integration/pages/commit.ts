import getCommitResponse from "../../fixtures/getCommitResponse.json";

describe("Commit page", (): void => {
  it("displays correctly", (): void => {
    cy.server();
    cy.route({
      method: "GET",
      response: getCommitResponse,
      status: 200,
      url: `${String(Cypress.env("APP_API_URL"))}/commits/82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef`,
    });
    cy.visit("/commit/82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef");
    cy.contains("MDY6Q29tbWl0MTM2NzYyODE5OjgyYzBlNzZlNWRjMWQ4ZDU3Zjg4YWJhMmNiYzg4ZTFmODM3M2ZlZWY");
    cy.matchScreenshot("content");
  });
  it("processes error", (): void => {
    cy.server();
    cy.route({
      method: "GET",
      response: "invalid response",
      status: 200,
      url: `${String(Cypress.env("APP_API_URL"))}/commits/82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef`,
    });
    cy.visit("/commit/82c0e76e5dc1d8d57f88aba2cbc88e1f8373feef");
    cy.contains("Malformed json");
  });
});
