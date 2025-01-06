import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../../../redux/company/jobs/jobSlice";
import "swiper/css";

const SwiperSlideLeft = () => {
  const dispatch = useDispatch();
  const { jobs, jobLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();
  // useSelector((state) => //console.log("state : ", state.dashboard));
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    if (user?._id) {
      dispatch(getJobs());
    }
    // //console.log("jobs : ", jobs);
  }, [dispatch, user?.id]);

  const companies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Swiper
      className="relative "
      spaceBetween={30}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 2,
        },
        639: {
          slidesPerView: 5,
        },
        865: {
          slidesPerView: 6,
        },
        1000: {
          slidesPerView: 7,
        },
        1500: {
          slidesPerView: 8,
        },
        1920: {
          slidesPerView: 10,
        },
      }}
    >
      {jobs && jobs?.map((job) => (
        <SwiperSlide className="flex ">
          <div className="companies-dash bg-white w-[100px] xl:w-[140px] p-4 rounded-2xl">
            <div
              className="bg-gray-100 w-full h-20 mb-4 mx-auto cursor-pointer rounded-lg text-center pb-10"
              onClick={() => navigate(`/company/pr/jobs/${job?._id}`)}
            >
              <img src={job?.company?.avatar?.url || "/images/default.jpg"} alt="" className="rounded-lg object-contain" />
              {/* {job?.SeniorityLevel} */}
            </div>

            <div className="text-center">
              <h3 className="text-xs text-accent font-bold break-words mt-10">
                {job?.JobTitle}
              </h3>

              {/* Open/Closed Label */}
              <div
                className={`mt-2 px-2 py-1 rounded-lg text-xs font-semibold ${job?.isOpenforApply ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {job.isOpenforApply ? "Open" : "Closed"}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {jobLoading && <h1>Loading...</h1>}
      <span className="absolute top-1/3 right-0 z-20 h-fit w-fit">
        <SlideNextButton />
      </span>
    </Swiper>
  );
};

export default SwiperSlideLeft;
