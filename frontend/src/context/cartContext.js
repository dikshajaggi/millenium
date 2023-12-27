import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "./cartReducer";
import { MainContext } from "./MainContext";

const CartContext = createContext();

const CartContextProvider = (props) => {
    const context = useContext(MainContext)
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  useEffect(() => {
    const getCart = async () => {
        const data = await fetch(`http://localhost:8000/api/cart/all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            }
        })
        // if (data.ok) {
        //     const jsondata = await data.json();
        //     // Dispatch an action to initialize the cart state
        //     dispatch({ type: "SET_INITIAL_STATE", payload: jsondata.cartProducts });
        //     console.log(jsondata.cartProducts, "jsondata.cartProducts");
        // }
    }
    getCart()
  }, [context.userLoginToken]); // Run this effect only once when the component mounts

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { useCart, CartContextProvider };
