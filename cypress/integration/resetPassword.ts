import accessTokenResponse from "../fixtures/accessTokenResponse.json";

const RESET_PASSWORD_URL = "/reset-password?token=longUniqueToken";

function navigateToRestorePassword(): void {
  cy.server();
  cy.route({
    method: "POST",
    response: [],
    status: 200,
    url: `${String(Cypress.env("APP_API_URL"))}/v1/accounts/reset-password/validate_token/`,
  });
  cy.visit(RESET_PASSWORD_URL);
}

describe("Reset password page", (): void => {
  it("navigates to display password page if token is valid", (): void => {
    cy.pactAddInteraction({
      responseBody: "",
      state: "user has a valid token",
      status: 200,
      uponReceiving: "a request to validate a token",
      withRequest: {
        body: {token: "longUniqueToken"},
        method: "POST",
        path: "/api/v1/accounts/reset-password/validate_token/",
      },
    });
    cy.clock();
    cy.visit(RESET_PASSWORD_URL);
    cy.tick(2000);
    cy.matchScreenshot("success page");
    cy.contains("Please provide a new password.");
    cy.task("pactVerify");
  });

  it("displays an error if token is invalid", (): void => {
    cy.pactAddInteraction({
      responseBody: {
        error: {
          detail: "Invalid token",
        },
      },
      state: "user has an invalid token",
      status: 400,
      uponReceiving: "a request to validate a token",
      withRequest: {
        body: {token: "longUniqueToken"},
        method: "POST",
        path: "/api/v1/accounts/reset-password/validate_token/",
      },
    });
    cy.clock();
    cy.visit(RESET_PASSWORD_URL);
    cy.tick(2000);
    cy.matchScreenshot("error page");
    cy.contains("Invalid token");
    cy.task("pactVerify");
  });


  it("shows error if token is missing from params", (): void => {
    cy.visit("/reset-password");
    cy.contains("This page address is malformed");
  });


  it("validates the inputs", (): void => {
    navigateToRestorePassword();

    cy.contains("Submit").should("not.be.disabled");
    cy.vClick("Submit");
    cy.contains("Password is required");
    cy.contains("Submit").should("be.disabled");

    cy.vType("Password", ",");
    cy.contains("Should contain at least 1 uppercase character");
    cy.contains("Submit").should("be.disabled");

    cy.vType("Password", "F");
    cy.contains("Should contain at least 1 lowercase character");
    cy.contains("Submit").should("be.disabled");

    cy.vType("Password", "Fd");
    cy.contains("Should contain at least 1 number");
    cy.contains("Submit").should("be.disabled");

    cy.vType("Password", "dF3");
    cy.contains("Should be 12 characters minimum");
    cy.contains("Submit").should("be.disabled");

    cy.clock();
    cy.vType("Confirm password", "33");
    cy.contains("Submit").should("be.disabled");
    cy.tick(2000);
    cy.matchScreenshot("errors are shown");
    cy.contains("Passwords don't match");


    cy.vType("Password", "aD123asd33sdfsd");
    cy.vType("Confirm password", "aD123asd33sdfsd");

    cy.contains("Submit").should("not.be.disabled");
  });

  it("claims the new passowrd", (): void => {
    navigateToRestorePassword();

    cy.pactAddInteraction({
      responseBody: accessTokenResponse,
      state: "user has a valid token",
      status: 200,
      uponReceiving: "a request to confirm a token",
      withRequest: {
        body: {
          password: "aD123asd33ffff",
          token: "longUniqueToken",
        },
        method: "POST",
        path: "/api/v1/accounts/reset-password/confirm/",
      },
    });

    cy.vType("Password", "aD123asd33ffff");
    cy.vType("Confirm password", "aD123asd33ffff");
    cy.vClick("Submit");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/`);
    cy.task("pactVerify");
  });

  it("shows an error if token is incorrect", (): void => {
    navigateToRestorePassword();

    cy.pactAddInteraction({
      responseBody: {
        error: {
          detail: "Invalid token",
        },
      },
      state: "user has an invalid token",
      status: 400,
      uponReceiving: "a request to confirm a token",
      withRequest: {
        body: {
          password: "aD123asd33ffff",
          token: "longUniqueToken",
        },
        method: "POST",
        path: "/api/v1/accounts/reset-password/confirm/",
      },
    });

    cy.vType("Password", "aD123asd33ffff");
    cy.vType("Confirm password", "aD123asd33ffff");
    cy.vClick("Submit");
    cy.contains("Invalid token");
    cy.task("pactVerify");
  });
});
