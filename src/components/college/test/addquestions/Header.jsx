import React from "react";
import { FaAngleLeft, FaAngleRight, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUni } from "../../../../util/isCompany";

const Header = ({ Q, page }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const { name } = useSelector((state) => state.test);
  const level = searchParams.get("level");
  const entity = isUni() ? "university/pr" : "college";
  // //console.log(level);
  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => {
            level === "adaptive"
              ? navigate(`/${entity}/test/selectAdaptive?level=adaptive`)
              : navigate(`/${entity}/test/select?level=${level}`);
          }}
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
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() =>
            page == "submit"
              ? navigate(`/${entity}/test/submit?level=${level}`)
              : navigate(`/${entity}/test/final`)
          }
        >
          Next
          <FaAngleRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
