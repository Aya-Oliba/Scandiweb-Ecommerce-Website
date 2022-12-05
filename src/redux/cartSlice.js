import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    cartProductsMap: {}
}

// reducer
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=> {
            if(action.payload.product.attributes.length == 0) {
                if(state.cartProductsMap[action.payload.product.id]){
                    state.cartProductsMap[action.payload.product.id]['count'] += 1;
                } else {
                    state.cartProductsMap[action.payload.product.id] = {
                        product: action.payload,
                        count: 1,
                    }
                }
            }else {
                let key = action.payload.product.id;
                action.payload.product.attributes.forEach((attribute,i)=> {
                    key += action.payload.attributesSelection[attribute.id]
                })
                if(state.cartProductsMap[key]){
                    state.cartProductsMap[key]['count'] += 1;
                }else {
                    state.cartProductsMap[key] = {
                        product: action.payload.product,
                        attributesSelection: action.payload.attributesSelection,
                        count: 1,
                    }
                }
            }
            
        }
    }
})

// actions
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;