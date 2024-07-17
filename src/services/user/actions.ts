import { createAsyncThunk } from '@reduxjs/toolkit'
import { TUser, TUserForm } from '../../types'
import { api } from '../../utils/api'
import { TThunkAPI } from '../store'

export const getUser = createAsyncThunk<TUser, void, TThunkAPI>('user/getUser', () => api.getUser())

export const login = createAsyncThunk<TUser, Omit<TUserForm, "name">, TThunkAPI>('user/login', api.login)

export const logout = createAsyncThunk<void, void, TThunkAPI>('user/logout', api.logout)

export const updateUser = createAsyncThunk<TUser, TUserForm, TThunkAPI>('user/updateUser', api.updateUser)

export const registerUser = createAsyncThunk<TUser, TUserForm, TThunkAPI>(
    'user/registerUser',
    api.registerUser
)
