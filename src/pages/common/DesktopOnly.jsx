import React from "react";

const DesktopOnly = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blued to-blued text-white ">
      <div className="mx-4 max-w-md p-6 bg-black bg-opacity-50 rounded-md shadow-lg text-center">
        <div className="text-6xl">🖥️</div>
        <h1 className="text-2xl font-bold mb-4">Desktop View Only</h1>
        <p className="text-gray-300">
          We’re sorry, but this website is best experienced on a desktop device.
          Please switch to a larger screen for full access.
        </p>
      </div>
    </div>
  );
};

export default DesktopOnly;
