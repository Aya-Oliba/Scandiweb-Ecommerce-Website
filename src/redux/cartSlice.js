import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    cartProductsMap: {}
}

/**
 * this function generate a unique key for each product based on its attributes selection
 * @param {{}} product 
 * @returns {string}
 */
function generateProductKey(product, attributesSelection) {
    let key = product.id;
    // if product has no attributes, then we can use its id as a key
    if(product.attributes.length === 0) {
        return key;
    }

    // if product has attributes, then we need to generate a key that loop in the attributes selection
    // to be able to differentiate between same product with different selections
    product.attributes.forEach( attribute => {
        key += attributesSelection[attribute.id];
    });
    return key;
}

// reducer
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=> {
            const key = generateProductKey(action.payload.product, action.payload.attributesSelection);
            if (state.cartProductsMap[key]) {
                state.cartProductsMap[key]['count'] += 1;
            } else {
                // add a new entry to the map with count set to 1
                state.cartProductsMap[key] = {
                    product: action.payload.product,
                    attributesSelection: action.payload.attributesSelection,
                    count: 1,
                }
            }
        },
        removeFomCart: (state, action) => {
            const key = generateProductKey(action.payload.product, action.payload.attributesSelection);
            if (state.cartProductsMap[key]) {
                state.cartProductsMap[key]['count'] -= 1;
            }

            // check if product should be removed from cart
            if (state.cartProductsMap[key]['count'] === 0) {
                delete state.cartProductsMap[key];
            }
        } 
    }
})

// actions
export const { addToCart , removeFomCart } = cartSlice.actions;
export default cartSlice.reducer;