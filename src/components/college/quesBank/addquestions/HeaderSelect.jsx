import React from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = ({ Q }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const page = search.get("page");
  const level = search.get("level");

  // //console.log("page", page);
  const handleNext = () => {
    navigate(`/college/quesBank/topic`);
  };

  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => handleNext()}
        >
          Next Step
          <FaArrowRightLong className="self-center text-lg text-white ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Header;
