import { createAsyncThunk } from '@reduxjs/toolkit'
import { getIngredients } from '../../utils/norma-api'

/* eslint-disable */
// export const loadIngredients = createAsyncThunk(
//     'ingredients/loadIngredients',
//     async (_, thunkAPI) => {
//         try {
//             const { data } = await getIngredients()
//             return data
//         } catch (error) {
//             thunkAPI.rejectWithValue(error.message)
//         }
//     }
// )
