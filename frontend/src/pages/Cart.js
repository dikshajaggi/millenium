import React from 'react';
import "./styles.scss";
import { useSelector } from 'react-redux';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const deliveryCharge = 50; 
  const couponDiscount = 0; 

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const finalAmount = totalPrice + deliveryCharge - couponDiscount;
  return (
    <div className='cart-wrapper'>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className='cart-table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className='cart-item-img' /></td>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.qty}</td>
                  <td>₹{(item.qty * item.price).toFixed(2)}</td>
                  <td><button className='remove-btn'>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card Layout */}
          <div className='cart-cards'>
            {cartItems.map(item => (
              <div className='cart-card' key={item.id}>
                <img src={item.image} alt={item.name} className='cart-card-img' />
                <div className='cart-card-details'>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Total: ₹{(item.qty * item.price).toFixed(2)}</p>
                  <button className='remove-btn'>Update</button>
                </div>
              </div>
            ))}
          </div>
          <CartTotal totalPrice={totalPrice} deliveryCharge={deliveryCharge} couponDiscount={couponDiscount} finalAmount={finalAmount} />
        </>
      )}
    </div>
  );
}

export default Cart;
