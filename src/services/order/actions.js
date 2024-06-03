import { createAsyncThunk } from '@reduxjs/toolkit'
import { makeOrder } from '../../utils/norma-api'

/* eslint-disable */
export const createOrder = createAsyncThunk(
    'order/makeOrder',
    async (request, thunkAPI) => {
        try {
            const {
                order: { number },
            } = await makeOrder(request)

            return number
        } catch (error) {
            thunkAPI.rejectWithValue(error.message)
        }
    }
)
