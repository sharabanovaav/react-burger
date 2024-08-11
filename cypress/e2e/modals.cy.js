import {
    INGREDIENT_LINK,
    MODAL_CLOSE_ICON,
    MODAL_OVERLAY,
} from '../../src/consts/e2e-selectors'

import { MODAL_SELECTOR } from '../consts'

describe('Modals are OK', () => {
    beforeEach(() => {
        cy.init()

        cy.get(`[data-testid=${INGREDIENT_LINK}]`).as('link')
    })

    it('should open ingredient modal and close it by cross icon', () => {
        cy.get('@link').first().click()
        cy.get(MODAL_SELECTOR).should('be.visible')

        cy.get(`[data-testid=${MODAL_CLOSE_ICON}]`).click()
        cy.get(MODAL_SELECTOR).should('not.exist')
    })

    it('should open ingredient modal and close it overlay click', () => {
        cy.get('@link').first().click()
        cy.get(MODAL_SELECTOR).should('be.visible')

        cy.get(`[data-testid=${MODAL_OVERLAY}]`).click({ force: true })
        cy.get(MODAL_SELECTOR).should('not.exist')
    })
})
