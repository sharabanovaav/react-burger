describe('Modals are OK', () => {
    beforeEach(() => {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
        cy.visit('http://localhost:3000/')
    })

    it('should open ingredient modal and close it by cross icon', () => {
        cy.get('[data-testid=ingredient-link]').first().click()
        cy.get('[data-testid=modal]').should('be.visible')

        cy.get('[data-testid=modal-close-icon]').click()
        cy.get('[data-testid=modal]').should('not.exist')
    })

    it('should open ingredient modal and close it overlay click', () => {
        cy.get('[data-testid=ingredient-link]').first().click()
        cy.get('[data-testid=modal]').should('be.visible')

        cy.get('[data-testid=modal-overlay]').click({ force: true })
        cy.get('[data-testid=modal]').should('not.exist')
    })
})
