import { orderSlice, initialState } from './reducer'
import { createOrder, getOrderByNumber } from './actions'
import { ORDER } from '../../mocks'

describe('Ingredients reducer', () => {
    it('init correctly', () => {
        const state = orderSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('createOrder fulfilled is correct', () => {
        const action = { type: createOrder.fulfilled.type, payload: ORDER._id }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            orderId: ORDER._id,
        })
    })

    it('createOrder pending is correct', () => {
        const action = { type: createOrder.pending.type }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            loading: true,
        })
    })

    it('createOrder rejected is correct', () => {
        const action = { type: createOrder.rejected.type }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual(initialState)
    })

    it('getOrderByNumber fulfilled is correct', () => {
        const action = { type: getOrderByNumber.fulfilled.type, payload: ORDER }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            order: ORDER,
        })
    })

    it('getOrderByNumber pending is correct', () => {
        const action = { type: getOrderByNumber.pending.type }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            loading: true,
        })
    })

    it('getOrderByNumber rejected is correct', () => {
        const action = { type: getOrderByNumber.rejected.type }
        const state = orderSlice.reducer(initialState, action)

        expect(state).toEqual(initialState)
    })
})
