import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TOrder, TAllOrdersResponse } from "../../types";

type TState = {
    orders: TOrder[];
    total: number | null;
    totalToday: number | null;
    connectionError: string | null;
    loaded: boolean
}

export const initialState: TState = {
    orders: [],
    total: null,
    totalToday: null,
    connectionError: null,
    loaded: false
};

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState,
    selectors: {
        getOrders: state => state.orders,
        getTotal: state => state.total,
        getTotalToday: state => state.totalToday,
        getLoaded: state => state.loaded,
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
            state.loaded = true
            state.orders = orders
            state.total = total
            state.totalToday = totalToday
        }
    },
})

export const { wsOpen, wsError, wsMessage } = allOrdersSlice.actions;
export const { getOrders, getTotal, getTotalToday, getLoaded } = allOrdersSlice.selectors;
