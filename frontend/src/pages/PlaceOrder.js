import React, { useState } from 'react'

const PlaceOrder = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        pincode:"",
        phone:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]: value}))
    }


    return (
        <div className="checkout-container">
          <div className="delivery-info">
            <h2>Delivery Information</h2>
            <form>
              <div className="form-row">
                <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
                <input name="lastName" value={data.lastName} onChange={onChangeHandler}type="text" placeholder="Last name" />
              </div>
              <div className="form-row">
                <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
              </div>
              <div className="form-row">
                <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
              </div>
              <div className="form-row">
                <input name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
                <input name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
              </div>
              <div className="form-row">
                <input name="pincode" value={data.pincode} onChange={onChangeHandler} type="text" placeholder="Pin code" />
              </div>
              <div className="form-row">
                <input name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
              </div>
            </form>
          </div>
          <div className="cart-totals">
            <h2>Cart Totals</h2>
            <div className="totals-item">
              <span>Subtotal</span>
              <span>₹222</span>
            </div>
            <div className="totals-item">
              <span>Delivery Fee</span>
              <span>₹2</span>
            </div>
            <div className="totals-item total">
              <span>Total</span>
              <span>₹224</span>
            </div>
            <button className="proceed-btn">PROCEED TO PAYMENT</button>
          </div>
        </div>
      );
}

export default PlaceOrder
