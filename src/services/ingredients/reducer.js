import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    selectors: {
        getIngredients: (state) => state.ingredients,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false
                state.ingredients = action.payload
            })
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.ingredients = []
            })
    },
})

export const { getIngredients } = ingredientsSlice.selectors
