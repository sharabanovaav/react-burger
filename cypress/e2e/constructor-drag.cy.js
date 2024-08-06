describe('Constructor drag is OK', () => {
    beforeEach(() => {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
        cy.visit('http://localhost:3000/')
    })

    it('should drag bun', () => {
        cy.get('[data-testid=ingredient-card-bun]').first().as('bun')
        cy.get('@bun').trigger('dragstart')
        cy.get('[data-testid=ingredient-drop-target]').trigger('drop')

        cy.get('@bun').get('[data-testid=counter]').should('have.text', '2')
        cy.get('[data-testid=constructor-ingredient-bun]').should(
            'have.length',
            2
        )
    })

    it('should drag ingredient', () => {
        cy.get('[data-testid=ingredient-card-main]').first().as('main')
        cy.get('@main').trigger('dragstart')
        cy.get('[data-testid=ingredient-drop-target]').trigger('drop')

        cy.get('@main').get('[data-testid=counter]').should('have.text', '1')
        cy.get('[data-testid=constructor-ingredient]').should('have.length', 1)
    })
})
