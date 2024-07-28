import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOrder } from "../../types/index";
import { createOrder, getOrderByNumber } from './actions'

type TState = {
    orderId: number | null
    loading: boolean
    order: TOrder | null
}

const initialState: TState = {
    orderId: null,
    loading: false,
    order: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrderId: (state) => state.orderId,
        getLoading: (state) => state.loading,
        getOrder: state => state.order,
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
            .addCase(getOrderByNumber.fulfilled, (state, action: PayloadAction<TOrder>) => {
                state.loading = false
                state.order = action.payload
            })
            .addCase(getOrderByNumber.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderByNumber.rejected, (state) => {
                state.loading = false
                state.order = null
            })
    },
})

export const { getOrderId, getLoading, getOrder } = orderSlice.selectors
export const { reset } = orderSlice.actions

export type TOrderActions = ReturnType<typeof orderSlice.actions[keyof typeof orderSlice.actions]>;
