import React, { useContext, useEffect, useState } from 'react'
import Cart_card from '../components/layout_components/Cart_card'
import CartRelatedProducts from '../components/layout_components/CartRelatedProducts'
import CartInfo from '../components/layout_components/CartInfo'
import { useCart } from '../context/cartContext'
import { MainContext } from '../context/MainContext'
import emptyCart from "../assests/icons/cart/empty-cart.png"

const Cart = () => {
    const { cartState, dispatch } = useCart()
    console.log(cartState, cartState.cart, "cart state cart")
    const context = useContext(MainContext)
    const [cartData, setCartData] = useState([])

    const getCart = async () => {
        const data = await fetch(`http://localhost:8000/api/cart/all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            }
        })
        const jsondata = await data.json()
        console.log(jsondata, "cartData jsondata", data)
        if (data.ok) localStorage.setItem('cart', JSON.stringify(jsondata.cartProducts))
        setCartData(jsondata.cartProducts)
    }

    useEffect(() => {
        console.log("getttttttt cartttttttt", localStorage.getItem('cart') !== null, localStorage.getItem('cart'))
        getCart()
        if (localStorage.getItem('cart') !== undefined) setCartData(JSON.parse(localStorage.getItem('cart')))
    }, [cartState.cart, context.del])

    console.log(cartData, "undefined cartData", cartData !== null && cartData !== undefined)

    return (
        <div>
            {cartData !== null && cartData !== undefined ? <div className='d-flex flex-sm-row flex-column align-items-center justify-content-between' style={{ padding: "200px" }}>
                <div className='d-flex flex-row flex-sm-column align-items-center justify-content-evenly'>
                    {cartData.length !== 0 && cartData.map(item => {
                        return (
                            <Cart_card data={item} />
                        )
                    })}
                </div>

                <div className='d-flex flex-column align-items-center justify-content-evenly'>
                    <CartInfo />
                    <CartRelatedProducts />
                </div>
            </div> : <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100%" }}>
                <h4 style={{ margin: "30px 0" }}>Your cart is currently empty !</h4>
                <img src={emptyCart} style={{ height: "240px", marginLeft: "-20px", marginBottom: "40px" }} />
            </div>}
        </div>

    )
}

export default Cart
