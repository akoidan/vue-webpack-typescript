import accessTokenResponse from "../fixtures/accessTokenResponse.json";

describe("Sign In Page", (): void => {
  it("redirects to sign in page when not authorized", (): void => {
    cy.visit("/");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/signin`);
  });

  it("validates inputs", (): void => {
    cy.clock();
    cy.visit("/signin");
    cy.tick(2000);
    cy.matchScreenshot("signin");
    cy.vClick("Sign In");
    cy.tick(4000);
    cy.matchScreenshot("password exists");
    cy.contains("E-mail is required");
    cy.contains("Password is required");
    cy.contains("Sign In").should("be.disabled");
    cy.vType("Email", "Zak");
    cy.contains("Enter a valid email address.");
    cy.vType("Email", "a@b.cd");
    cy.vType("Password", "1");
    cy.contains("Sign In").should("not.be.disabled");
  });

  it("signs in", (): void => {
    cy.pactAddInteraction({
      responseBody: accessTokenResponse,
      state: "user is not authorized",
      status: 200,
      uponReceiving: "a request for signin",
      withRequest: {
        body: {
          email: "a@b.cd",
          password: "1",
        },
        method: "POST",
        path: "/api/v1/accounts/token/access/",
      },
    });
    cy.visit("/signin");
    cy.vType("Email", "a@b.cd");
    cy.vType("Password", "1");
    cy.vClick("Sign In");
    cy.url().should("eq", `${String(Cypress.config().baseUrl)}/`);
    cy.window().
      then((win: Window) => {
        expect(win.localStorage.getItem("session_access")).eq(accessTokenResponse.access);
        expect(win.store.state.users.user?.id).eq(1);
      });
    cy.task("pactVerify");
  });

  it("show error if password is incorrect", (): void => {
    cy.pactAddInteraction({
      responseBody: {
        error: {detail: "No active account found with the given credentials"},
      },
      state: "user is not authorized",
      status: 401,
      uponReceiving: "a request for signin with invalid password",
      withRequest: {
        body: {
          email: "a@b.cd",
          password: "1",
        },
        method: "POST",
        path: "/api/v1/accounts/token/access/",
      },
    });
    cy.visit("/signin");
    cy.vType("Email", "a@b.cd");
    cy.vType("Password", "1");
    cy.clock();
    cy.vClick("Sign In");
    cy.tick(2000);
    cy.matchScreenshot("alert is shown");
    cy.task("pactVerify");
  });
});
