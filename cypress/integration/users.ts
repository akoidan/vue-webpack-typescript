describe("Posts", (): void => {
  const usersCount = 10;

  before(() => {
    cy.visit("#/users");
  });

  it("should contain first user", (): void => {
    cy.contains("Leanne Graham");
    cy.contains("Sincere@april.biz");
  });

  it("should contain 10 elements", (): void => {
    cy.get("[data-cy=users-container]").children().
      should("have.length", usersCount);
  });
});


