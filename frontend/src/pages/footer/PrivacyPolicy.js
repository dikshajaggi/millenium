import React from 'react';
import workInProgress from "../../assests/images/workInProgress.png";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center bg-white">
      <img
        src={workInProgress}
        alt="Work in progress"
        className="w-48 sm:w-64 md:w-72 lg:w-80 object-contain mb-6"
        onContextMenu={(e) => e.preventDefault()}
      />
      <h4 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        WORK IN PROGRESS
      </h4>
    </div>
  );
};

export default PrivacyPolicy;
