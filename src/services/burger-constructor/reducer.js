import { createSlice, nanoid } from '@reduxjs/toolkit'

export const BUNS_QUANTITY = 2

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
        getTotalPrice: (state) => {
            const bunsPrice = state.bun ? state.bun.price * BUNS_QUANTITY : 0

            return state.ingredients.reduce(
                (sum, { price }) => sum + price,
                bunsPrice
            )
        },
    },
    reducers: {
        setBun(state, action) {
            state.bun = action.payload
        },
        addIngredient(state, action) {
            state.ingredients.push({
                ...action.payload,
                customId: nanoid(),
            })
        },
        deleteIngredient(state, action) {
            state.ingredients = state.ingredients.filter(
                (ingredient) => ingredient.customId !== action.payload
            )
        },
    },
})

export const { getIngredients, getBun, getTotalPrice } =
    burgerConstructorSlice.selectors
export const { setBun, addIngredient, deleteIngredient } =
    burgerConstructorSlice.actions
