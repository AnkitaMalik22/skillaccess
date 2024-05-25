import React from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      <span className="flex gap-4">
        <button className="  self-center object-center  rounded-lg h-10 w-10 ">
          <img src="../../images/icons/reports.png" alt="icon" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Question Bank
        </h2>
      </span>
      {/*   <div className="bg-gray-100 rounded-xl mx-2  sm:h-12 h-10 flex my-2 px-4 w-fit">
     <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="input border-none self-center bg-gray-100 focus:outline-none input-md  max-w-md mx-auto  "
        /> 
      </div>*/}

      <span className="flex gap-2">
        <button
          className="self-center justify-center flex bg-[#F8F8F9] py-3 px-5 rounded-xl  font-bold gap-2 "
          onClick={() => navigate("/collage/quesbank/createTopic")}
        >
          <FiPlus className="self-center text-lg " /> Add
        </button>

        {/* <button
          className="self-center justify-center flex bg-blue-700 py-3 px-5 rounded-xl  text-white  gap-2 "
          onClick={() => navigate("/collage/quesBank/upload")}
        >
          <FiUpload className="self-center text-lg " /> Upload Questions
        </button>
        <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button> */}
      </span>
    </div>
  );
};

export default Header;
