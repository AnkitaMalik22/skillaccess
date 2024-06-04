import React, { useState } from "react";
import SlideNextButton from "../../dashboard/buttons";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiPencilSimpleLine } from "react-icons/pi";

// Import Swiper styles
import "swiper/css";
import { Bin } from "../../../icons";
import { useNavigate } from "react-router-dom";
import Card from "./common/Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllTests } from "../../../../redux/collage/test/thunks/test";
import CreditPopUp from "../../../PopUps/CreditPopUp";

const Beginner = () => {
  const beginner = useSelector((state) => state.test.assessments.beginner);
  const [show, setShow] = useState(false);
  // const uniqueIds = new Set();

  // const filteredBeginnerAssessments = assessments?.beginner?.filter(
  //   (item) => !uniqueIds.has(item?._id) && uniqueIds.add(item?._id)
  // );
  const dispatch = useDispatch();

  const { testLoading } = useSelector((state) => state.test);
  const credit = useSelector((state) => state.collageAuth);

  console.log(credit);

  const handleClose = () => {
    setShow(false);
  };
  const handleFunc = () => {
    if (credit?.balance?.credit) {
      navigate("/collage/test/name?level=beginner");
    } else {
      setShow(true);
    }
  };
  //   React.useEffect(() => {
  //  if(!testLoading){
  //    dispatch(getAllTests())
  //   }
  //   console.log("testLoading",testLoading)

  //   }, [testLoading]);

  const navigate = useNavigate();
  return (
    <div className="flex bg-[#F8F8F9] w-full gap-4">
      <div className=" w-[242px] h-[312px] bg-[#8F92A1] bg-opacity-5  my-3 ml-8 rounded-2xl flex justify-center">
        <div className=" self-center w-full h-fit ">
          <div
            className="bg-white sm:w-[64px] sm:h-[64px] w-10 h-10 rounded-2xl mx-auto flex justify-center hover:cursor-pointer "
            onClick={handleFunc}
          >
            <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
          </div>
          <h2 className="text-center text-black text-base  font-bold mb-4 mt-8 w-20  md:w-60">
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
          1024: {
            slidesPerView: 1,
          },
          1280: { slidesPerView: 1.5 },
          1400: { slidesPerView: 2 },
          1600: { slidesPerView: 2.5 },
        }}
      >
        {testLoading ? (
          <h1>Loading</h1>
        ) : (
          beginner?.map((item, index) => (
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
          ))
        )}
        <SwiperSlide></SwiperSlide>

        <span className="absolute top-1/2 right-0 z-20 h-fit w-fit">
          <SlideNextButton />
        </span>
      </Swiper>
      {show && <CreditPopUp onCancel={handleClose} />}
    </div>
  );
};

export default Beginner;
