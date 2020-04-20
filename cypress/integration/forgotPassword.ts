describe("Forgot password page", (): void => {
  it("sends restore password http requests", (): void => {
    cy.pactAddInteraction({
      responseBody: "",
      state: "user is not authorized",
      status: 200,
      uponReceiving: "a request to send a restore password email",
      withRequest: {
        body: {email: "a@b.cd"},
        method: "POST",
        path: "/api/v1/accounts/reset-password/request/",
      },
    });
    cy.visit("/signin");
    cy.clock();
    cy.contains("Forgot your password?").click();
    cy.tick(2000);
    cy.matchScreenshot("no inputs entered");
    cy.vType("Email", "a@b.cd");
    cy.vClick("Submit");
    cy.tick(4000);
    cy.matchScreenshot("text email is sent");
    cy.contains("You should receive an password reset link in an email if specified account exists");
    cy.task("pactVerify");
  });
  it("displays error if server error", (): void => {
    cy.server();
    cy.route({
      method: "POST",
      response: {error: {detail: "some server error"}},
      status: 400,
      url: `${String(Cypress.env("APP_API_URL"))}/v1/accounts/reset-password/request/`,
    });
    cy.visit("/signin");
    cy.contains("Forgot your password?").click();
    cy.vType("Email", "a@b.cd");
    cy.clock();
    cy.vClick("Submit");
    cy.tick(2000);
    cy.matchScreenshot("alert is shown");
    cy.contains("some server error");
  });
});
