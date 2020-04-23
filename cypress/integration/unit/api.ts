import * as chaiAsPromised from "chai-as-promised";
import getBranchesResponse from "../../fixtures/getBranchesResponse.json";
import chai from "chai";

chai.use(chaiAsPromised);

describe("Api", (): void => {
  it("refreshes access token if it's expired, but refresh token is not expired", () => {
    cy.server();
    cy.route({
      method: "GET",
      response: getBranchesResponse,
      status: 200,
      url: `${String(Cypress.env("APP_API_URL"))}/branches`,
    });
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await win.api.getBranches();
      });
  });
});
