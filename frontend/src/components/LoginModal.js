import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10  flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8 text-center space-y-4">
        <h5 className="text-xl font-semibold text-gray-800">Please Login</h5>
        <p className="text-gray-600 text-sm sm:text-base">Proceed to login to add items to your cart.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
          <button
            className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-md bg-[#2D3092] text-white text-sm sm:text-base font-medium hover:bg-opacity-80 transition"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-md bg-gray-200 text-gray-800 text-sm sm:text-base font-medium hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
