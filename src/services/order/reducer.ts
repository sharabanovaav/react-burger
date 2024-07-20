import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createOrder } from './actions'

type TState = {
    orderId: number | null
    loading: boolean
}

const initialState: TState = {
    orderId: null,
    loading: false,
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
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<number | null>) => {
                state.loading = false
                state.orderId = action.payload
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrder.rejected, (state) => {
                state.loading = false
                state.orderId = null
            })
    },
})

export const { getOrderId, getLoading } = orderSlice.selectors
export const { reset } = orderSlice.actions

export type TOrderActions = ReturnType<typeof orderSlice.actions[keyof typeof orderSlice.actions]>;
