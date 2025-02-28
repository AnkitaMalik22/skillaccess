import React from "react";
import { PiPencilSimpleLine } from "react-icons/pi";
import { Bin } from "../../../../icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteTest,
//   getAllTests,
// } from "../../../../../redux/college/test/thunks/test";
import { FaPlus } from "react-icons/fa6";
const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const deleteHandler = (id) => {
  //     dispatch(deleteTest(id)).then((res) => {
  //       if (res.meta.requestStatus === "fulfilled") {
  //         dispatch(getAllTests());
  //       }
  //     });
  //   };
  return (
    <div className=" h-[312px] bg-white text-start font-bold text-black rounded-md p-2 font-dmSans">
      <h2 className="mb-2 line-clamp-2 first-letter:uppercase ">
        {props.assessment?.name}
      </h2>
      <p className="font-normal text-gray-400 text-sm line-clamp-4 sm:mb-2 mb-1 h-[48%]">
        {props.assessment?.description}
      </p>
      <h2 className="text-gray-400  text-sm tracking-[1px] font-dmSans sm:mb-2">
        ATTEMPTS
      </h2>
      <div className="grid grid-cols-4 w-full px-2 gap-2 mb-4">
        <div
          className={`${
            props.progress === 1
              ? "bg-red-500"
              : props.progress === 2
              ? "bg-blued"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-600"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-blued"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-600"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-gray-200"
              : props.progress === 3
              ? "bg-amber-600"
              : "bg-green-600"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-gray-200"
              : props.progress === 3
              ? "bg-gray-200"
              : "bg-green-600"
          } w-full h-1 rounded`}
        ></div>
      </div>

      <div className="flex justify-between ">
        <div
          className="flex cursor-pointer "
          //   onClick={() => {
          //     // localStorage.setItem("testDetails", {
          //     //   testId: props.assessment._id,
          //     //   name: props.assessment.name,
          //     //   duration: props.assessment.totalTime,
          //     //   attempts: props.assessment.totalAttempts,
          //     //   total: props.assessment.totalQuestionsCount,
          //     // });
          //     localStorage.setItem("testId", props.assessment._id);
          //     localStorage.setItem("testName", props.assessment?.name);
          //     props?.assessment &&
          //       navigate(`/college/test/invite?testId=${props?.assessment._id}`);
          //   }}
        >
          <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blued mx-2" />
          {props.assessment?.invitedStudents.slice(0, 3).map((student) => (
            <>
              <img src={student?.avatar?.url} className="w-8 h-8 -ml-1" />
            </>
          ))}

          <div className="w-8  rounded  font-dmSans text-gray-400 font-normal self-center text-sm pl-2">
            {props.assessment?.invitedStudents.length - 3 > 0 &&
              props.assessment?.invitedStudents.length - 3}
            {props.assessment?.invitedStudents.length - 3 > 0 && "+"}
          </div>
        </div>

        <div className="flex justify-between px-2 gap-3 mt-2 self-center">
          <button
            className="bg-transparent border-none self-center "
            // onClick={(e) => {
            //   deleteHandler(props.assessment._id);
            // }}
          >
            <Bin className="cursor-pointer " />
          </button>

          <PiPencilSimpleLine
            className="w-6 h-5 text-blued cursor-pointer"
            onClick={() => {
              localStorage.setItem(
                "assessment",
                JSON.stringify(props.assessment)
              );
              navigate("/college/test/assessment");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
