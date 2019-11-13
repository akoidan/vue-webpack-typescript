const a : number = 3;
describe('My first Test', function() {
    it('Does not much', function() {
        cy.visit('/');
        cy.contains('Filtered Users');
    })
});
