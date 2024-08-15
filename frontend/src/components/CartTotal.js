import React from 'react'
import { Link } from "react-router-dom"
import "./styles.scss";
import { calculateCartTotal } from '../utils/CartTotalCalc';

const CartTotal = ({ cartItemsArray, placeOrder }) => {
  const { totalPrice, deliveryCharge, couponDiscount, finalAmount } = calculateCartTotal(cartItemsArray)
  const handlePlaceOrder = async () => {
    await placeOrder()
  }
  return (
    <>
      {totalPrice ? <>
        <div className='cart-summary' >
          <h2>Cart Summary</h2>
          <div className='summary-item'>
            <p>Subtotal:</p>
            <p>₹{totalPrice.toFixed(2)}</p>
          </div>
          <div className='summary-item'>
            <p>Delivery Charges:</p>
            <p>₹{deliveryCharge.toFixed(2)}</p>
          </div>
          <div className='summary-item'>
            <p>Coupon Discount:</p>
            <p>-₹{couponDiscount.toFixed(2)}</p>
          </div>
          <hr />
          <div className='summary-total'>
            <h3>Total:</h3>
            <h3>₹{finalAmount.toFixed(2)}</h3>
          </div>
          {placeOrder ? <button className='checkout-btn' onClick={handlePlaceOrder}>Place Order</button>
            : <Link to="/place-order"><button className='checkout-btn'>Proceed to Checkout</button></Link>}
        </div>
      </> : null}
    </>

  )
}

export default CartTotal
