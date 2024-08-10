import {
    ACCESS_TOKEN_LC_KEY,
    REFRESH_TOKEN_LC_KEY,
} from '../../src/consts/local-storage-keys'

import { CONSTRUCTOR_FOOTER } from '../../src/consts/e2e-selectors'
import {
    DROP_TARGET_SELECTOR,
    MODAL_SELECTOR,
    BUN_SELECTOR,
    MAIN_SELECTOR,
} from '../consts'

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
        cy.get(DROP_TARGET_SELECTOR).as('target')

        cy.get('@button').should('be.disabled')

        cy.get(BUN_SELECTOR).first().trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get(MAIN_SELECTOR).first().trigger('dragstart')
        cy.get('@target').trigger('drop')

        cy.get('@button').should('be.enabled')
        cy.get('@button').click()

        cy.get(MODAL_SELECTOR).should('be.visible')
    })
})
