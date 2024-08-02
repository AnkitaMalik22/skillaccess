import React, { useState } from "react";

const SecondFA = () => {
  const [totp, setTotp] = useState("");
  const handleSubmit = () => {
    //console.log('Submitting TOTP:', totp);
  };
  return (
    <div className="bg-[#FFF] min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-start gap-3">
        <h1 className="font-Normal text-3xl">2FTA FORM</h1>
        <input
          type="number"
          className="h-10 w-[400px] border-l-[#dc2626] border-l-4 rounded-[6px] placeholder-gray-400"
          placeholder="Enter TOTP"
          value={totp}
          onChange={(e) => {
            setTotp(e.target.value);
          }}
        />
        <button
          className={`h-10 w-[400px] text-lg font-semibold rounded-[6px] text-[#fff] ${
            totp ? "bg-blue-700 " : " bg-blued disabled:opacity-50"
          }`}
          disabled={!totp} // Disable button when totp is empty
          onClick={handleSubmit} // Handle form submission
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SecondFA;
