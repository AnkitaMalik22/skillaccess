import React from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../../../redux/collage/test/testSlice";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const VideoMcq = ({ Number, mcq, id, video }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(mcq);
  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      {mcq.Title && (
        <div className="w-11/12 flex flex-col gap-2">
          <h2 className="flex gap-2 px-4 font-semibold pt-3 text-base">
            <p className="text-sm">{Number + 1}. </p>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: mcq.Title }}
            />
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg  self-center cursor-pointer"
              onClick={() => {
                navigate(
                  `/collage/quesBank/video/${id}/addmcq?addType=edit&index=${Number}`
                );
                localStorage.setItem("qbQues", JSON.stringify(video));
              }}
            />
          </h2>

          <div className="px-5 pb-4 flex flex-col gap-4">
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>

              <label for="answer" className="self-center">
                {" "}
                {mcq?.Options[0]}
              </label>
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  name="answer"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>

              <label for="answer" className="self-center">
                {" "}
                {mcq?.Options[1]}
              </label>
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>

              <label for="answer" className="self-center">
                {" "}
                {mcq?.Options[2]}
              </label>
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  name="answer"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>

              <label for="answer" className="self-center">
                {" "}
                {mcq?.Options[3]}
              </label>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMcq;
