import catalogResponse from "../fixtures/catalogResponse.json";

describe("Catalog page", (): void => {
  it("displays course package visually as expected on different resolutions", (): void => {
    cy.signIn();
    cy.pactAddInteraction({
      responseBody: catalogResponse,
      state: "user is authorized",
      status: 200,
      uponReceiving: "a request for catalog",
      withRequest: {
        method: "GET",
        path: "/api/v1/catalog/mapping/",
      },
    });
    cy.visit("/catalog");
    [1280, 1000, 800, 500].forEach((width: number) => {
      cy.viewport(width, 660);
      cy.matchScreenshot(`viewport ${String(width)}`);
    });
  });

  it("displays error if refresh token endpoint returns invalid error", (): void => {
    cy.signIn();
    // Expired, trigger refresh token endopint
    cy.window().
      then((win: Window) => {
        // 2030 year
        win.localStorage.setItem("session_access_exp", "1");
      });
    cy.server();
    cy.route({
      method: "POST",
      response: {error: {
        detail: "Server user-friendly error",
      }},
      status: 400,
      url: `${String(Cypress.env("APP_API_URL"))}/v1/accounts/token/refresh`,
    });
    cy.visit("/catalog");
    cy.contains("Server user-friendly error");
  });
});
