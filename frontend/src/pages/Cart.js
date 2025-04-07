import React, { useContext } from 'react';
import "./styles.scss";
import { useSelector, useDispatch } from 'react-redux';
import CartTotal from '../components/CartTotal';
import CartCartMobileLayout from "../components/CartCardMobileLayout"
import { MainContext } from '../context/MainContext';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import CartCard from '../components/CartCard';
import emptycart from "../assests/images/emptycart.png"
import { useAuth0 } from '@auth0/auth0-react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { products } = useContext(MainContext);
  const dispatch = useDispatch();
  const {user} = useAuth0();


  // Convert cartItems object to an array for easier processing
  const cartItemsArray = cartItems ? Object.keys(cartItems).map(id => {
    const product = products.find(product => product._id === id);
    if (product) {
      return { ...product, qty: cartItems[id] };
    }
    return null;
  }).filter(item => item !== null) : [];


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
      {!user && cartItemsArray.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h4>Your cart is empty</h4>
          <img src={emptycart} alt="" style={{ marginTop: "20px", height: "250px" }} />
        </div>
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
