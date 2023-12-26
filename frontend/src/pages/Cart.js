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

    console.log(cartData, "cardata check")
    useEffect(() => {
        console.log("getttttttt cartttttttt")
        getCart()
    }, [cartState.cart])

    return (
        <div className='d-flex flex-sm-row flex-column align-items-center justify-content-between' style={{padding: "200px"}}>
            <div className='d-flex flex-row flex-sm-column align-items-center justify-content-evenly'>
            {cartData.length !== 0 && cartData.cartProducts.map(item => {
                return (
                       <Cart_card data={item} />
                )
            })}
            </div>
            <div className='d-flex flex-column align-items-center justify-content-evenly'>
                <CartInfo />
                <CartRelatedProducts />
            </div>
        </div>
    )
}

export default Cart
