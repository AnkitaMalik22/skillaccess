import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  editQuestion,
  removeQuestion,
} from "../../../../redux/collage/test/testSlice";
import { addBookmark } from "../../../../redux/collage/test/thunks/question";
const Code = ({ Title, code, Number, id, question, type, view }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useSearchParams();
  const [compiler, setCompiler] = useState(question);
  console.log(compiler);
  // const handleChange = (e) => {
  //   const { name, value, key } = e.target;

  //     setCompiler((prev) => {
  //       return { ...prev, [name]: [value] };

  //     });

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompiler((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBookmark = () => {
    console.log("bookmark");
    // console.log(question);
    dispatch(
      addBookmark({
        ...question,
        questionId: question._id,
        Type: "code",
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      removeQuestion({
        selfIndex: Number,
        topicIndex: id,
        questionType: "compiler",
      })
    );
  };
  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between">
      <div className="w-11/12 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="px-4 font-semibold pt-3 text-base">
            {Number + 1} &nbsp; {Title}
          </h2>
        ) : (
          <input
            onChange={handleChange}
            placeholder="enter new question"
            name="codeQuestion"
            value={compiler.codeQuestion}
          />
        )}
        <div className="px-5 pb-4 flex flex-col gap-4">
          <span className="flex gap-2">
            <div className="flex w-5 justify-center">
              {/* <input
                type="radio"
                name="answer"
                id="answer"
                className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
              />{" "} */}
            </div>
            {search.get(`${Number}`) !== "true" ? (
              <label for="answer" className="self-center">
                {Number + 1} &nbsp; {compiler.code}
              </label>
            ) : (
              <input
                onChange={handleChange}
                placeholder="enter new question"
                name="code"
                value={compiler.code}
              />
            )}
          </span>
        </div>
      </div>
      {/* <div className="w-[5%] flex flex-col gap-4 text-blued justify-center border-s-2 py-1">
        <RxCross1
          className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
          onClick={handleDelete}
        />
        <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
        <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
        <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
        <PiPencilSimpleLineBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
      </div> */}

      {type !== "topic" && view !== "false" && (
        <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
          <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
            onClick={handleDelete}
          />
          <CiBookmarkMinus
            className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center"
            onClick={handleBookmark}
          />
          {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}
          {/* <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
        <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}

          {search.get(`${Number}`) !== "true" ? (
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
                if (!compiler.codeQuestion) {
                  toast.error("Please enter the question");
                  return;
                }

                if (!compiler.code) {
                  toast.error("Please enter the code");
                  return;
                } else {
                  search.set(`${Number}`, "false");
                  setSearch(search);
                  dispatch(
                    editQuestion({
                      topicIndex: id,
                      selfIndex: Number,
                      questionType: "compiler",
                      question: compiler,
                    })
                  );
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Code;
