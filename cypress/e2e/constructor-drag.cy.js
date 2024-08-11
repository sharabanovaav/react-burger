import {
    CONSTRUCTOR_INGREDIENT,
    CONSTRUCTOR_INGREDIENT_BUN,
} from '../../src/consts/e2e-selectors'

import {
    DROP_TARGET_SELECTOR,
    BUN_SELECTOR,
    MAIN_SELECTOR,
    COUNTER_SELECTOR,
} from '../consts'

describe('Constructor drag is OK', () => {
    beforeEach(() => {
        cy.init()

        cy.get(DROP_TARGET_SELECTOR).as('target')
    })

    it('should drag bun', () => {
        cy.get(BUN_SELECTOR).first().as('bun')
        cy.get('@bun').trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@bun').get(COUNTER_SELECTOR).should('have.text', '2')
        cy.get(`[data-testid=${CONSTRUCTOR_INGREDIENT_BUN}]`).should(
            'have.length',
            2
        )
    })

    it('should drag ingredient', () => {
        cy.get(MAIN_SELECTOR).first().as('main')
        cy.get('@main').trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@main').get(COUNTER_SELECTOR).should('have.text', '1')
        cy.get(`[data-testid=${CONSTRUCTOR_INGREDIENT}]`).should(
            'have.length',
            1
        )
    })
})
