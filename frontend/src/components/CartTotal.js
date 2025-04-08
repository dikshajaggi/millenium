import React from 'react';
import { Link } from "react-router-dom";
import { calculateCartTotal } from '../utils/CartTotalCalc';

const CartTotal = ({ cartItemsArray, placeOrder }) => {
  const { totalPrice, deliveryCharge, couponDiscount, finalAmount } = calculateCartTotal(cartItemsArray);

  const handlePlaceOrder = async () => {
    await placeOrder();
  };

  if (!totalPrice) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Cart Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Charges:</p>
          <p>₹{deliveryCharge.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Coupon Discount:</p>
          <p className="text-green-600">-₹{couponDiscount.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base">
          <h3>Total:</h3>
          <h3>₹{finalAmount.toFixed(2)}</h3>
        </div>
        {placeOrder ? (
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold mt-4 hover:bg-gray-900"
          >
            Place Order
          </button>
        ) : (
          <Link to="/place-order">
            <button className="w-full bg-black text-white py-2 rounded-lg font-semibold mt-4 hover:bg-gray-900">
              Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
