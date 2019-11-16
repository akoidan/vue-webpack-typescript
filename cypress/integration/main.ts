describe("Main page", (): void => {
  it("Should display main page", (): void => {
    cy.visit("/");
    cy.contains("Filtered Users");
    cy.contains("Posts");
    cy.contains("Users");
  });
});
