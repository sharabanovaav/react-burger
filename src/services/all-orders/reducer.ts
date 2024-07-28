import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TOrder, TAllOrdersResponse } from "../../types";

type TState = {
    orders: TOrder[];
    total: number | null;
    totalToday: number | null;
    connectionError: string | null;
}

const initialState: TState = {
    orders: [],
    total: null,
    totalToday: null,
    connectionError: null,
};

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState,
    selectors: {
        getOrders: state => state.orders,
        getTotal: state => state.total,
        getTotalToday: state => state.totalToday,
    },
    reducers: {
        wsOpen: (state) => {
            state.connectionError = null;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TAllOrdersResponse>) => {
            const {orders, total, totalToday} = action.payload
            state.orders = orders
            state.total = total
            state.totalToday = totalToday
        }
    },
})

export const { wsOpen, wsError, wsMessage } = allOrdersSlice.actions;
export const { getOrders, getTotal, getTotalToday } = allOrdersSlice.selectors;
