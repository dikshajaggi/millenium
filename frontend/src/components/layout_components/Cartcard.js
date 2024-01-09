import React, { useContext, useState } from 'react'
import { MainContext } from '../../context/MainContext'
import { useCart } from '../../context/cartContext'

export const Counter = ({ quantity, id }) => {
    const context = useContext(MainContext)

    const setQuantity = async (productQty) => {
        console.log(productQty, "product qty")
        const requestBody = {
            quantityChange: productQty
        }
        const data = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/update-cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken
            },
            body: JSON.stringify(requestBody)
        })
        console.log(data, "data ok check")
        if (data.ok) {
            // localStorage.setItem('cart', JSON.stringify(jsondata))
            console.log("data ok check --")
            context.setQtyUpdated(context.qtyUpdated + 1)
        }
    }

    const [qty, setQty] = useState(quantity)
    console.log(qty, "counter")
    const inc = () => {
        setQty(qty + 1)
        setQuantity(1)
    }
    const dec = () => {
        if (qty !== 1) {
            setQty(qty - 1)
            setQuantity(-1)
        } else {
            setQty(1)
            setQuantity(0)
        }
    }
    return (
        <div className='d-flex'>
            <span className='cursorpointer' onClick={inc}>+</span>
            {qty}
            <span className='cursorpointer' onClick={dec}>-</span>
        </div>
    )
}

const Cartcard = ({ data }) => {
    console.log("info check", data)
    const context = useContext(MainContext)
    const { cartState, dispatch } = useCart()

    const handleCartRemove = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: data.product })
    }

    const deleteProducts = async () => {
        const info = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/delete-from-cart/${data.product._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken
            }
        })

        if (info.ok) {
            handleCartRemove()
            context.setDelete(context.del + 1)
            window.location.reload()
        }
    }
    console.log(cartState, "checking redux state")
    return (
        <div>
            <div className="card mb-3 cart-card-wrapper">
                <div className="row g-0">
                    <div className="col-md-4 cart-card-colmd4">
                        <img src={data.product.cloudinaryImage} className="img-fluid rounded-start cart-card-img" alt="productimg" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title text-capitalize text-center">{data.product.name}</h6>
                            <h6 className="card-title text-capitalize">Rs.{data.product.price}</h6>
                            <p className="card-text text-capitalize  text-success">In Stock</p>
                            <div className='d-flex justify-content-between align-items-center cart-card-width'>
                                <Counter quantity={data.quantity} id={data.product.id} />
                                <div className="text-danger cursorpointer" onClick={deleteProducts}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartcard
