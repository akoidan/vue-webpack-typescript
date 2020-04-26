import * as chaiAsPromised from "chai-as-promised";
import chai from "chai";
import getBranchesResponse from "../../fixtures/getBranchesResponse.json";

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
        const branches = await win.api.getBranches();
        expect(branches).have.length.greaterThan(0);
      });
  });
});
