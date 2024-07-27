import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import reducer from './rootReducer'
import { TBurgerConstructorActions } from './burger-constructor/reducer';
import { TIngredientsActions } from './ingredients/reducer';
import { TOrderActions } from './order/reducer';
import { TUserActions } from './user/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  wsError as allOrdersWsError,
  wsMessage as allOrdersWsMessage,
  wsOpen as allOrdersWsOpen,
} from './all-orders/reducer';
import { TAllOrderslActions, allOrdersWsConnect, allOrdersWsDisconnect } from './all-orders/actions';

import {
  wsError as userOrdersWsError,
  wsMessage as userOrdersWsMessage,
  wsOpen as userOrdersWsOpen,
} from './user-orders/reducer';
import { TUserOrderslActions, userOrdersWsConnect, userOrdersWsDisconnect } from './user-orders/actions';


export type TRootState = ReturnType<typeof reducer>; 

type TExternalActions = TAllOrderslActions | TUserOrderslActions

export type TAppActions = TExternalActions | TBurgerConstructorActions | TOrderActions | TUserActions | TIngredientsActions;
export type TAppDispatch = ThunkDispatch<TRootState, undefined, TAppActions>;


export const useDispatch = dispatchHook.withTypes<TAppDispatch>();
export const useSelector = selectorHook.withTypes<TRootState>();

const allOrdersMiddleware = socketMiddleware({
  connect: allOrdersWsConnect,
  disconnect: allOrdersWsDisconnect,
  onOpen: allOrdersWsOpen,
  onError: allOrdersWsError,
  onMessage: allOrdersWsMessage,
});

const userOrdersMiddleware = socketMiddleware({
  connect: userOrdersWsConnect,
  disconnect: userOrdersWsDisconnect,
  onOpen: userOrdersWsOpen,
  onError: userOrdersWsError,
  onMessage: userOrdersWsMessage,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(allOrdersMiddleware, userOrdersMiddleware)
})
