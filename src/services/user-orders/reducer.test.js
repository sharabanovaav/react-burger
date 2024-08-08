import {
    userOrdersSlice,
    initialState,
    wsOpen,
    wsError,
    wsMessage,
} from './reducer'
import { ORDER } from '../../mocks'

describe('User orders reducer', () => {
    it('init correctly', () => {
        const state = userOrdersSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('wsOpen is correct', () => {
        const action = { type: wsOpen.type }
        const state = userOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, connectionError: null })
    })

    it('wsError is correct', () => {
        const action = { type: wsError.type, payload: 'Error' }
        const state = userOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, connectionError: 'Error' })
    })

    it('wsMessage is correct', () => {
        const payload = {
            orders: [ORDER],
        }
        const action = { type: wsMessage.type, payload }
        const state = userOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            orders: [ORDER],
        })
    })
})
