describe("My first Test", (): void => {
  it("Does not much", (): void => {
    cy.visit("/");
    cy.contains("Filtered Users");
  });
});
