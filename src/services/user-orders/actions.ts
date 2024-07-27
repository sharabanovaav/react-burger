import {createAction} from "@reduxjs/toolkit";

export const userOrdersWsConnect = createAction<string, "USER_ORDERS_CONNECT">("USER_ORDERS_CONNECT");
export const userOrdersWsDisconnect = createAction("USER_ORDERS_DISCONNECT");

export type TUserOrderslActions = ReturnType<typeof userOrdersWsConnect> | ReturnType<typeof userOrdersWsDisconnect>;