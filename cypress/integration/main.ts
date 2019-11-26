describe("Main page", (): void => {
  it("Should display main page", (): void => {
    cy.visit("/");
    // checks whether image is loaded
    cy.get('[data-cy=logo]').should('be.visible').and(($img) => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    });
    cy.contains("Filtered Users");
    cy.contains("Posts");
    cy.contains("Users");
  });
});
