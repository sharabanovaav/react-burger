import { createSlice } from '@reduxjs/toolkit'
// import { loadIngredients } from './actions'

const initialState = {
    order: null,
    loading: false,
    error: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrder: (state) => state.order,
    },
    // extraReducers: (builder) => {
    // builder
    // .addCase(loadIngredients.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.ingredients = action.payload
    // })
    // .addCase(loadIngredients.pending, (state) => {
    //     state.loading = true
    //     state.error = null
    // })
    // .addCase(loadIngredients.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload
    // })
    // },
})

export const { getOrder } = orderSlice.selectors