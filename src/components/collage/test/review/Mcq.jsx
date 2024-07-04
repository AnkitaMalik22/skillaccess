import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {
  editQuestion,
  removeQuestion,
  setCurrentQuestionCount,
} from "../../../../redux/collage/test/testSlice";
import { addBookmark } from "../../../../redux/collage/test/thunks/question";

import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Mcq = ({ Title, Options, Number, id, type, view, question }) => {
  const [search, setSearch] = useSearchParams();
  const { currentQuestionCount } = useSelector((state) => state.test);

  const [mcq, setMcq] = useState(question);
  console.log(question);
  const dispatch = useDispatch();

  console.log(question);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Title") {
      console.log("name");
      setMcq((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      console.log(name);
      setMcq((prev) => {
        return {
          ...prev,
          Options: prev.Options.map((option, index) =>
            index === parseInt(name) ? value : option
          ),
        };
      });
    }
  };

  const handleDelete = () => {
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));

    dispatch(
      removeQuestion({ selfIndex: Number, topicIndex: id, questionType: "mcq" })
    );
  };

  const handleBookmark = () => {
    console.log("bookmark");
    // console.log(question);
    dispatch(
      addBookmark({
        Title: question.Title,
        Options: question.Options,
        Number: question.Number,
        id: question.id,
        AnswerIndex: question.AnswerIndex,
        questionId: question._id,
        Type: "mcq",
      })
    );
  };

  const handleEdit = () => {
    if (
      !mcq.Title ||
      mcq.Title === "<p><br></p>" ||
      !mcq.Options[0] ||
      !mcq.Options[1] ||
      !mcq.Options[2] ||
      !mcq.Options[3]
    ) {
      toast.error("Please fill all the fields");

      return;
    } else {
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
    }
  };

  return (
    <div className="flex bg-white rounded-lg justify-between mb-5">
      <div className="p-5 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="flex mb-2 gap-3 font-semibold  text-base first-letter:uppercase ">
            <div>{Number + 1}. </div>

            <div dangerouslySetInnerHTML={{ __html: Title }}></div>
          </h2>
        ) : (
          <div className="h-fit">
            <ReactQuill
              value={mcq.Title}
              onChange={(value) => setMcq({ ...mcq, Title: value })}
              className="border-none focus:outline-none rounded-lg focus:ring-0 placeholder-gray-400"
              placeholder="Enter Question Here"
              name="Title"
            />
          </div>
        )}
        <div className={`flex flex-col gap-4 mt-6 `}>
          {mcq.Options.map((ques, index) => (
            <span className="flex gap-2 ">
              <div className="flex w-5 justify-center">
                <input
                  name={mcq.Title}
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              {search.get(`${Number}`) !== "true" ? (
                <label for="answer" className="self-center">
                  {" "}
                  {mcq.Options[index]}
                </label>
              ) : (
                <input
                  className="rounded-lg"
                  onChange={handleChange}
                  placeholder="enter new option"
                  name={index}
                  value={mcq.Options[index]}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      {type !== "topic" && view !== "false" && (
        <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
          <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100 cursor-pointer"
            onClick={handleDelete}
          />
          <CiBookmarkMinus
            className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center cursor-pointer"
            onClick={handleBookmark}
          />

          {search.get(`${Number}`) !== "true" ? (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center cursor-pointer"
              onClick={() => {
                search.set(`${Number}`, "true");
                setSearch(search);
              }}
            />
          ) : (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-amber-600 self-center cursor-pointer"
              onClick={handleEdit}
            />
          )}
        </div>
      )}

      <div className="level ">
        {question.QuestionLevel == "beginner" && (
          <p className="rounded-2xl m-3 py-1.5 bg-cyan-500 text-white w-8 h-8 text-center font-extrabold  ">
            L1
          </p>
        )}
        {question.QuestionLevel == "intermediate" && (
          <p className="rounded-2xl m-3 py-1.5 bg-green-500 text-white w-8 h-8 text-center font-extrabold  ">
            L2
          </p>
        )}
        {question.QuestionLevel == "advanced" && (
          <p className="rounded-2xl m-3 py-1.5 bg-red-500 text-white w-8 h-8 text-center font-extrabold  ">
            L3
          </p>
        )}
      </div>
    </div>
  );
};

export default Mcq;
