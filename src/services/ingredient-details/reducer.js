import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    details: null,
}

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    selectors: {
        getDetails: (state) => state.details,
    },
    reducers: {
        setDetails(state, action) {
            state.details = action.payload
        },
        deleteDetails(state) {
            state.details = null
        },
    },
})

export const { getDetails } = ingredientDetailsSlice.selectors
export const { setDetails, deleteDetails } = ingredientDetailsSlice.actions
