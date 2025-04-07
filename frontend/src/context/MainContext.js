import React, { createContext, useEffect, useState } from 'react'
import { getAllProducts, getCart } from '../apis'
import { useDispatch } from 'react-redux'
import { setCartItems } from '../redux/cartSlice'
import { useAuth0 } from '@auth0/auth0-react'

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [products, setProducts] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    const { user, getAccessTokenSilently } = useAuth0();

    // Fetch products when the app loads
    useEffect(() => {
        const fetchProductList = async () => {
            const products = await getAllProducts();
            console.log(products, "products");
            setProducts(products);
        };
        fetchProductList();
    }, []);

    // Fetch token when the user logs in
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessTokenSilently();
                console.log(token, "token check"); // ✅ Logs actual token
                localStorage.setItem("token", token); // ✅ Store in localStorage
                setToken(token); // ✅ Update state
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        if (user) {
            fetchToken();
        }
    }, [user, getAccessTokenSilently]);

    // Fetch cart items when token is available
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getCart({ headers: { token } });
                console.log(response, "get all cart products");
                dispatch(setCartItems(response.data.cartData));
                setOrderPlaced(false);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        if (token) {
            fetchCartItems();
        }
    }, [dispatch, token, orderPlaced]);

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
    );
};

export { MainContextProvider, MainContext }
