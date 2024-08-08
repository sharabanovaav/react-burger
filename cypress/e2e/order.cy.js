import {
    ACCESS_TOKEN_LC_KEY,
    REFRESH_TOKEN_LC_KEY,
} from '../../src/consts/local-storage-keys'

import {
    CONSTRUCTOR_FOOTER,
    INGREDIENT_DROP_TARGET,
    MODAL,
} from '../../src/consts/e2e-selectors'

describe('Order creating is OK', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            ACCESS_TOKEN_LC_KEY,
            JSON.stringify('accessToken')
        )
        window.localStorage.setItem(
            REFRESH_TOKEN_LC_KEY,
            JSON.stringify('refreshToken')
        )

        cy.intercept('GET', 'user', { fixture: 'user' })
        cy.intercept('POST', 'orders', { fixture: 'order' })

        cy.init()
    })

    afterEach(() => {
        window.localStorage.removeItem(ACCESS_TOKEN_LC_KEY)
        window.localStorage.removeItem(REFRESH_TOKEN_LC_KEY)
    })

    it('should create order', () => {
        cy.get(`[data-testid=${CONSTRUCTOR_FOOTER}]`).get('button').as('button')
        cy.get(`[data-testid=${INGREDIENT_DROP_TARGET}]`).as('target')

        cy.get('@button').should('be.disabled')

        cy.get('[data-testid=ingredient-card-bun]').first().trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('[data-testid=ingredient-card-main]')
            .first()
            .trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@button').should('be.enabled')
        cy.get('@button').click()

        cy.get(`[data-testid=${MODAL}]`).should('be.visible')
    })
})
