import {
    MODAL,
    INGREDIENT_LINK,
    MODAL_CLOSE_ICON,
    MODAL_OVERLAY,
} from '../../src/consts/e2e-selectors'

describe('Modals are OK', () => {
    beforeEach(() => {
        cy.init()

        cy.get(`[data-testid=${MODAL}]`).as('modal')
        cy.get(`[data-testid=${INGREDIENT_LINK}]`).as('link')
    })

    it('should open ingredient modal and close it by cross icon', () => {
        cy.get('@link').first().click()
        cy.get('@modal').should('be.visible')

        cy.get(`[data-testid=${MODAL_CLOSE_ICON}]`).click()
        cy.get('@modal').should('not.exist')
    })

    it('should open ingredient modal and close it overlay click', () => {
        cy.get('@link').first().click()
        cy.get('@modal').should('be.visible')

        cy.get(`[data-testid=${MODAL_OVERLAY}]`).click({ force: true })
        cy.get('@modal').should('not.exist')
    })
})
