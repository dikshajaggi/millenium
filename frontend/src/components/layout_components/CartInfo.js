import React, { useContext, useEffect, useState } from 'react'
import "../styles.scss"
import _ from 'lodash'
import { MainContext } from '../../context/MainContext'
import { Link } from 'react-router-dom'

const CartInfo = () => {
  const context = useContext(MainContext)

  const [data, setData] = useState([])
  const [qty, setQty] = useState()
  const [price, setPrice] = useState()
  // const [isLoading, setIsLoading] = useState(true)

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
    setData(jsondata.cartProducts)
  }

  useEffect(() => {
    getCart()
    context.setSearched(false)
    if (localStorage.getItem('cart') !== undefined) setData(JSON.parse(localStorage.getItem('cart')))
    // eslint-disable-next-line
  }, [context.qtyUpdated])

  console.log(data, "cartinfo data")


  const getData = () => {
    const totalQtyArr = data.map(item => item.quantity)
    const totalQty = _.sum(totalQtyArr)
    setQty(totalQty)

    const totalPriceArr = data.map(item => item.product.price * item.quantity)
    const totalPrice = _.sum(totalPriceArr)
    setPrice(totalPrice)
  }

  useEffect(() => {
    // setIsLoading(true)
    getData()
    // eslint-disable-next-line
  }, [data, context.qtyUpdated])

  return (
    <div>
      <div className="card border-success mb-3 cart-info-width">
        <div className="card-header bg-transparent border-success">Order Summary</div>
        {/* {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : ( */}
        <div>
          <div className="card-body">
            <p className="card-text">Total Items: {qty}</p>
            <h5 className="card-title text-danger">Order Total: Rs. {price}</h5>
          </div>
          <div className="card-footer bg-transparent border-success">
            <Link to="/checkout" className='text-decoration-none'>
              <button className='btn buttons'>Checkout</button>
            </Link>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default CartInfo
