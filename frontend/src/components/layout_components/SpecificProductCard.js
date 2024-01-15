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
        const detail = await fetch(`https://millenium-orthodontics.onrender.com/api/products/${data.id}/${data.product}`)
        const jsondata = await detail.json()
        console.log(jsondata, "info.name")
        setInfo(jsondata)
    }

    const deleteProducts = async () => {
        const res = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/delete-from-cart/${info._id}`, {
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
        const data = await fetch("https://millenium-orthodontics.onrender.com/api/cart/add-to-cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken, // Include the token in the Authorization header
            },
            body: JSON.stringify({ productId: info.id, quantity: info.qty, productName: info.name }),
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
            <div className="card mb-3 res-specific-prod-card-wrapper">
                <div className="row g-0 res-specific-prod-card">
                    <div className="col-md-4 res-specific-prod-img-wrapper" >
                        <img src={info?.cloudinaryImage} className="img-fluid rounded-start res-specific-prod-img" alt="productimg" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-capitalize responsive-center">{info?.name}</h5>
                            <p className="card-text text-capitalize">{info?.description}.</p>
                            {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                            <h5 className="card-title">Rs.{info?.price}</h5>
                            {cartData.length !== 0 && cartData.some(item => item.product.id === info?.id) ? <button type="button" className="btn btn-primary btn-sm btn-color" onClick={handleCartRemove}> Remove from Cart</button>
                                : <button type="button" className="btn btn-primary btn-sm btn-color" onClick={handleCart}>Add to Cart</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificProductCard
