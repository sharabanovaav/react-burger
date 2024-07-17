import { createAsyncThunk } from '@reduxjs/toolkit'
import { TIngredient } from '../../types'
import { api } from '../../utils/api'
import { TThunkAPI } from '../store'

export const createOrder = createAsyncThunk<number, TIngredient[], TThunkAPI>(
    'order/makeOrder',
    async (request: TIngredient[]) => {
        const {
            order: { number },
        } = await api.makeOrder(request)

        return number
    }
)
