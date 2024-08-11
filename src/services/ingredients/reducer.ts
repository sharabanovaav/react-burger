import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from '../../types'
import { loadIngredients } from './actions'

type TState = {
    ingredients: TIngredient[]
    loading: boolean
}

export const initialState: TState = {
    ingredients: [],
    loading: false,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    selectors: {
        getIngredients: (state) => state.ingredients,
        getLoading: (state) => state.loading,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
                state.loading = false
                state.ingredients = action.payload
            })
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true
            })
            .addCase(loadIngredients.rejected, (state) => {
                state.loading = false
                state.ingredients = []
            })
    },
})

export const { getIngredients, getLoading } = ingredientsSlice.selectors

export type TIngredientsActions = ReturnType<typeof ingredientsSlice.actions[keyof typeof ingredientsSlice.actions]>;
