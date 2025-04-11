import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { useSelector } from 'react-redux';
import { placeorder } from '../apis';
import { useNavigate } from 'react-router-dom';
import PlaceOrderForm from '../components/PlaceOrderForm';
import CartTotal from '../components/CartTotal';
import { calculateCartTotal } from '../utils/CartTotalCalc';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { products, token, setOrderPlaced } = useContext(MainContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });

  const cartItemsArray = cartItems
    ? Object.keys(cartItems)
        .map(id => {
          const product = products.find(product => product._id === id);
          return product ? { ...product, qty: cartItems[id] } : null;
        })
        .filter(item => item !== null)
    : [];

  const placeOrder = async () => {
    const {
      firstName, lastName, email, street,
      city, state, pincode, phone
    } = data;

    if (
      firstName && lastName && email && street &&
      city && state && pincode && phone
    ) {
      if (Object.keys(cartItems).length > 0) {
        const { finalAmount } = calculateCartTotal(cartItemsArray);
        const orderData = {
          address: data,
          items: cartItemsArray,
          amount: finalAmount
        };

        try {
          setLoading(true); // Show loader
          const response = await placeorder(orderData, {
            headers: { token }
          });
          setLoading(false); // Hide loader
          if (response.data.success) {
            setOrderPlaced(true);
            alert("Order placed successfully");
            navigate("/");
          } else {
            alert("Failed to place order. Please try again.");
          }
        } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order. Please try again.");
        }
      } else {
        alert("Cart is empty");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-50">
        <div className="loader mb-4 border-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="text-lg font-semibold text-gray-800">Placing order, please wait...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto">
      {/* Left: Form */}
      <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow">
        <PlaceOrderForm data={data} setData={setData} />
      </div>

      {/* Right: Cart Summary */}
      <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow h-fit">
        <CartTotal cartItemsArray={cartItemsArray} placeOrder={placeOrder} />
      </div>
    </div>
  );
};

export default PlaceOrder;
