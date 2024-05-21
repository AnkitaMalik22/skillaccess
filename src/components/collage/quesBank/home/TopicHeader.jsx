import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";

const Header = ({ Heading, sectionId }) => {
  const navigate = useNavigate();
  return (
    <div className="flex  mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center  rounded-lg  gap-2">
          <button onClick={() => navigate(-1)} className="mt-2 mr-3">
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="self-center flex ">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans ">
              {Heading}
            </h2>
            {/* <div className="flex gap-2 text-[#567BF9] text-xs font-medium mt-3">
              <h3 className="mr-2">Untitiled Assessments</h3>
              <span>
                <img
                  src="../../images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2">0 Tests</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="../../images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>Add Questions</h3>
            </div> */}
          </div>
        </button>
      </div>

      {/* bg-gray-100 */}
      <div className=" rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <span className="flex gap-2">
            <button
              className="self-center justify-center flex bg-[#F8F8F9] py-3 px-5 rounded-xl  font-bold gap-2 "
              onClick={() =>
                navigate(
                  `/collage/quesBank/typeOfQuestions/${sectionId}?page=qb`
                )
              }
            >
              <FiPlus className="self-center text-lg " /> Add
            </button>

            <button
              className="self-center justify-center flex bg-blue-700 py-3 px-5 rounded-xl  text-white  gap-2 "
              onClick={() =>
                navigate(`/collage/quesBank/topic/upload/${sectionId}`)
              }
            >
              <FiUpload className="self-center text-lg " /> Upload Questions
            </button>
            <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
              <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
