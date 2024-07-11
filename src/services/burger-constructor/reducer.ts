import { createSlice } from '@reduxjs/toolkit'
import { BUNS_QUANTITY } from '../../consts'
import { TIngredient } from '../../types'

type TState = {
    bun: TIngredient | null
    ingredients: TIngredient[]
}

const initialState: TState = {
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
        reset: () => initialState,
        setBun(state, action) {
            state.bun = action.payload
        },
        setIngredients(state, action) {
            state.ingredients = action.payload
        },
        addIngredient(state, action) {
            state.ingredients.push(action.payload)
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
export const {
    setBun,
    setIngredients,
    addIngredient,
    deleteIngredient,
    reset,
} = burgerConstructorSlice.actions
