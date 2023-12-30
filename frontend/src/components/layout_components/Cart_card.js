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
        const data = await fetch(`http://localhost:8000/api/cart/update-cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken
            },
            body: JSON.stringify(requestBody)
        })
        console.log(data, "data ok check")
        if (data.ok) {
            const jsondata = await data.json()
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
            <span style={{ cursor: "pointer" }} onClick={inc}>+</span>
            {qty}
            <span style={{ cursor: "pointer" }} onClick={dec}>-</span>
        </div>
    )
}

const Cart_card = ({ data }) => {
    console.log("info check", data)
    const context = useContext(MainContext)
    const { cartState, dispatch } = useCart()

    const handleCartRemove = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: data.product })
    }

    const deleteProducts = async () => {
        const info = await fetch(`http://localhost:8000/api/cart/delete-from-cart/${data.product._id}`, {
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
            <div class="card mb-3" style={{ padding: "20px" }}>
                <div class="row g-0">
                    <div class="col-md-4" style={{ height: "100px", width: "100px" }}>
                        <img src={data.product.cloudinaryImage} style={{ objectFit: "fill" }} class="img-fluid rounded-start" alt="productimg" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h6 class="card-title text-capitalize">{data.product.name}</h6>
                            <h6 class="card-title text-capitalize">Rs.{data.product.price}</h6>
                            <p class="card-text text-capitalize  text-success">In Stock</p>
                            <div className='d-flex justify-content-between align-items-center' style={{ width: "30%" }}>
                                <Counter quantity={data.quantity} id={data.product.id} />
                                <div style={{ cursor: "pointer" }} className="text-danger" onClick={deleteProducts}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart_card
