import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    async () => {
        const { data } = await api.getIngredients()
        return data
    }
)
