describe("Posts", (): void => {
  const postCount = 100;

  before(() => {
    cy.visit("#/posts");
  });

  it("should contain first post", (): void => {
    cy.contains("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
    cy.contains(" quia et suscipit\n" +
        "suscipit recusandae consequuntur expedita et cum\n" +
        "reprehenderit molestiae ut ut quas totam\n" +
        "nostrum rerum est autem sunt rem eveniet architecto\n");
    cy.contains("Users");
  });

  it("should contain 100 elements", (): void => {
    cy.get("[data-cy=posts-container]").children().
      should("have.length", postCount);
  });
});
