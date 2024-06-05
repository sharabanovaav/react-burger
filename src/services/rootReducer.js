import { combineReducers } from 'redux'
import { ingredientsSlice } from './ingredients/reducer'
import { burgerConstructorSlice } from './burger-constructor/reducer'
import { orderSlice } from './order/reducer'
import { ingredientDetailsSlice } from './ingredient-details/reducer'

export default combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [ingredientDetailsSlice.reducerPath]: ingredientDetailsSlice.reducer,
})
