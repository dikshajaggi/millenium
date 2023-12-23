import { createContext, useState } from "react";

const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cartData, setCartData] = useState([])
    return (
        <CartContext.Provider value={{
            cartData,
            setCartData
        }
        }>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartContextProvider }