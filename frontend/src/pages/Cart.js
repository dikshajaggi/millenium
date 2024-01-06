import React, { useContext, useEffect, useState } from 'react'
import Cartcard from '../components/layout_components/Cartcard'
import CartInfo from '../components/layout_components/CartInfo'
import { useCart } from '../context/cartContext'
import { MainContext } from '../context/MainContext'
import emptyCart from "../assests/icons/cart/empty-cart.png"
import { Link } from 'react-router-dom'
import ProductCard from '../components/layout_components/ProductCard'

const Cart = () => {
    const { cartState } = useCart()
    console.log(cartState, cartState.cart, "cart state cart")
    const context = useContext(MainContext)
    const [cartData, setCartData] = useState([])
    const [searched, setSearched] = useState(false)

    const getCart = async () => {
        const data = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken,
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
        context.setSearched(false)
        if (localStorage.getItem('cart') !== undefined) setCartData(JSON.parse(localStorage.getItem('cart')))
        // eslint-disable-next-line
    }, [cartState.cart, context.del, context.qtyUpdated])

    useEffect(() => {
        if (context.searchedProducts !== null) setSearched(true)
        if (context.searched === false && context.categorySearch) setSearched(false)
        // eslint-disable-next-line
    }, [context.searched])

    console.log(cartData, "undefined cartData", cartData !== null && cartData !== undefined, cartData !== null && cartData !== undefined && cartData?.length !== 0)

    return (
        <div className="container mt-5">
            {searched ? (
                <Link className="style-link" to={`/product/${context.searchedProducts.name}/${context.searchedProducts._id}`} key={context.searchedProducts._id}>
                    <ProductCard data={context.searchedProducts} />
                </Link>
            ) : (
                cartData !== null && cartData !== undefined && cartData?.length !== 0 ? (
                    <div className='row'>
                        <div className='col-md-8'>
                            {cartData.map(item => (
                                <Cartcard key={item.product._id} data={item} />
                            ))}
                        </div>
                        <div className='col-md-4'>
                            <CartInfo data={cartData} />
                        </div>
                    </div>
                ) : (
                    <div className='d-flex flex-column justify-content-center align-items-center height100'>
                        <h4 className='cart-empty-h4'>Your cart is currently empty!</h4>
                        <img src={emptyCart} className='cart-empty-img' alt="empty-cart" />
                    </div>
                )
            )}
        </div>


    )
}

export default Cart
