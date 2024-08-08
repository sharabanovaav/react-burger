import {
    INGREDIENT_DROP_TARGET,
    COUNTER,
    CONSTRUCTOR_INGREDIENT,
    CONSTRUCTOR_INGREDIENT_BUN,
} from '../../src/consts/e2e-selectors'

describe('Constructor drag is OK', () => {
    beforeEach(() => {
        cy.init()

        cy.get(`[data-testid=${INGREDIENT_DROP_TARGET}]`).as('target')
    })

    it('should drag bun', () => {
        cy.get('[data-testid=ingredient-card-bun]').first().as('bun')
        cy.get('@bun').trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@bun').get(`[data-testid=${COUNTER}]`).should('have.text', '2')
        cy.get(`[data-testid=${CONSTRUCTOR_INGREDIENT_BUN}]`).should(
            'have.length',
            2
        )
    })

    it('should drag ingredient', () => {
        cy.get('[data-testid=ingredient-card-main]').first().as('main')
        cy.get('@main').trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@main').get(`[data-testid=${COUNTER}]`).should('have.text', '1')
        cy.get(`[data-testid=${CONSTRUCTOR_INGREDIENT}]`).should(
            'have.length',
            1
        )
    })
})
