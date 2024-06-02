import { combineReducers } from 'redux'
import { ingredientsSlice } from './ingredients/reducer'

export default combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
})
