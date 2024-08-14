import React, { useContext, useState } from 'react'
import { MainContext } from '../context/MainContext';
import { useSelector } from 'react-redux';
import { placeorder } from '../apis';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
    const navigate = useNavigate()
    const deliveryCharge = 50; 
    const couponDiscount = 0; 
    const {products, token, setOrderPlaced} = useContext(MainContext)
    const cartItems = useSelector((state) => state.cart.cartItems);
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

    const placeOrder = async (event) => {
        event.preventDefault()
        if(data.firstName !== "" && data.lastName !== "" && data.email !== "" && data.street !== "" && data.city !== "" && data.state !== "" && data.pincode !== "" && data.phone !== "") {
           if(!cartItems) {
            const cartItemsArray = Object.keys(cartItems).map(id => {
                const product = products.find(product => product._id === id);
                if (product) {
                  return { ...product, qty: cartItems[id] };
                }
                return null;
              }).filter(item => item !== null);
            console.log(cartItemsArray, "cartItemsArray")
            const totalPrice = cartItemsArray.reduce((acc, item) => acc + item.price * item.qty, 0);
            const finalAmount = totalPrice + deliveryCharge - couponDiscount;
    
            const orderData = {
                address: data,
                items: cartItemsArray,
                amount: finalAmount
            }
    
            const response = await placeorder(orderData, { headers: { token } })
            console.log(response, "res check")
            if (response.data.success) {
                setOrderPlaced(true)
                alert("Order placed successfully")
                navigate("/")
            } 
           } else alert("Cart is empty")
        } else alert("Please fill all the fields")
    }

    return (
        <div className="checkout-container">
          <div className="delivery-info">
            <h2>Delivery Information</h2>
            <form>
              <div className="form-row">
                <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
                <input required name="lastName" value={data.lastName} onChange={onChangeHandler}type="text" placeholder="Last name" />
              </div>
              <div className="form-row">
                <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
              </div>
              <div className="form-row">
                <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
              </div>
              <div className="form-row">
                <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
                <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
              </div>
              <div className="form-row">
                <input required name="pincode" value={data.pincode} onChange={onChangeHandler} type="text" placeholder="Pin code" />
              </div>
              <div className="form-row">
                <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
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
            <button className="proceed-btn" onClick={placeOrder}>PLACE ORDER</button>
          </div>
        </div>
      );
}

export default PlaceOrder
