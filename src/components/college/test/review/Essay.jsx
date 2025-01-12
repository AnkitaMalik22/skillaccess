import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";

import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  editQuestion,
  removeQuestion,
  setCurrentQuestionCount,
} from "../../../../redux/college/test/testSlice";
import { addBookmark } from "../../../../redux/college/test/thunks/question";

const Essay = ({ Title, Number, id, question, type, view }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const [essay, setEssay] = useState(question);
  const { currentQuestionCount } = useSelector((state) => state.test);

  const handleChange = (e) => {
    const { name, value, key } = e.target;
    if (name === "Title") {
      // //console.log("name");
      setEssay((prev) => {
        return { ...prev, [name]: [value] };
      });
    }
  };
  const handleDelete = () => {
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));

    dispatch(
      removeQuestion({
        selfIndex: Number,
        topicIndex: id,
        questionType: "essay",
      })
    );
  };

  // const handleDelete = () => {
  //   dispatch(
  //     removeQuestion({
  //       selfIndex: Number,
  //       topicIndex: id,
  //       questionType: "essay",
  //     })
  //   );
  // };

  const handleBookmark = () => {
    // //console.log("bookmark");
    // //console.log(question);
    dispatch(
      addBookmark({
        Title: question.Title,
        Number: question.Number,
        id: question.id,
        questionId: question._id,
        Type: "essay",
      })
    );
  };

  const handleEdit = () => {
    // //console.log(essay);
    if (essay.Title[0] === "") {
      toast.error("Please fill all the fields");

      return;
    } else {
      search.set(`${Number}`, "false");
      setSearch(search);
      dispatch(
        editQuestion({
          topicIndex: id,
          selfIndex: Number,
          questionType: "essay",
          question: essay,
        })
      );
    }
  };

  return (
    <div className="flex bg-white rounded-md justify-between mb-5">
      <div className="p-5 flex flex-col gap-2 ">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="flex mb-2 gap-3 font-semibold  text-base break-words ">
            Q{Number + 1}. &nbsp; {Title}
          </h2>
        ) : (
          <input
            onChange={handleChange}
            placeholder="enter new question"
            name="Title"
            value={essay.Title}
          />
        )}
        <div className="flex flex-col gap-4">
          {/* {Options.map((ques) => (
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
                {ques.question}
              </label>
            </span>
          ))} */}
        </div>
      </div>

      {/* <div className="w-[5%] flex flex-col gap-4 text-blued justify-center border-s-2 py-1">
        <RxCross1
          className="text-red-500 w-6 h-6 p-1 rounded-md self-center bg-gray-100"
          onClick={handleDelete}
        /> */}

      {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" />
        <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" />
        <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" />
        <PiPencilSimpleLineBold className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" /> */}
      {/* </div> */}

      {type !== "topic" && view !== "false" && (
        <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
          <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-md self-center bg-gray-100"
            onClick={handleDelete}
          />
          <CiBookmarkMinus
            className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center"
            onClick={handleBookmark}
          />
          {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" /> */}
          {/* <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" />
        <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center" /> */}

          {search.get(`${Number}`) !== "true" ? (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center"
              onClick={() => {
                search.set(`${Number}`, "true");
                setSearch(search);
              }}
            />
          ) : (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-md bg-amber-600 self-center"
              onClick={handleEdit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Essay;
