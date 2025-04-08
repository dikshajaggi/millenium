import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart, handleQtyDec } from '../utils/AddRemoveCartItems';
import LoginModal from '../components/LoginModal';

const SpecificProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useContext(MainContext);
  const params = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showModal, setShowModal] = useState(false);

  const onLoginRequired = () => {
    setShowModal(true);
  };

  useEffect(() => {
    console.log(cartItems, 'cartItems check');
  }, [cartItems]);

  if (!products || products.length === 0) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  const product = products.find((item) => item.name_id === params.product);
  if (!product) {
    return <div className="text-center mt-10 text-lg text-red-500">Product not found</div>;
  }

  const { _id, name, description, price, image } = product;
  const currentQty = cartItems ? cartItems[_id] || 0 : 0;

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col md:flex-row gap-10 justify-center items-start bg-gray-50">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-md border rounded-lg shadow-md bg-white p-4">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/images/${image}`}
            alt={name}
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 space-y-5">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-700 text-base">{description}</p>

        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span>Price:</span>
          <span>₹{price}</span>
        </div>

        {/* OTP Modal */}
        <LoginModal show={showModal} onClose={() => setShowModal(false)} />

        {/* Cart Actions */}
        {currentQty === 0 ? (
          <button
            className="mt-4 w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => handleAddToCart(_id, dispatch, onLoginRequired)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-4 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full"
              onClick={() => handleQtyDec(_id, currentQty, dispatch)}
            >
              -
            </button>
            <span className="text-lg font-bold">{currentQty}</span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full"
              onClick={() => handleAddToCart(_id, dispatch)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificProductPage;
