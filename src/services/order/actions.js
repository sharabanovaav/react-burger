import { createAsyncThunk } from '@reduxjs/toolkit'
import { makeOrder } from '../../utils/norma-api'

/* eslint-disable */
export const createOrder = createAsyncThunk(
    'order/makeOrder',
    async (request) => {
         const {
            order: { number },
        } = await makeOrder(request)

        return number
    }
)
