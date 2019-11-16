describe("Filtered Users", (): void => {

  const usersCount = 5;

  before(() => {
    cy.visit("#/filtered-users");
  });

  it("should contain first user", (): void => {
    cy.contains("Mrs. Dennis Schulist");
    cy.contains("Karley_Dach@jasper.info");
  });

  it("should contain 5 elements", (): void => {
    cy.get("[data-cy=filtered-users-container]").children().
      should("have.length", usersCount);
  });
});
