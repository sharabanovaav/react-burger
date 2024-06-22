import { combineReducers } from 'redux'
import { ingredientsSlice } from './ingredients/reducer'
import { burgerConstructorSlice } from './burger-constructor/reducer'
import { orderSlice } from './order/reducer'
import { userSlice } from './user/reducer'

export default combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
})
