import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bun: null,
    ingredients: [],
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    selectors: {
        getIngredients: (state) => state.ingredients,
        getBun: (state) => state.bun,
    },
    reducers: {
        setBun(state, action) {
            state.bun = action.payload
        },
        setIngredients(state, action) {
            state.ingredients = action.payload
        },
    },
})

export const { getIngredients, getBun } = burgerConstructorSlice.selectors
export const { setBun, setIngredients } = burgerConstructorSlice.actions
