import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = ({ handleBack, text }) => {
  <button
    onClick={handleBack}
    className="mb-6 btn btn-ghost gap-2 hover:bg-gray-100"
  >
    <FiArrowLeft className="text-lg" />
    {text}
  </button>;
};

export default BackButton;
