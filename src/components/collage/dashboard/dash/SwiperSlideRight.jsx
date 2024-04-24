import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { getNewJobs } from "../../../../redux/collage/dashboard/dashboardSlice";

const SwiperSlideRight = () => {
  const dispatch = useDispatch();
  const { newJobs, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getNewJobs());
  }, [dispatch]);

  const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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


      {
        jobs.map((job) => (
          <SwiperSlide>
          <div className=" bg-white  w-28 xl:w-44 h-36 rounded-lg p-3">
            <figure className="bg-white-500  mx-auto rounded-lg flex justify-center">
              <img
                src="../intel.png"
                alt="img not loaded"
                className="w-2/3 h-2/3 self-center rounded-lg"
              />
            </figure>
            <span className="">
              <h3 className="text-xs  font-bold text-center break-words xl:mb-2">
                Midweight UI/UX Designer
              </h3>
              <p className="text-xs  font-bold text-center break-words  ">
                Mailchimp{" "}
                <em className="not-italic text-gray-400">in, London, UK</em>
              </p>
            </span>
          </div>
        </SwiperSlide>
        ))
      }

      {/* {newJobs &&
        newJobs.map((job) => (
          <SwiperSlide key={job._id}>
            <div className=" bg-white  w-44 h-36 rounded-lg p-2">
              <figure className="bg-white-500 w-28 h-24 mx-auto rounded-lg flex justify-center">
                {job.CompanyLogo ? (
                  <img
                    src={job.CompanyLogo}
                    alt="img not loaded"
                    className="w-1/2 h-1/2 self-center rounded-lg"
                  />
                ) : (
                  <img
                    src="../intel.png"
                    alt="img not loaded"
                    className="w-1/2 h-1/2 self-center rounded-lg"
                  />
                )}
              </figure>

              <h3 className="text-xs  font-semibold text-center break-words">
                {job.JobTitle}
              </h3>

              <p className="text-xs  font-semibold text-center break-words  ">
                {job.CompanyName}{" "}
                <em className="not-italic text-gray-400">
                  in, {job.JobLocation}
                </em>
              </p>
            </div>
          </SwiperSlide>
        ))} */}

      <span className="absolute top-1/3 right-5 z-20 h-fit w-fit">
        <SlideNextButton />
      </span>
    </Swiper>
  );
};

export default SwiperSlideRight;
