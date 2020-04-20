describe("Demo page", (): void => {
  it("has the same text styles", (): void => {
    cy.clock();
    cy.visit("/demo");
    cy.tick(2000);
    cy.matchScreenshot("typography");
  });
  it("has same visually correct form elements", (): void => {
    cy.visit("/demo");
    cy.contains("Form").click();
    cy.vType("Email", "a@a.aa");
    cy.vType("Password", "aaaaaaaaa");
    cy.matchScreenshot("form");
  });

  it("validates form", (): void => {
    cy.visit("/demo");
    cy.contains("Form").click();
    cy.get(".v-btn--loading").should("not.exist");
    cy.vSelect("Select Month", "Jan");
    cy.vType("Email", "a@a.aa");
    cy.contains("Sign Up").click();
    cy.contains("Sign Up").should("be.disabled");
    cy.vType("Password", "aaaa0000aa");
    cy.vCheck("I agree");
    cy.clock();
    cy.contains("Sign Up").click();
    cy.get(".v-btn--loading");
    cy.tick(6000);
    cy.get(".v-btn--loading").should("not.exist");
  });


  it("displays valid elements", (): void => {
    cy.visit("/demo");
    cy.contains("Elements").click();
    cy.clock();
    cy.contains("Outlined button").click();
    cy.contains("Some error");
    cy.tick(6000);
    cy.contains("Some error").should("not.exist");
  });
});
