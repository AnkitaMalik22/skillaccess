import React from "react";
import Topic from "../../../components/collage/quesBank/home/Topic";
import Recent from "../../../components/collage/quesBank/home/Recent";
import BookMark from "../../../components/collage/quesBank/home/BookMark";
import useTranslate from "../../../hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const QuesBank = () => {
  useTranslate();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-4">
          <button className="  self-center object-center  rounded-lg h-10 w-10 ">
            <img src="../../images/icons/reports.png" alt="icon" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Question Bank
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            className="self-center justify-center flex bg-[#F8F8F9] py-3 px-5 rounded-xl  font-bold gap-2 "
            onClick={() => navigate("/collage/quesbank/createTopic")}
          >
            <FiPlus className="self-center text-lg " /> Add
          </button>
        </div>
      </div>
      <>
        <Topic />
      </>
      <div className="flex justify-between md:flex-nowrap flex-wrap  mt-8 gap-3 md:gap-9">
        <div className=" w-3/5">
          <Recent />
        </div>
        <div className="w-2/5">
          <BookMark />
        </div>
      </div>
    </>
  );
};

export default QuesBank;
