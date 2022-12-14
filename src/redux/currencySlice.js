import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    currency: '$'
}

// reducer
export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        changeCurrency: (state, action)=> {
            state.currency = action.payload
        }
    }
})

// actions
export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;