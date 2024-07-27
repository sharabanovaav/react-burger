import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TOrder, TAllOrdersResponse } from "../../types";

type TState = {
    orders: TOrder[];
    connectionError: string | null;
}

const initialState: TState = {
    orders: [],
    connectionError: null,
};

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState,
    selectors: {
        getOrders: state => state.orders,
    },
    reducers: {
        wsOpen: (state) => {
            state.connectionError = null;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TAllOrdersResponse>) => {
            state.orders = action.payload.orders
        }
    },
})

export const { wsOpen, wsError, wsMessage } = allOrdersSlice.actions;
export const { getOrders } = allOrdersSlice.selectors;
