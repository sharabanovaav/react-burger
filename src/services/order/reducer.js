import { createSlice } from '@reduxjs/toolkit'
import { createOrder } from './actions'

const initialState = {
    orderId: null,
    loading: false,
    error: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrderId: (state) => state.orderId,
        getLoading: (state) => state.loading,
    },
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orderId = action.payload
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.orderId = null
            })
    },
})

export const { getOrderId, getLoading } = orderSlice.selectors
export const { reset } = orderSlice.actions
