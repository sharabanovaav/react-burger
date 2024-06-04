import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/norma-api'

/* eslint-disable */
export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    async () => {
        const { data } = await getIngredients()
        return data
    }
)
