import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUser } from '../../types'
import {
    login,
    logout,
    getUser as getUserAction,
    registerUser,
    updateUser,
} from './actions'

type TState = {
    user: TUser | null
    isAuthChecked: boolean
}

export const initialState: TState = {
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
        setUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload
        },
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<TUser | null>) => {
                state.user = action.payload
                state.isAuthChecked = true
            })
            .addCase(getUserAction.fulfilled, (state, action: PayloadAction<TUser | null>) => {
                state.user = action.payload
                state.isAuthChecked = true
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser | null>) => {
                state.user = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser | null>) => {
                state.user = action.payload
            })
    },
})

export const { setUser, setIsAuthChecked } = userSlice.actions
export const { getUser, getIsAuthChecked } = userSlice.selectors

export type TUserActions = ReturnType<typeof userSlice.actions[keyof typeof userSlice.actions]>;
