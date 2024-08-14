import React, { useContext } from 'react';
import "./styles.scss";
import { useSelector, useDispatch } from 'react-redux';
import CartTotal from '../components/CartTotal';
import { MainContext } from '../context/MainContext';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const deliveryCharge = 50; 
  const couponDiscount = 0; 
  const { products } = useContext(MainContext);
  const dispatch = useDispatch();

  console.log(cartItems, "cartItems check");

  // Convert cartItems object to an array for easier processing
  const cartItemsArray = Object.keys(cartItems).map(id => {
    const product = products.find(product => product._id === id);
    if (product) {
      return { ...product, qty: cartItems[id] };
    }
    return null;
  }).filter(item => item !== null);

  // Calculate total price
  const totalPrice = cartItemsArray.reduce((acc, item) => acc + item.price * item.qty, 0);
  const finalAmount = totalPrice + deliveryCharge - couponDiscount;

  const handleQtyInc = (id) => {
    dispatch(addToCart({ id }));
  };

  const handleQtyDec = (id) => {
    if (cartItems[id] > 0) {
      dispatch(removeFromCart({ id }));
    }
  };

  return (
    <div className='cart-wrapper'>
      {cartItemsArray.length === 0 ? (
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
              {cartItemsArray.map(item => (
                <tr key={item._id}>
                  <td><img src={`http://localhost:5000/images/${item.image}`} alt={item.name} className='cart-item-img' /></td>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.qty}</td>
                  <td>₹{(item.qty * item.price).toFixed(2)}</td>
                  <td>
                    <button className='remove-btn' onClick={() => handleQtyDec(item._id)}>Dec</button>
                    <button className='remove-btn' onClick={() => handleQtyInc(item._id)}>Inc</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card Layout */}
          <div className='cart-cards'>
            {cartItemsArray.map(item => (
              <div className='cart-card' key={item._id}>
                <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} className='cart-card-img' />
                <div className='cart-card-details'>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Total: ₹{(item.qty * item.price).toFixed(2)}</p>
                  <button className='remove-btn' onClick={() => handleQtyDec(item._id)}>Dec</button>
                  <button className='remove-btn' onClick={() => handleQtyInc(item._id)}>Inc</button>
                </div>
              </div>
            ))}
          </div>
          <CartTotal totalPrice={totalPrice} deliveryCharge={deliveryCharge} couponDiscount={couponDiscount} finalAmount={finalAmount} />
        </>
      )}
    </div>
  );
};

export default Cart;
