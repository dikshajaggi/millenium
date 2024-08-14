import React from 'react'
import {Link} from "react-router-dom"
import "./styles.scss";

const CartTotal = ({ totalPrice, deliveryCharge, couponDiscount, finalAmount }) => {
   
  return (
    <div className='cart-summary'>
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
    <Link to="/place-order"><button className='checkout-btn'>Proceed to Checkout</button></Link>
  </div>
  )
}

export default CartTotal
