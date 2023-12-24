import { createContext, useContext, useReducer, useState } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cartState, dispatch] = useReducer(cartReducer, {
        cart: []
    })
    return (
        <CartContext.Provider value={{
            cartState,
            dispatch
        }
        }>
            {props.children}
        </CartContext.Provider>
    )
}

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { useCart, CartContextProvider }