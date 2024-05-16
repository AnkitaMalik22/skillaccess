import React from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../../../redux/collage/test/testSlice";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
const VideoMcq = ({ Number, mcq }) => {
  const dispatch = useDispatch();
  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        <h2 className="flex gap-2 px-4 font-semibold pt-3 text-base">
         <p className="text-sm">{Number + 1}. </p> 
          <p className="text-sm"dangerouslySetInnerHTML={{ __html: mcq.Title}}/>
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
              {mcq.Options[0]}
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
              {mcq.Options[1]}
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
              {mcq.Options[2]}
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
              {mcq.Options[3]}
            </label>
          </span>
        </div>
      </div>
      {/* {type !== "topic" && view !== "false" && (
        <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
          <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
            onClick={handleDelete}
          /> */}
      {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}
      {/* <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
<CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}
      {/* {search.get(`${Number}`) !== "true" ? (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center"
              onClick={() => {
                search.set(`${Number}`, "true");
                setSearch(search);
              }}
            />
          ) : (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-amber-600 self-center"
              onClick={() => {
                search.set(`${Number}`, "false");
                setSearch(search);
                dispatch(
                  editQuestion({
                    topicIndex: id,
                    selfIndex: Number,
                    questionType: "mcq",
                    question: mcq,
                  })
                );
              }}
            />
          )} */}
      {/* </div> */}
      {/* )} */}
    </div>
  );
};

export default VideoMcq;
