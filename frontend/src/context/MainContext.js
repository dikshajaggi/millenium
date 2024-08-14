import React, { createContext, useEffect, useState } from 'react'
import { getAllProducts, getCart } from '../apis'
import { useDispatch } from 'react-redux'
import { setCartItems } from '../redux/cartSlice'


const MainContext = createContext()

const MainContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const [token, setToken] = useState("")
    const [products, setProducts] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const fetchProductList = async () => {
        const products = await getAllProducts()
        console.log(products, "products")
        setProducts(products)
    }

    useEffect(() => {
        const fetchCartItems = async (token) => {
            try {
                const response = await getCart({headers:{token}});
                console.log(response, "get all cart products")
                dispatch(setCartItems(response.data.cartData));
                setOrderPlaced(false)
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        if (token) {
            fetchCartItems(token);
        }
    }, [dispatch, token, orderPlaced]);

    useEffect(() => {
        async function loadData () {
            await fetchProductList()
        }
        loadData()
        
        // when we reload the webpage, the token should set again, otherwise the user will get logged-out
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

  return (
    <MainContext.Provider
    value={{
        token,
        setToken,
        products,
        setProducts,
        orderPlaced,
        setOrderPlaced
    }}>
        {children}
    </MainContext.Provider>
  )
}

export { MainContextProvider, MainContext }