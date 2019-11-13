const a : number = 3;
describe('My first Test', function() {
    it('Does not much', function() {
        cy.visit('https://example.cypress.io');
        cy.pause();
        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')
        // expect(true).to.equal(false);
    })
});
