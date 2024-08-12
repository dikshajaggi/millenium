import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [{id: "a", name: "abcd", qty: 2, catgeory: "defgh"}]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem =  state.cartItems.find(item => item.id === action.payload.id) 
            if (existingItem) existingItem.qty = existingItem.qty + 1
            else state.cartItems.push(action.payload)
        },
        incQty: (state, action) => {
            const existingItem =  state.cartItems.find(item => item.id === action.payload.id) 
            if (existingItem) existingItem.qty = existingItem.qty + 1
            else state.cartItems.push(action.payload)
        },
        decQty: (state, action) => {
            const existingItem =  state.cartItems.find(item => item.id === action.payload.id) 
            if (existingItem) existingItem.qty = existingItem.qty - 1
            else state.cartItems.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cartItems =  state.cartItems.filter(item => item.id !== action.payload.id) 
        },
        clearCart: (state) => {
            state.cartItems = []
        },
    }
})

export const {addToCart, incQty, decQty, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer