import { combineReducers } from 'redux'
import { ingredientsSlice } from './ingredients/reducer'
import { burgerConstructorSlice } from './burger-constructor/reducer'
import { orderSlice } from './order/reducer'
import { userSlice } from './user/reducer'
import { allOrdersSlice } from './all-orders/reducer'
import { userOrdersSlice } from './user-orders/reducer'

export default combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [allOrdersSlice.reducerPath]: allOrdersSlice.reducer,
    [userOrdersSlice.reducerPath]: userOrdersSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
})
