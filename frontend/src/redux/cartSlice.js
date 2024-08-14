import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [{id: "a", name: "abcd", qty: 2, catgeory: "defgh", price: 1500}]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty += 1; // Increment quantity if the item already exists
            } else {
                state.cartItems.push({ ...action.payload, qty: 1 }); // Add new item with qty 1
            }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.qty > 1) {
                    existingItem.qty -= 1; // Decrement quantity if it's greater than 1
                } else {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id); // Remove item if qty is 1
                }
            }
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer