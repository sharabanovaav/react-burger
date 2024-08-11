import {
    burgerConstructorSlice,
    initialState,
    reset,
    setBun,
    setIngredients,
    addIngredient,
    deleteIngredient,
} from './reducer'
import { BUN, MAIN } from '../../mocks'

describe('Burger constructor reducer', () => {
    it('init correctly', () => {
        const state = burgerConstructorSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('reset is correct', () => {
        const state = burgerConstructorSlice.reducer(initialState, {
            type: reset.type,
        })

        expect(state).toEqual(initialState)
    })

    it('setBun is correct', () => {
        const action = { type: setBun.type, payload: BUN }
        const state = burgerConstructorSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, bun: BUN })
    })

    it('setIngredients is correct', () => {
        const action = { type: setIngredients.type, payload: [MAIN] }
        const state = burgerConstructorSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, ingredients: [MAIN] })
    })

    it('addIngredient is correct', () => {
        const action = { type: addIngredient.type, payload: MAIN }
        const state = burgerConstructorSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, ingredients: [MAIN] })
    })

    it('deleteIngredient is correct', () => {
        const prevState = { ...initialState, ingredients: [MAIN] }
        const action = { type: deleteIngredient.type, payload: MAIN.customId }
        const state = burgerConstructorSlice.reducer(prevState, action)

        expect(state).toEqual(initialState)
    })
})
