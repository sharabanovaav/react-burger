import {createAction} from "@reduxjs/toolkit";

export const allOrdersWsConnect = createAction<string, "ALL_ORDERS_CONNECT">("ALL_ORDERS_CONNECT");
export const allOrdersWsDisconnect = createAction("ALL_ORDERS_DISCONNECT");

export type TAllOrderslActions = ReturnType<typeof allOrdersWsConnect> | ReturnType<typeof allOrdersWsDisconnect>;