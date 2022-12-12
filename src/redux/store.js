import { configureStore } from "@reduxjs/toolkit";
import { currencySlice } from "./CurrencySlice";
import { cartSlice } from "./CartSlice"

export const store = configureStore({
    reducer: {
        currencyStore: currencySlice.reducer,
        cartStore: cartSlice.reducer
    }
});