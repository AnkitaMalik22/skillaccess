import React from "react";
import SlideNextButton from "../../dashboard/buttons";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiPencilSimpleLine } from "react-icons/pi";

// Import Swiper styles
import "swiper/css";
import { Bin } from "../../../icons";
import { useNavigate } from "react-router-dom";
import Card from "./common/Card";
import { useSelector } from "react-redux";

const Beginner = () => {
  const beginner = useSelector((state) => state.test.assessments.beginner);

  // const uniqueIds = new Set();

  // const filteredBeginnerAssessments = assessments?.beginner?.filter(
  //   (item) => !uniqueIds.has(item?._id) && uniqueIds.add(item?._id)
  // );

  const navigate = useNavigate();
  return (
    <div className="flex bg-[#F8F8F9] w-full gap-2">
      <div className=" min-w-max h-64 bg-[rgba(143,146,161,0.1)] my-3 ml-4 rounded-lg flex justify-center">
        <div className=" self-center w-fit h-fit ">
          <div
            className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-lg mx-auto flex justify-center hover:cursor-pointer "
            onClick={() => navigate("/collage/test/name?level=beginner")}
          >
            <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
          </div>
          <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60">
            Add New Assessment
          </h2>
          <h2 className="text-center text-xs my-2 w-20 md:w-60">
            Create new Assessment
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
        {beginner?.map((item, index) => (
          <SwiperSlide key={`${item._id}-${index}`} className="w-full">
            <Card
              key={`${item._id}-${index}`}
              assessment={item}
              // heading={item.name}
              // desc={item.description}
              // attempts={item.totalAttempts}
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

export default Beginner;
