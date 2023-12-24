import React from 'react'
import Cart_card from '../components/layout_components/Cart_card'
import CartRelatedProducts from '../components/layout_components/CartRelatedProducts'
import CartInfo from '../components/layout_components/CartInfo'
import { useCart } from '../context/cartContext'

const Cart = () => {
    const { cartState, dispatch } = useCart()
    console.log(cartState.cart)

    return (
        <div className='d-flex flex-sm-row flex-column align-items-center justify-content-space-evenly'>
            <Cart_card />
            <div className='d-flex flex-column align-items-center justify-content-space-evenly'>
                <CartInfo />
                <CartRelatedProducts />
            </div>
        </div>
    )
}

export default Cart
