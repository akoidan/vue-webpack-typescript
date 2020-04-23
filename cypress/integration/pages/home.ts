describe("Home page", (): void => {
  it("displays page content", (): void => {
    cy.visit("/");
    cy.contains("Welcome to vue-webpack-typescript!");
    cy.matchScreenshot("content");
  });
  it("displays menu", (): void => {
    cy.visit("/");
    cy.get("[data-cy=hamburger-icon]").click();
    cy.contains("Home");
    cy.contains("Branches");
    cy.matchScreenshot("opened menu");
    cy.get("body").click();
    cy.matchScreenshot("closed menu");
  });
});
