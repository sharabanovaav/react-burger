import { createSlice, nanoid } from '@reduxjs/toolkit'

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

export const { getIngredients, getBun } = burgerConstructorSlice.selectors
export const { setBun, addIngredient, deleteIngredient } =
    burgerConstructorSlice.actions
