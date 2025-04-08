import React from 'react';

const CartCard = ({ cartItemsArray, handleQtyDec, handleQtyInc }) => {
  return (
    <div className="my-8">
      {/* Table layout for md+ screens */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border">Image</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Price</th>
              <th className="p-4 border">Qty</th>
              <th className="p-4 border">Total</th>
              <th className="p-4 border">Update</th>
            </tr>
          </thead>
          <tbody>
            {cartItemsArray.map(item => (
              <tr key={item._id} className="border-b">
                <td className="p-4 border">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
                    alt={item.name}
                    className="w-14 h-14 object-cover"
                  />
                </td>
                <td className="p-4 border capitalize">{item.name}</td>
                <td className="p-4 border">₹{item.price.toFixed(2)}</td>
                <td className="p-4 border">{item.qty}</td>
                <td className="p-4 border">₹{(item.qty * item.price).toFixed(2)}</td>
                <td className="p-4 border">
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-black text-white w-10 h-8 text-lg font-bold flex items-center justify-center rounded"
                      onClick={() => handleQtyDec(item._id)}
                    >
                      -
                    </button>
                    <span className="font-bold">{item.qty}</span>
                    <button
                      className="bg-black text-white w-10 h-8 text-lg font-bold flex items-center justify-center rounded"
                      onClick={() => handleQtyInc(item._id)}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="md:hidden space-y-6">
        {cartItemsArray.map(item => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <img
              src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
              alt={item.name}
              className="w-24 h-24 object-cover mx-auto sm:mx-0"
            />
            <div className="mt-4 sm:mt-0 space-y-2 text-center sm:text-left">
              <h3 className="font-semibold capitalize text-lg">{item.name}</h3>
              <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.qty}</p>
              <p className="text-gray-600">Total: ₹{(item.qty * item.price).toFixed(2)}</p>
              <div className="flex justify-center sm:justify-start items-center space-x-3 pt-2">
                <button
                  className="bg-black text-white w-8 h-8 text-lg font-bold rounded"
                  onClick={() => handleQtyDec(item._id)}
                >
                  -
                </button>
                <span className="font-bold">{item.qty}</span>
                <button
                  className="bg-black text-white w-8 h-8 text-lg font-bold rounded"
                  onClick={() => handleQtyInc(item._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartCard;
