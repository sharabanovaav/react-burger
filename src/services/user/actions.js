import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export const getUser = createAsyncThunk('user/getUser', () => api.getUser())

export const login = createAsyncThunk('user/login', (request) =>
    api.login(request)
)

export const logout = createAsyncThunk('user/logout', (request) =>
    api.logout(request)
)

export const registerUser = createAsyncThunk('user/registerUser', (request) =>
    api.registerUser(request)
)
