import React, { useContext, useEffect, useState } from 'react'
import "../styles.scss"
import _ from 'lodash'
import { MainContext } from '../../context/MainContext'
import { Link } from 'react-router-dom'

const CartInfo = ({ data }) => {
    console.log(data, "checking data")
    const context = useContext(MainContext)
    const [qty, setQty] = useState()
    const [price, setPrice] = useState()
    const getData = () => {
        const totalQtyArr = data.map(item => item.quantity)
        const totalQty = _.sum(totalQtyArr)
        setQty(totalQty)

        const totalPriceArr = data.map(item => item.product.price * item.quantity)
        const totalPrice = _.sum(totalPriceArr)
        setPrice(totalPrice)
    }

    useEffect(() => {
        getData()
        console.log("checking order details")
        // eslint-disable-next-line
    }, [data, context.qtyUpdated])
    return (
        <div>
            <div className="card border-success mb-3 cart-info-width">
                <div className="card-header bg-transparent border-success">Order Summary</div>
                <div className="card-body">
                    <p className="card-text">Total Items: {qty}</p>
                    <h5 className="card-title text-danger">Order Total: Rs. {price}</h5>
                </div>
                <div className="card-footer bg-transparent border-success"><Link to="/checkout" className='text-decoration-none'><button className='btn buttons'>Checkout</button></Link></div>
            </div>
        </div>
    )
}

export default CartInfo
