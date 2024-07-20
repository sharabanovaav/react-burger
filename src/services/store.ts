import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import reducer from './rootReducer'
import { api } from '../utils/api'
import { TBurgerConstructorActions } from './burger-constructor/reducer';
import { TIngredientsActions } from './ingredients/reducer';
import { TOrderActions } from './order/reducer';
import { TUserActions } from './user/reducer';

export type TRootState = ReturnType<typeof reducer>; 
export type TAppActions = TBurgerConstructorActions | TOrderActions | TUserActions | TIngredientsActions;

export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  { api: typeof api },
  TAppActions
>;

export type TAppDispatch = ThunkDispatch<TRootState, TAppThunk, TAppActions>;

export const useDispatch = dispatchHook.withTypes<TAppDispatch>();
export const useSelector = selectorHook.withTypes<TRootState>();

export default configureStore({
  reducer,
})
