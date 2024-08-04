import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TOrder, TUserOrdersResponse } from "../../types";

type TState = {
    orders: TOrder[];
    connectionError: string | null;
}

export const initialState: TState = {
    orders: [],
    connectionError: null,
};

export const userOrdersSlice = createSlice({
    name: "userOrders",
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
        wsMessage: (state, action: PayloadAction<TUserOrdersResponse>) => {
            state.orders = action.payload.orders
        }
    },
})

export const { wsOpen, wsError, wsMessage } = userOrdersSlice.actions;
export const { getOrders } = userOrdersSlice.selectors;
