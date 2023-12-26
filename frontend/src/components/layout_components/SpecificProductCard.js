import React, { useContext, useEffect, useState } from 'react'
import productimg from "../../assests/products/product.png"
import { Link } from 'react-router-dom'
import "../styles.scss"
import { CartContext, useCart } from '../../context/cartContext'
import { MainContext } from '../../context/MainContext'

const SpecificProductCard = ({ data }) => {
    const [info, setInfo] = useState()
    const { cartState, dispatch } = useCart()
    const context = useContext(MainContext)
    const getdata = async () => {
        const detail = await fetch(`http://localhost:8000/api/products/${data.id}/${data.product}`)
        const jsondata = await detail.json()
        setInfo(jsondata)
    }

    const addToCart = async () => {
        await fetch("http://localhost:8000/api/cart/add-to-cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            },
            body: JSON.stringify({ productId: info.id, quantity: info.qty }),
        });

    }

    const handleCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: info })
        addToCart()
    }

    const handleCartRemove = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: info })
    }

    console.log(cartState)

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>
            <div class="card mb-3" style={{ maxWidth: "1200px", minHeight: "400px" }}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={info?.cloudinaryImage} class="img-fluid rounded-start" alt="productimg" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{info?.name}</h5>
                            <p class="card-text">{info?.description}.</p>
                            {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
                            <h5 class="card-title">Rs.{info?.price}</h5>
                            {cartState.cart.length !== 0 && cartState.cart.some(item => item.id === info?.id) ? <button type="button" class="btn btn-primary btn-sm btn-color" onClick={handleCartRemove}> Remove from Cart</button>
                                : <button type="button" class="btn btn-primary btn-sm btn-color" onClick={handleCart}>Add to Cart</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificProductCard
