import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { getNewJobs } from "../../../../redux/college/dashboard/dashboardSlice";
import { getJobs } from "../../../../redux/company/jobs/jobSlice";

const SwiperSlideRight = () => {
  const dispatch = useDispatch();
  const { jobs: newJobs, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

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
          slidesPerView: 2.2,
        },
      }}
    >
      <SwiperSlide>
        <div className=" bg-white  w-44 h-36 rounded-md p-2">
          <figure className="bg-white-500 w-28 h-24 mx-auto rounded-md flex justify-center">
            <img
              src="../intel.png"
              alt="img not loaded"
              className="w-1/2 h-1/2 self-center rounded-md"
            />
          </figure>
          <span className="">
            <h3 className="text-sm  font-semibold text-center break-words">
              Midweight UI/UX Designer
            </h3>
            <p className="text-sm  font-semibold text-center break-words  ">
              Mailchimp{" "}
              <em className="not-italic text-gray-400">in, London, UK</em>
            </p>
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" bg-white  w-44 h-36 rounded-md p-2">
          <figure className="bg-white-500 w-28 h-24 mx-auto rounded-md flex justify-center">
            <img
              src="../intel.png"
              alt="img not loaded"
              className="w-1/2 h-1/2 self-center rounded-md"
            />
          </figure>
          <span className="">
            <h3 className="text-sm  font-semibold text-center break-words">
              Midweight UI/UX Designer
            </h3>
            <p className="text-sm  font-semibold text-center break-words  ">
              Mailchimp{" "}
              <em className="not-italic text-gray-400">in, London, UK</em>
            </p>
          </span>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className=" bg-white  w-44 h-36 rounded-md p-2">
          <figure className="bg-white-500 w-28 h-24 mx-auto rounded-md flex justify-center">
            <img
              src="../intel.png"
              alt="img not loaded"
              className="w-1/2 h-1/2 self-center rounded-md"
            />
          </figure>
          <span className="">
            <h3 className="text-sm  font-semibold text-center break-words">
              Midweight UI/UX Designer
            </h3>
            <p className="text-sm  font-semibold text-center break-words  ">
              Mailchimp{" "}
              <em className="not-italic text-gray-400">in, London, UK</em>
            </p>
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" bg-white  w-44 h-36 rounded-md p-2">
          <figure className="bg-white-500 w-28 h-24 mx-auto rounded-md flex justify-center">
            <img
              src="../intel.png"
              alt="img not loaded"
              className="w-1/2 h-1/2 self-center rounded-md"
            />
          </figure>
          <span className="">
            <h3 className="text-sm  font-semibold text-center break-words">
              Midweight UI/UX Designer
            </h3>
            <p className="text-sm  font-semibold text-center break-words  ">
              Mailchimp{" "}
              <em className="not-italic text-gray-400">in, London, UK</em>
            </p>
          </span>
        </div>
      </SwiperSlide>

      {/* {newJobs &&
        newJobs.map((job) => (
          <SwiperSlide key={job._id}>
            <div className=" bg-white  w-44 h-36 rounded-md p-2">
              <figure className="bg-white-500 w-28 h-24 mx-auto rounded-md flex justify-center">
                {job.CompanyLogo ? (
                  <img
                    src={job.CompanyLogo}
                    alt="img not loaded"
                    className="w-1/2 h-1/2 self-center rounded-md"
                  />
                ) : (
                  <img
                    src="../intel.png"
                    alt="img not loaded"
                    className="w-1/2 h-1/2 self-center rounded-md"
                  />
                )}
              </figure>

              <h3 className="text-sm  font-semibold text-center break-words">
                {job.JobTitle}
              </h3>

              <p className="text-sm  font-semibold text-center break-words  ">
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
