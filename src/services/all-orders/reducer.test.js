import {
    allOrdersSlice,
    initialState,
    wsOpen,
    wsError,
    wsMessage,
} from './reducer'
import { ORDER } from '../../mocks'

describe('All orders reducer', () => {
    it('init correctly', () => {
        const state = allOrdersSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('wsOpen is correct', () => {
        const action = { type: wsOpen.type }
        const state = allOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, connectionError: null })
    })

    it('wsError is correct', () => {
        const action = { type: wsError.type, payload: 'Error' }
        const state = allOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({ ...initialState, connectionError: 'Error' })
    })

    it('wsMessage is correct', () => {
        const payload = {
            orders: [ORDER],
            total: 200,
            totalToday: 100,
        }
        const action = { type: wsMessage.type, payload }
        const state = allOrdersSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            loaded: true,
            orders: [ORDER],
            total: 200,
            totalToday: 100,
        })
    })
})
