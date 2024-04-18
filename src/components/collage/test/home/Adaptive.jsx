import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "../../dashboard/buttons";

// Import Swiper styles
import "swiper/css";
import Card from "./common/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Adaptive = () => {
  const navigate = useNavigate();
  const Adaptive = useSelector((state) => state.test.assessments.adaptive);
  return (
    <div className="flex bg-[#F8F8F9] w-full gap-2">
      <div className=" min-w-max h-64 bg-[rgba(143,146,161,0.1)] my-3 ml-4 rounded-lg flex justify-center">
        <div className=" self-center w-fit h-fit ">
          <div
            className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-lg mx-auto flex justify-center"
            onClick={() => navigate("/collage/test/name?level=adaptive")}
          >
            <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
          </div>
          <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60">
            Add New Assessment
          </h2>
          <h2 className="text-center text-xs my-2 w-20 md:w-60">
            Create New Assessment
          </h2>
        </div>
      </div>
      <Swiper
        className="relative sm:!max-w-md md:!max-w-lg"
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
          1280: {
            slidesPerView: 2,
          },
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
        <SwiperSlide></SwiperSlide>
        <span className="absolute top-1/2 right-0 z-20 h-fit w-fit">
          <SlideNextButton />
        </span>
      </Swiper>
    </div>
  );
};

export default Adaptive;
