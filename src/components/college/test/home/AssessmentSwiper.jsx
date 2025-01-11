import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "../../dashboard/buttons";
import Card from "./common/Card";
import CreditPopUp from "../../../PopUps/CreditPopUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUni } from "../../../../util/isCompany";
import "swiper/css";

const AssessmentSwiper = ({ assessments, level, title }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const credit = useSelector((state) => state.collegeAuth);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = () => {
    if (isUni()) {
      navigate(`/university/pr/test/name?level=${level}`);
    } else {
      if (credit?.balance?.credit) {
        navigate(`/college/test/name?level=${level}`);
      } else {
        setShow(true);
      }
    }
  };

  return (
    <div className="flex bg-[#F8F8F9] w-full gap-2 p-5">
      <div className="w-[250px] h-[312px] bg-[#8F92A1] bg-opacity-5 rounded-md flex justify-center p-2">
        <div className="self-center w-full h-fit">
          <div
            className="bg-white sm:w-[64px] sm:h-[64px] w-10 h-10 rounded-md mx-auto flex justify-center cursor-pointer"
            onClick={handleClick}
          >
            <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blued" />
          </div>
          <h2 className="text-center text-black text-base font-bold mb-4 mt-8 w-20 md:w-60">
            Add {title} Assessment
          </h2>
          <h2 className="text-center text-sm my-2 w-20 md:w-60">
            Create {title} Assessment
          </h2>
        </div>
      </div>
      <Swiper
        className="relative md:w-full"
        loop={true}
        spaceBetween={"1px"}
        slidesPerView={2}
        breakpoints={{
          1280: { slidesPerView: 4 },
        }}
      >
        {assessments?.map((item, i) => (
          <SwiperSlide key={`${item._id}-${i}`} className="w-full">
            <Card assessment={item} progress={4} />
          </SwiperSlide>
        ))}

        <span className="absolute top-1/2 right-0 z-20 h-fit w-fit">
          <SlideNextButton />
        </span>
      </Swiper>
      {show && <CreditPopUp onCancel={handleClose} />}
    </div>
  );
};

export default AssessmentSwiper;
