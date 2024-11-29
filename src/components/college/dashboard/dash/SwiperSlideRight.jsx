import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { getNewJobs } from "../../../../redux/college/dashboard/dashboardSlice";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { getAllJobs } from "../../../../redux/college/jobs/collegeJobSlice";

const SwiperSlideRight = () => {
  const dispatch = useDispatch();

  const { jobs: newJobs } = useSelector((state) => state.collegeJobs);
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getAllJobs( user?._id));
  // }, [dispatch]);
  // //console.log(newJobs);
  // const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Swiper
      className="relative max-w-[800px]"
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 2,
        },
        639: {
          slidesPerView: 2,
        },
        865: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 2.5,
        },
        1500: {
          slidesPerView: 3,
        },
        1920: {
          slidesPerView: 3,
        },
      }}
    >
      {newJobs.map((job) => (
        <SwiperSlide>
          <div className=" bg-white  w-28 xl:w-[182px] h-[148px] rounded-2xl p-4">
            <figure
              className="bg-white-500  mx-auto rounded-lg flex justify-center cursor-pointer mb-4"
              onClick={() =>
                navigate(`/college/companies/jobOverview/${job._id}`)
              }
            >
              <img
                src={job?.company?.basic?.logo}
                alt="img not loaded"
                className="w-[52px] h-[52px] self-center rounded-lg"
              />
            </figure>
            <h3 className="text-xs  font-bold text-center break-words mb-2">
              {job.JobTitle}
            </h3>
            <p className="text-xs font-medium text-center break-words  ">
              {job?.company?.location?.address}{" "}
              <span className=" text-[#8F92A1]">{job.JobLocation}</span>
            </p>
          </div>
        </SwiperSlide>
      ))}

      <span className="absolute top-1/3 right-0 z-20 h-fit w-fit">
        <SlideNextButton />
      </span>
    </Swiper>
  );
};

export default SwiperSlideRight;
