import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideNextButton from "../buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  getCompany,
  getNewCompanies,
} from "../../../../redux/college/dashboard/dashboardSlice";
import "swiper/css";

const SwiperSlideLeft = () => {
  const dispatch = useDispatch();
  const { companies: newCompanies, loading } = useSelector(
    (state) => state.dashboard
  );
  const navigate = useNavigate();
  // useSelector((state) => //console.log("state : ", state.dashboard));
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    if (user) {
      dispatch(getCompany({ collegeId: user?._id }));
    }
    // //console.log("newCompanies : ", newCompanies);
  }, [dispatch, user]);

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
      {newCompanies.map((company) => (
        <SwiperSlide className="flex ">
          <div className="mr-4 bg-white roundex-xl w-28 xl:w-[128px] h-[148px] p-2 rounded-md shadow-sm focus:shadow-md hover:shadow-md">
            <figure
              className="bg-gray-100 w-[90%] h-20 mb-4 mx-auto cursor-pointer rounded-md"
              onClick={() =>
                navigate(`/college/companies/profile/${company._id}`)
              }
            >
              <img
                // src="../intel.png"
                src={
                  company?.basic?.logo === ""
                    ? "../intel.png"
                    : company?.basic?.logo
                }
                alt="Img"
                className="w-full h-full rounded-md"
              />
            </figure>
            <div>
              <h3 className="text-sm text-[#8F92A1] font-bold text-center break-words ">
                {company?.basic?.companyName?.length > 20
                  ? company?.basic?.companyName?.slice(0, 20) + "..."
                  : company?.basic?.companyName}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {loading && <h1>Loading...</h1>}
      <span className="absolute top-1/3 right-0 z-20 h-fit w-fit">
        <SlideNextButton />
      </span>
    </Swiper>
  );
};

export default SwiperSlideLeft;
