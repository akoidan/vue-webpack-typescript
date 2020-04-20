import * as chaiAsPromised from "chai-as-promised";
import accessTokenResponse from "../fixtures/accessTokenResponse.json";
import chai from "chai";
import expiredAccessTokenResponse from "../fixtures/expiredAccessTokenResponse.json";
import expiredRefreshTokenResponse from "../fixtures/expiredRefreshTokenResponse.json";

chai.use(chaiAsPromised);

describe("Api", (): void => {
  it("refreshes access token if it's expired, but refresh token is not expired", () => {
    cy.pactAddInteraction({
      responseBody: accessTokenResponse,
      state: "user has access token",
      status: 200,
      uponReceiving: "a request for refresh token",
      withRequest: {
        body: {refresh: expiredAccessTokenResponse.refresh},
        method: "POST",
        path: "/api/v1/accounts/token/refresh/",
      },
    });
    cy.visit("/");

    cy.window().
      then(async(win: Window) => {
        win.api.saveJwt(expiredAccessTokenResponse);
        await win.api.getAccessToken();
      });
    cy.task("pactVerify");
  });

  it("gets access token from localstorage if it's present and not expired", () => {
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        win.api.saveJwt(accessTokenResponse);
        const response = await win.api.getAccessToken();
        expect(response).eq(accessTokenResponse.access);
      });
  });

  it("throws an error if token doesn't exist", () => {
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        await chai.assert.isRejected(
          win.api.getAccessToken(),
          // AUTHORIZATION_REQUIRED
          "Error #5",
        );
      });
  });
  it("throws an error if both refresh and access token are expired", () => {
    cy.visit("/");
    cy.window().
      then(async(win: Window) => {
        win.api.saveJwt(expiredRefreshTokenResponse);
        await chai.assert.isRejected(
          win.api.getAccessToken(),
          // AUTHORIZATION_REQUIRED
          "Error #5",
        );
      });
  });
});
