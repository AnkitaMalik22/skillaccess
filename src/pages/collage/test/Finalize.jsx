import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import useTranslate from "../../../hooks/useTranslate";

const Finalize = () => {
  //useTranslate();
  const navigate = useNavigate();
  // const {
  //   name,
  //   description,
  //   totalQuestions,
  //   testAttempts,
  //   topics,
  //   totalDuration,
  // } = useSelector((state) => state.test);
  const testDetails = JSON.parse(localStorage.getItem("testDetails"));

  const totalTime = localStorage.getItem("totalTime");

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    //  //console.log(test);
  }, []);

  // const totalTime = topics?.reduce((acc, topic) => acc + topic.Time, 0);

  // const totalQuestions = topics?.reduce((acc, topic) => {
  //   return (
  //     acc +
  //     (topic.questions?.length || 0) +
  //     (topic.findAnswers?.length || 0) +
  //     (topic.video?.length || 0) +
  //     (topic.compiler?.length || 0) +
  //     (topic.essay?.length || 0)
  //   );

  // }, 0);

  const handleSubmit = () => {
    // dispatch(setTest({
    //   totalTime,
    //   totalQuestions,
    //   totalAttempts
    // }

    // dispatch(
    //   createTest({
    //     name: testDetails?.name,
    //     description: testDetails?.description,
    //     totalAttempts: testDetails?.totalQuestions,

    //     topics,
    //   })
    // );

    navigate(`/collage/test/invite?testId=${searchParams.get("testId")}`);
    // localStorage.removeItem("testDetails");
    // localStorage.removeItem("totalTime");
  };

  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        {/* <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2> */}
      </div>
      <div className="bg-white min-h-[90vh] mx-auto rounded-xl font-dmSans">
        <div className=" mx-auto ">
          <div className="w-full">
            <div
              name=""
              id=""
              className="w-full rounded-lg bg-gray-100 focus:outline-none border-none mb-4 py-3 px-5 font-bold text-2xl capitalize"
            >
              {testDetails?.name}
            </div>
          </div>

          <p className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg  px-5 pt-3 pb-8 focus:ring-0placeholder-gray-400 mb-6">
            {testDetails?.description}
          </p>
          {/* Need to all these details below from sections */}
          <div className=" w-full h-full text-lg bg-gray-100   mb-3 rounded-lg flex justify-between px-5 py-4">
            <p>Total time to complete</p>
            <p className="text-[#0052CC]  font-bold">
              {/* {testDetails?.totalDuration}mins */}
              {totalTime} mins
            </p>
            {/* {totalTime}  */}
          </div>

          <div className=" w-full h-full text-lg bg-gray-100   mb-3 rounded-lg flex justify-between px-5 py-4">
            <p>Total number of questions</p>
            <p className="text-[#0052CC]  font-bold">
              {testDetails?.totalQuestions}
            </p>
          </div>

          <div className=" w-full h-full text-lg bg-gray-100   mb-3 rounded-lg flex justify-between px-5 py-4">
            <p>Total attempts allowed</p>
            <p className="text-[#0052CC]  font-bold">
              {testDetails?.totalAttempts}
            </p>
          </div>
        </div>

        <div className="pt-1 relative pb-20">
          <div className=" absolute right-7">
            {" "}
            <div className=" flex gap-2">
              <button
                className="self-center justify-center flex bg-blue-700 rounded-lg text-sm font-bold gap-2 px-4 py-3"
                onClick={() => handleSubmit()}
              >
                <img src="../../images/icons/student.png" alt="" />{" "}
                <p className="self-center text-white">Invite Students</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Finalize;
