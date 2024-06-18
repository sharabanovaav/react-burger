import { createSlice } from '@reduxjs/toolkit'
import {
    login,
    logout,
    getUser as getUserAction,
    registerUser,
    updateUser,
} from './actions'

const initialState = {
    user: null,
    isAuthChecked: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getUser: (state) => state.user,
        getIsAuthChecked: (state) => state.isAuthChecked,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthChecked = true
            })
            .addCase(getUserAction.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthChecked = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

export const { setUser, setIsAuthChecked } = userSlice.actions
export const { getUser, getIsAuthChecked } = userSlice.selectors
