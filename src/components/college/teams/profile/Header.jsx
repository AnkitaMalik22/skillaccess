import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-4">
        <button
          className="bg-[#D9E1E7]  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-14"
          onClick={() => navigate('/college/teams')}
        >
          <img src="/images/icons/back.png" alt="" srcset="" />
        </button>
      </span>
    </div>
  );
};

export default Header;
