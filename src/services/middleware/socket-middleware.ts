import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Middleware,
} from "@reduxjs/toolkit";
import { renewRefreshToken } from "../../utils/api";
import { TRootState } from "../store";

export type TWsActionTypes = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<any>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
    wsActions: TWsActionTypes,
    withTokenRefresh = false
): Middleware<object, TRootState> => (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            sendMessage,
            onOpen,
            onClose,
            onError,
            onMessage,
            onConnecting,
            disconnect,
        } = wsActions;

        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";

        return (next) => (action) => {
            const { dispatch } = store;

            if (connect.match(action)) {
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;

                if (onConnecting) {
                    dispatch(onConnecting());
                }

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = () => {
                    dispatch(onError("Error"));
                };

                socket.onmessage = (event) => {
                    const { data } = event;

                    try {
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            renewRefreshToken()
                                .then(refreshData => {
                                    const wssUrl = new URL(url);

                                    wssUrl.searchParams.set(
                                        "token",
                                        refreshData.accessToken.replace("Bearer ", "")
                                    );

                                    dispatch(connect(wssUrl.toString()));
                                })
                                .catch(error => {
                                    dispatch(onError((error as {message: string}).message));
                                });
                            
                            dispatch(disconnect());

                            return;
                        }

                        dispatch(onMessage(parsedData));
                    } catch (error) {
                        dispatch(onError((error as {message: string}).message));
                    }
                };

                socket.onclose = () => {
                    if (onClose) {
                        dispatch(onClose());
                    }

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url));
                        }, RECONNECT_PERIOD);
                    }
                };
            }

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (error) {
                    dispatch(onError((error as {message: string}).message));
                }
            }

            if (socket && disconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        };
    };