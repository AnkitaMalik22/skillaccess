import React from "react";
import { PiPencilSimpleLine } from "react-icons/pi";
import { Bin } from "../../../../icons";
import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { deleteTest, getAllTests } from "../../../../../redux/collage/test/thunks/test";

const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className="w-60 h-64 bg-white my-3 text-start font-bold text-black rounded sm:p-2 p-1 font-dmSans">
      <h2 className="mb-2 line-clamp-2 ">{props.assessment?.name}</h2>
      <p className="font-normal text-gray-400  line-clamp-4 sm:mb-2 mb-1 h-1/2">
        {props.assessment?.description}
      </p>
      <h2 className="text-gray-400 font-medium text-base font-dmSans sm:mb-2">
        ATTEMPTS
      </h2>
      <div className="grid grid-cols-4 w-full px-2 gap-2 mb-4">
        <div
          className={`${
            props.progress === 1
              ? "bg-red-500"
              : props.progress === 2
              ? "bg-blue-600"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-blue-600"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
        <div
          className={`${
            props.progress === 1
              ? "bg-gray-200"
              : props.progress === 2
              ? "bg-gray-200"
              : props.progress === 3
              ? "bg-amber-500"
              : "bg-green-500"
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
              : "bg-green-500"
          } w-full h-1 rounded`}
        ></div>
      </div>

      <div className="flex justify-between ">
        <div className="flex ">
          <div className="w-8 h-8 bg-blue-500  rounded"></div>
          <div className="w-8 h-8 bg-blue-900 rounded -ml-3"></div>
          <div className="w-8 h-8 bg-blue-100 rounded -ml-3"></div>
          <div className="w-8  rounded  font-dmSans text-gray-400 font-normal self-center ">
            +{props.assessment?.totalAttempts}
          </div>
        </div>

        <div className="flex justify-between px-2 gap-3 mt-2">
          <button
            className="bg-transparent border-none "
            onClick={(e) => {
            dispatch(deleteTest(props.assessment._id));
             
            }}
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
              navigate("/collage/test/assessment");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
