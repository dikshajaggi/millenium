import React, { useContext, useEffect, useState } from 'react'
import "../styles.scss"
import { useCart } from '../../context/cartContext'
import { MainContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'

const SpecificProductCard = ({ data }) => {
    const { cartState, dispatch } = useCart()
    const [cartData, setCartData] = useState(cartState.cart)
    const [info, setInfo] = useState()
    const context = useContext(MainContext)
    const navigate = useNavigate()
    const getdata = async () => {
        const detail = await fetch(`http://localhost:8000/api/products/${data.id}/${data.product}`)
        const jsondata = await detail.json()
        setInfo(jsondata)
    }

    const deleteProducts = async () => {
        const res = await fetch(`http://localhost:8000/api/cart/delete-from-cart/${info._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken
            }
        })

        if (res.ok) {
            context.setDelete(context.del + 1)
            handleCartRemove()
        }

        console.log(res, "info check")
    }

    const addToCart = async () => {
        const data = await fetch("http://localhost:8000/api/cart/add-to-cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            },
            body: JSON.stringify({ productId: info.id, quantity: info.qty }),
        });

        console.log(await data.json(), "add to cart")

    }

    const handleCart = () => {
        console.log(info, "checking info", context.userLoginToken)
        const data = { product: info, quantity: info.qty }
        if (context.userLoginToken) {
            dispatch({ type: "ADD_TO_CART", payload: data })
            addToCart()
        }
        else navigate("/login")
    }

    const handleCartRemove = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: info })
        deleteProducts()
    }

    console.log(cartState.cart)

    useEffect(() => {
        getdata()
        // eslint-disable-next-line
    }, [context.userLoginToken, context.del])

    useEffect(() => {
        setCartData(cartState.cart)
    }, [cartState.cart])

    console.log(cartData, "specific data", cartState)

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
                            {cartData.length !== 0 && cartData.some(item => item.product.id === info?.id) ? <button type="button" class="btn btn-primary btn-sm btn-color" onClick={handleCartRemove}> Remove from Cart</button>
                                : <button type="button" class="btn btn-primary btn-sm btn-color" onClick={handleCart}>Add to Cart</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificProductCard
