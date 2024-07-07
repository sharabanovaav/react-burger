import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export const getUser = createAsyncThunk('user/getUser', () => api.getUser())

export const login = createAsyncThunk('user/login', api.login)

export const logout = createAsyncThunk('user/logout', api.logout)

export const updateUser = createAsyncThunk('user/updateUser', api.updateUser)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    api.registerUser
)
