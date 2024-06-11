import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ Q, page }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const { name } = useSelector((state) => state.test);
  const level = searchParams.get("level");
  console.log(level);
  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() =>
            page == "submit"
              ? navigate(`/collage/test/submit?level=${level}`)
              : navigate("/collage/test/final")
          }
        >
          Next
          <FaArrowRightLong className="self-center text-lg text-white ml-4" />
        </button>
      </div>
    </div>
  );
};

export default Header;
