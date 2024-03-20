import React from "react";

import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = ({ setStudents }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-1 relative pb-20">
      <div className=" absolute right-0">
        {" "}
        <div className=" flex gap-2">
          <button
            className="self-center justify-center flex bg-blue-700 rounded-lg text-sm font-bold gap-2 px-10 py-3"
            onClick={() => { 
              localStorage.removeItem("testDetails");
              localStorage.removeItem("totalTime"); 
              navigate("/collage/test");
            }}
          >
            <FaPlus className="text-white text-lg" />
            <p className="self-center text-white">Invite</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
