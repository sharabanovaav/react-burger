import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export const createOrder = createAsyncThunk(
    'order/makeOrder',
    async (request) => {
        const {
            order: { number },
        } = await api.makeOrder(request)

        return number
    }
)
