import { ingredientsSlice, initialState } from './reducer'
import { loadIngredients } from './actions'
import { BUN } from '../../mocks'

describe('Ingredients reducer', () => {
    it('init correctly', () => {
        const state = ingredientsSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('loadIngredients fulfilled is correct', () => {
        const action = { type: loadIngredients.fulfilled.type, payload: [BUN] }
        const state = ingredientsSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            loading: false,
            ingredients: [BUN],
        })
    })

    it('loadIngredients pending is correct', () => {
        const action = { type: loadIngredients.pending.type }
        const state = ingredientsSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            loading: true,
        })
    })

    it('loadIngredients rejected is correct', () => {
        const action = { type: loadIngredients.rejected.type }
        const state = ingredientsSlice.reducer(initialState, action)

        expect(state).toEqual(initialState)
    })
})
