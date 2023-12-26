import React, { useContext, useEffect, useState } from 'react'
import Cart_card from '../components/layout_components/Cart_card'
import CartRelatedProducts from '../components/layout_components/CartRelatedProducts'
import CartInfo from '../components/layout_components/CartInfo'
import { useCart } from '../context/cartContext'
import { MainContext } from '../context/MainContext'

const Cart = () => {
    const { cartState, dispatch } = useCart()
    const context = useContext(MainContext)
    const [cartData, setCartData] = useState([])

    console.log(cartState.cart)

    const getCart = async () => {
        console.log(context.userLoginToken, "context.userLoginToken")
        const data = await fetch(`http://localhost:8000/api/cart/all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            }
        })
        const jsondata = await data.json()
        console.log(jsondata, "cart products")
        setCartData(jsondata)
    }

    useEffect(() => {
        getCart()
    }, [cartState.cart])

    return (
        <div className='d-flex flex-sm-row flex-column align-items-center justify-content-space-evenly'>
            {cartData.cartProducts.map(item => {
                <Cart_card data={item} />
            })}
            <div className='d-flex flex-column align-items-center justify-content-space-evenly'>
                <CartInfo />
                <CartRelatedProducts />
            </div>
        </div>
    )
}

export default Cart
