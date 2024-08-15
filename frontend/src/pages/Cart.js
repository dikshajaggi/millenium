import React, { useContext } from 'react';
import "./styles.scss";
import { useSelector, useDispatch } from 'react-redux';
import CartTotal from '../components/CartTotal';
import CartCartMobileLayout from "../components/CartCardMobileLayout"
import { MainContext } from '../context/MainContext';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import CartCard from '../components/CartCard';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { products } = useContext(MainContext);
  const dispatch = useDispatch();

  // Convert cartItems object to an array for easier processing
  const cartItemsArray = Object.keys(cartItems).map(id => {
    const product = products.find(product => product._id === id);
    if (product) {
      return { ...product, qty: cartItems[id] };
    }
    return null;
  }).filter(item => item !== null);


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
          <CartCard cartItemsArray={cartItemsArray} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} />

          {/* Mobile Card Layout */}
          <CartCartMobileLayout cartItemsArray={cartItemsArray} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} />

          <CartTotal cartItemsArray={cartItemsArray} />
        </>
      )}
    </div>
  );
};

export default Cart;
