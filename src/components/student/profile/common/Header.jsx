import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = ({ next, isPortfolio }) => {
  const navigate = useNavigate();

  return (
    <div className="flex  justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center ml-2 rounded-md  gap-2">
          <button onClick={() => navigate(-1)} className="mt-2 mr-3">
            <FaChevronLeft className=" p-3 rounded-md h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="flex self-center">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans ">
              Profile Completion
            </h2>
            {/* <div className="flex gap-2 text-[#567BF9] text-sm font-medium mt-3">
              <h3 className="mr-2">Untitiled Assessments</h3>
              <span>
                <img
                  src="/images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2">0 Tests</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="/images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>Add Questions</h3>
            </div> */}
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          {isPortfolio ? (
            <button
              className="self-center justify-center flex bg-accent py-3 px-4 rounded-md text-sm font-bold gap-2 text-white"
              onClick={next}
            >
              Save
            </button>
          ) : (
            <button
              className="self-center justify-center flex bg-accent py-3 px-4 rounded-md text-sm font-bold gap-2 text-white"
              onClick={next}
            >
              Save & Next{" "}
              <FaArrowRightLong className="self-center text-lg text-white ml-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
