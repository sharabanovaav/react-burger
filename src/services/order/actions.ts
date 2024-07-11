import { createAsyncThunk } from '@reduxjs/toolkit'
import { TIngredient } from '../../types'
import { api } from '../../utils/api'

export const createOrder = createAsyncThunk(
    'order/makeOrder',
    async (request: TIngredient[]) => {
        const {
            order: { number },
        } = await api.makeOrder(request)

        return number
    }
)
