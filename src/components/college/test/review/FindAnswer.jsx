import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import { addBookmark } from "../../../../redux/college/test/thunks/question";
import {
  editQuestion,
  removeQuestion,
  setCurrentQuestionCount,
} from "../../../../redux/college/test/testSlice";

const FindAnswer = ({ Title, Options, Number, id, type, view, question }) => {
  const dispatch = useDispatch();
  const { currentQuestionCount } = useSelector((state) => state.test);

  const [search, setSearch] = useSearchParams();
  const [findAnswer, setFindAnswer] = useState(question);
  const handleChange = (e) => {
    const { name, value, key } = e.target;
    if (name === "Title") {
      setFindAnswer({ ...findAnswer, Title: value });
    } else {
      // setFindAnswer((prev) => {
      //   return {
      //     ...prev,
      //    questions: [
      //       ...prev.questions.slice(0, name),
      //       value,
      //       ...prev.questions.slice(name + 1),
      //     ],
      //   };
      // });

      setFindAnswer((prev) => {
        return {
          ...prev,
          questions: [
            ...prev.questions.slice(0, name),
            {
              question: value,
              value: prev.questions[name].value,
            },
            ...prev.questions.slice(name + 1),
          ],
        };
      });
    }
  };

  const handleBookmark = () => {
    // //console.log("bookmark");
    // //console.log(question);
    dispatch(
      addBookmark({
        Title: question.Title,
        questions: question.questions,
        Options: question.Options,
        Number: question.Number,
        id: question.id,
        AnswerIndex: question.AnswerIndex,
        questionId: question._id,
        Type: "findAnswer",
      })
    );
  };

  const handleDelete = () => {
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));

    dispatch(
      removeQuestion({
        selfIndex: Number,
        topicIndex: id,
        questionType: "findAnswer",
      })
    );
  };

  // React.useEffect(() => {

  //  setFindAnswer(question);
  // }
  // ,[question])

  const handleEdit = () => {
    if (
      findAnswer.Title === "" ||
      findAnswer.questions.some((ques) => ques.question === "")
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
          questionType: "findAnswer",
          question: findAnswer,
        })
      );
    }
  };

  return (
    <div className="flex bg-white rounded-lg justify-between mb-5">
      <div className="p-5 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="flex mb-2 gap-3 font-semibold  text-base break-words ">
            {Number + 1} &nbsp; {Title}
          </h2>
        ) : (
          <input
            onChange={handleChange}
            placeholder="enter new question"
            name="Title"
            value={findAnswer.Title}
          />
        )}
        <div className="px-5 pb-4 flex flex-col gap-4">
          {Options.map((ques, index) => (
            <span className="flex gap-2">
              <div className="flex w-5 justify-center"></div>
              <label htmlFor="answer" className="self-center">
                {" "}
                {search.get(`${Number}`) !== "true" ? (
                  findAnswer.questions[index].question
                ) : (
                  <>
                    <input
                      name={index}
                      value={findAnswer.questions[index].question}
                      onChange={handleChange}
                      placeholder="enter new question"
                    />
                  </>
                )}
              </label>
            </span>
          ))}
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
              onClick={handleEdit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FindAnswer;
