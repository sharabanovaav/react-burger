describe('Order creating is OK', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            'accessToken',
            JSON.stringify('accessToken')
        )
        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('refreshToken')
        )

        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
        cy.intercept('GET', 'user', { fixture: 'user' })
        cy.intercept('POST', 'orders', { fixture: 'order' })

        cy.visit('http://localhost:3000/')
    })

    it('should create order', () => {
        cy.get('[data-testid="constructor-footer"]').get('button').as('button')
        cy.get('[data-testid=ingredient-drop-target]').as('target')

        cy.get('@button').should('be.disabled')

        cy.get('[data-testid=ingredient-card-bun]').first().trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('[data-testid=ingredient-card-main]')
            .first()
            .trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@button').should('be.enabled')
        cy.get('@button').click()

        cy.get('[data-testid=modal]').should('be.visible')
    })
})
