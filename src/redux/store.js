import { configureStore } from "@reduxjs/toolkit";
import { currencySlice } from "./currencySlice";
import { cartSlice } from "./cartSlice"

export const store = configureStore({
    reducer: {
        currencyStore: currencySlice.reducer,
        cartStore: cartSlice.reducer
    }
});