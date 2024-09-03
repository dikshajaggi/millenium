import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },

        addToCart: (state, action) => {
            const { id } = action.payload;
            if (!state.cartItems) {
                state.cartItems = {};
            }
        
            if (!state.cartItems[id]) {
                state.cartItems = {
                    ...state.cartItems,
                    [id]: 1
                };
            } else {
                state.cartItems = {
                    ...state.cartItems,
                    [id]: state.cartItems[id] + 1
                };
            }
        },

        removeFromCart: (state, action) => {
            const { id } = action.payload;
            state.cartItems = {
                ...state.cartItems,
                [id]: state.cartItems[id] - 1
            };
            }
        },
        clearCart: (state) => {
            state.cartItems = {};
        }
})

export const { setCartItems, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
