import { userSlice, initialState } from './reducer'
import { logout, login, getUser, registerUser, updateUser } from './actions'
import { USER } from '../../mocks'

describe('Ingredients reducer', () => {
    it('init correctly', () => {
        const state = userSlice.reducer(undefined, { type: '' })

        expect(state).toEqual(initialState)
    })

    it('logout fulfilled is correct', () => {
        const action = { type: logout.fulfilled.type }
        const state = userSlice.reducer(initialState, action)

        expect(state).toEqual(initialState)
    })

    it('login fulfilled is correct', () => {
        const action = { type: login.fulfilled.type, payload: USER }
        const state = userSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            user: USER,
            isAuthChecked: true,
        })
    })

    it('getUser fulfilled is correct', () => {
        const action = { type: getUser.fulfilled.type, payload: USER }
        const state = userSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            user: USER,
            isAuthChecked: true,
        })
    })

    it('registerUser fulfilled is correct', () => {
        const action = { type: registerUser.fulfilled.type, payload: USER }
        const state = userSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            user: USER,
        })
    })

    it('updateUser fulfilled is correct', () => {
        const action = { type: updateUser.fulfilled.type, payload: USER }
        const state = userSlice.reducer(initialState, action)

        expect(state).toEqual({
            ...initialState,
            user: USER,
        })
    })
})
