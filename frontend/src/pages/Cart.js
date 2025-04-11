import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartTotal from '../components/CartTotal';
import { MainContext } from '../context/MainContext';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import CartCard from '../components/CartCard';
import emptycart from "../assests/images/emptycart.png";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { products } = useContext(MainContext);
  const dispatch = useDispatch();

  const cartItemsArray = cartItems
    ? Object.keys(cartItems)
        .map(id => {
          const product = products.find(product => product._id === id);
          return product ? { ...product, qty: cartItems[id] } : null;
        })
        .filter(item => item !== null)
    : [];

  const handleQtyInc = (id) => {
    dispatch(addToCart({ id }));
  };

  const handleQtyDec = (id) => {
    if (cartItems[id] > 0) {
      dispatch(removeFromCart({ id }));
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      {cartItemsArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <h4 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your cart is empty</h4>
          <img src={emptycart} alt="Empty Cart" className="mt-6 h-64 w-auto object-contain" />
        </div>
      ) : (
        <>
          <CartCard
            cartItemsArray={cartItemsArray}
            handleQtyDec={handleQtyDec}
            handleQtyInc={handleQtyInc}
          />
          <CartTotal cartItemsArray={cartItemsArray} />
        </>
      )}
    </div>
  );
};

export default Cart;
