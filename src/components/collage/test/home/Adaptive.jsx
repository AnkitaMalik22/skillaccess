import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "../../dashboard/buttons";

// Import Swiper styles
import "swiper/css";
import Card from "./common/Card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTests } from "../../../../redux/collage/test/thunks/test";
import CreditPopUp from "../../../PopUps/CreditPopUp";

const Adaptive = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const Adaptive = useSelector((state) => state.test.assessments.adaptive);
  const { testLoading } = useSelector((state) => state.test);
  const credit = useSelector((state) => state?.collageAuth);
  console.log(credit);

  const handleClose = () => {
    setShow(false);
  };
  const handleFunc = () => {
    if (credit?.balance?.credit) {
      navigate("/collage/test/name?level=adaptive");
    } else {
      setShow(true);
    }
  };
  return (
    <div className="flex bg-[#F8F8F9] w-full gap-2 p-5">
      <div className=" w-[242px] h-[312px] bg-[#8F92A1] bg-opacity-5  rounded-2xl flex justify-center p-2">
        <div className=" self-center w-full h-fit ">
          <div
            className="bg-white sm:w-[64px] sm:h-[64px] w-10 h-10 rounded-2xl mx-auto flex justify-center"
            onClick={handleFunc}
          >
            <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
          </div>
          <h2 className="text-center text-black text-base  mt-8 font-bold mb-4 w-20  md:w-60">
            Add New Assessment
          </h2>
          <h2 className="text-center text-xs my-2 w-20 md:w-60">
            Create new Assessment
          </h2>
        </div>
      </div>
      <Swiper
        className="relative md:w-full"
        loop={true}
        spaceBetween={"1px"}
        slidesPerView={2}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 1.3,
          },
          550: {
            slidesPerView: 1.6,
          },
          600: {
            slidesPerView: 1.6,
          },
          640: {
            slidesPerView: 1.1,
          },
          865: {
            slidesPerView: 1.3,
          },
          1000: { slidesPerView: 1.3 },
          1280: { slidesPerView: 1.5 },
          1400: { slidesPerView: 2 },
          1600: { slidesPerView: 2.5 },
        }}
      >
        {Adaptive?.map((item, i) => (
          <SwiperSlide className="w-full">
            <Card
              assessment={item}
              // attempts={18}
              progress={4}
            />
          </SwiperSlide>
        ))}
       <SwiperSlide className="w-full">
          {" "}
          <div className="w-[242px]"> </div>
        </SwiperSlide>
        <SwiperSlide className="w-full">
          {" "}
          <div className="w-[242px]"> </div>
        </SwiperSlide>
        <SwiperSlide className="w-full">
          {" "}
          <div className="w-[242px]"> </div>
        </SwiperSlide>
        <span className="absolute top-1/2 right-0 z-20 h-fit w-fit">
          <SlideNextButton />
        </span>
      </Swiper>
      {show && <CreditPopUp onCancel={handleClose} />}
    </div>
  );
};

export default Adaptive;
