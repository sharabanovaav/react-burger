import { createAsyncThunk } from '@reduxjs/toolkit'
import { TIngredient } from '../../types'
import { api } from '../../utils/api'
import { TThunkAPI } from '../store'

export const loadIngredients = createAsyncThunk<TIngredient[], void, TThunkAPI>(
    'ingredients/loadIngredients',
    async () => {
        const { data } = await api.getIngredients()
        return data
    }
)
