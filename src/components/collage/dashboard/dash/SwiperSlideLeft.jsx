import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";

import { getNewCompanies } from "../../../../redux/collage/dashboard/dashboardSlice";

const SwiperSlideLeft = () => {
  const dispatch = useDispatch();
  const { newCompanies, loading } = useSelector((state) => state.dashboard);

  useSelector((state) => console.log("state : ", state.dashboard));

  useEffect(() => {
    dispatch(getNewCompanies());
    console.log("newCompanies : ", newCompanies);
  }, [dispatch]);

  const companies = [
    1,2,3,4,5,6,7,8,9,10
  ];

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
          slidesPerView: 3,
        },
        865: {
          slidesPerView: 4,
        },
        1000: {
          slidesPerView: 3.5,
        },
        1500: {
          slidesPerView: 4,
        },
        1920: {
          slidesPerView: 5,
        },
      }}
    >
   

      {
        newCompanies.map((company) => (
          <SwiperSlide className="flex ">
          <div className="companies-dash bg-white  w-[80px] xl:w-[120px]  2xl:w-32 h-36px rounded-lg p-2  ">
            <figure className="bg-gray-100 w-full h-24 mx-auto rounded-lg">
              <img
                // src="../intel.png"
                src={company?.basic?.logo === ""  ? "../intel.png" : company?.basic?.logo}
                alt="Img"
                className="w-full h-full"
              /> 
            </figure>
            <span>
              <h3 className="text-xs text-gray-400 font-bold text-center break-words h-full mt-1">
               {company?.basic?.companyName}
              </h3>
            </span>
          </div>
        </SwiperSlide>
        ))
      }

      {loading && <h1>Loading...</h1>}

      {/* {newCompanies &&
        newCompanies.map((company) => (
          <SwiperSlide key={company._id}>
            <div className=" bg-white  w-32 h-36 rounded-lg p-2">
              <figure className="bg-green-500 w-28 h-24 mx-auto rounded-lg">
                {company.basic && company.basic.logo ? (
                  <img
                    src={company.basic.logo}
                    alt="img not loaded"
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src="../intel.png"
                    alt="img not loaded"
                    className="w-full h-full"
                  />
                )}
              </figure>
              <h3 className="text-sm text-gray-400 font-semibold text-center break-words h-full">
                {company.basic && company.basic.companyName
                  ? company.basic.companyName
                  : "company name"}
              </h3>
            </div>
          </SwiperSlide>
        ))} */}

      <span className="absolute top-1/3 right-5 z-20 h-fit w-fit">
        <SlideNextButton />
      </span>
    </Swiper>
  );
};

export default SwiperSlideLeft;
