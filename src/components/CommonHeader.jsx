import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import isCompany, { isUni } from "../util/isCompany";
import Loader from "./loaders/Loader";

const Header = ({ handleNext, loading, backPath, title }) => {
  const navigate = useNavigate();
  const entity = isUni() ? "university/pr" : isCompany() ? "company/pr" : "college";
  return (
    <div className="mb-4 shadow-sm">
      <div className="max-w-7xl mx-auto py-4 ">
        <div className="flex justify-between items-center">
          {/* Left side with back button and title */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                if (backPath) {
                  navigate(backPath)
                } else {
                  navigate(-1)
                }
              }}
            >
              <FaChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {title || "Create Assessment"}
            </h2>
          </div>

          {/* Right side with Next button */}
          <button
            className="inline-flex items-center px-4 py-2 bg-blued text-white rounded-md hover:bg-blued transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleNext}
          >
            {loading ? <Loader size="sm" /> : <> Next <FaArrowRightLong className="h-4 w-4 ml-2" /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
