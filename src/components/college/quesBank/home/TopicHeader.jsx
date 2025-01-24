import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { isUni, isCompany } from "../../../../util/isCompany";

const Header = ({ Heading, sectionId }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6 items-center">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-md h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className="p-3 rounded-md h-10 w-10 self-center bg-gray-200" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717] first-letter:uppercase">
          {Heading}
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="self-center justify-center flex bg-[#8f92a11a] px-7 py-3 rounded-2xl gap-2 text-sm text-[#171717] font-bold "
          onClick={() =>
            isUni()
              ? navigate(
                  `/university/pr/quesBank/typeOfQuestions/${sectionId}?page=qb`
                )
              : isCompany()
              ? navigate(
                  `/company/pr/quesBank/typeOfQuestions/${sectionId}?page=qb`
                )
              : navigate(
                  `/college/quesBank/typeOfQuestions/${sectionId}?page=qb`
                )
          }
        >
          <FiPlus className="self-center text-lg" /> Add
        </button>

        <button
          className="self-center justify-center flex bg-accent px-5 py-3 rounded-2xl text-white gap-2 text-md font-bold"
          onClick={() =>
            navigate(
              isUni()
                ? `/university/pr/quesBank/topic/upload/${sectionId}`
                : isCompany()
                ? `/company/pr/quesBank/topic/upload/${sectionId}`
                : `/college/quesBank/topic/upload/${sectionId}`
            )
          }
        >
          <FiUpload className="self-center text-lg" /> Upload Questions
        </button>

        {/* <button className="bg-[#8f92a11a] self-center rounded-md h-10 w-10 sm:h-12 sm:w-16 flex items-center justify-center">
          <PiSlidersHorizontalLight className="mx-auto  h-7 w-7" />
        </button> */}
      </div>
    </div>
  );
};

export default Header;
