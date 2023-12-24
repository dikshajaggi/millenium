import React, { useContext, useEffect, useState } from 'react'
import productimg from "../../assests/products/product.png"
import { Link } from 'react-router-dom'
import "../styles.scss"
import { CartContext, useCart } from '../../context/cartContext'

const SpecificProductCard = ({ data }) => {
    const [info, setInfo] = useState()
    const { cartState, dispatch } = useCart()
    const getdata = async () => {
        const detail = await fetch(`http://localhost:8000/api/products/${data.id}/${data.product}`)
        const jsondata = await detail.json()
        setInfo(jsondata)
    }

    const addToCart = async () => {
        await fetch(`http://localhost:8000/api/cart/add-to-cart/${info}`)
    }

    const getCart = async () => {
        const data = await fetch(`http://localhost:8000/api/cart/all-products`)
        const jsondata = data.json()
        console.log(jsondata, "cart products")
    }

    const handleCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: info })
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
