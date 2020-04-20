import expiredAccessTokenResponse from "../fixtures/expiredAccessTokenResponse.json";
import expiredRefreshTokenResponse from "../fixtures/expiredRefreshTokenResponse.json";

describe("Sign Out Page", (): void => {
  it("signs out", (): void => {
    cy.signIn();
    cy.visit("/");
    cy.get("[data-cy=profile-nav]").click();
    // Don't tick here, otherwise vuetify requestanimationframe will fail the test
    cy.wait(500);
    cy.matchScreenshot("profile-nav");
    cy.get("[data-cy=sign-out]").click();
    // Makes sure user will be redirected to sign in page after sign out
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/signin`);
    // Makes sure user can"t access page that require an authorization and will be redirected to sign in page.
    cy.visit("/");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/signin`);
  });

  it("signs out on catalog page if refresh token is expired", (): void => {
    cy.visit("/");
    cy.window().
      then((win: Window) => {
        win.api.saveJwt(expiredRefreshTokenResponse);
      });
    cy.visit("/catalog");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/signin`);
  });

  it("signs out on catalog page if refresh token is expired, but time on localmachine mismatch", (): void => {
    cy.visit("/");
    cy.window().
      then((win: Window) => {
        win.api.saveJwt(expiredAccessTokenResponse);
        // 2030 year
        win.localStorage.setItem("session_refresh_exp", "1896144185");
      });
    cy.pactAddInteraction({
      responseBody: {
        error: {
          detail: "Token is invalid or expired",
        },
      },
      state: "user has expired refresh token",
      status: 401,
      uponReceiving: "a request to refresh access token",
      withRequest: {
        body: {
          refresh: expiredAccessTokenResponse.refresh,
        },
        method: "POST",
        path: "/api/v1/accounts/token/refresh/",
      },
    });
    cy.visit("/catalog");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/signin`);
    cy.task("pactVerify");
  });
});
