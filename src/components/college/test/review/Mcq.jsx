import React, { useState } from "react";
import { CiBookmarkMinus } from "react-icons/ci";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useDispatch, useSelector } from "react-redux";
import { addBookmark } from "../../../../redux/college/test/thunks/question";

import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  editQuestionCompany,
  removeQuestionCompany,
  setCurrentQuestionCountCompany,
} from "../../../../redux/company/test/testSlice";
import isCompany, { isUni } from "../../../../util/isCompany";
import {
  editQuestion,
  removeQuestion,
  setCurrentQuestionCount,
} from "../../../../redux/college/test/testSlice";

const Mcq = ({ Title, Options, Number, id, type, view, question }) => {
  const [search, setSearch] = useSearchParams();
  const { currentQuestionCount } = useSelector((state) => state.test);
  const navigate = useNavigate();
  const [mcq, setMcq] = useState(question);
  // //console.log(question);
  const dispatch = useDispatch();



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Title") {
      // //console.log("name");
      setMcq((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      // //console.log(name);
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

    dispatch(
      removeQuestion({
        selfIndex: Number,
        topicIndex: id,
        questionType: "mcq",
      })
    );
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));
  };

  const handleBookmark = () => {
    // //console.log("bookmark");
    // //console.log(question);
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
    // if (
    //   !mcq.Title ||
    //   mcq.Title === "<p><br></p>" ||
    //   !mcq.Options[0] ||
    //   !mcq.Options[1] ||
    //   !mcq.Options[2] ||
    //   !mcq.Options[3]
    // ) {
    //   toast.error("Please fill all the fields");

    //   return;
    // } else {
    //   search.set(`${Number}`, "false");
    //   setSearch(search);

    //   if (isCompany()) {
    //     dispatch(
    //       editQuestionCompany({
    //         topicIndex: id,
    //         selfIndex: Number,
    //         questionType: "mcq",
    //         question: mcq,
    //       })
    //     );
    //   } else {
    //     dispatch(editQuestion({
    //       topicIndex: id,
    //       selfIndex: Number,
    //       questionType: "mcq",
    //       question: mcq,
    //     }))
    //   }

    // }

    localStorage.setItem("qbQues", JSON.stringify(question));
    navigate(
      `/${isUni() ? "pr/university" : "college"}/quesBank/addMcqToTopic/${question._id
      }?type=mcq&addType=edit`
    );
  };

  return (
    <div className="flex bg-white rounded-md justify-between mb-5">
      <div className="p-5 flex flex-col gap-2">
        {/* {search.get(`${Number}`) !== "true" ? ( */}
        <h2 className="flex mb-2 gap-3 font-semibold  text-base first-letter:uppercase ">
          <div>{Number + 1}. </div>

          <div dangerouslySetInnerHTML={{ __html: Title }}></div>
        </h2>
        {/* ) : (
          <div className="h-fit">
            <ReactQuill
              value={mcq.Title}
              onChange={(value) => setMcq({ ...mcq, Title: value })}
              className="border-none focus:outline-none rounded-md focus:ring-0 placeholder-gray-400"
              placeholder="Enter Question Here"
              name="Title"
            />
          </div>
        )} */}
        <div className={`flex flex-col gap-4 mt-6 `}>
          {question.image && (
            <img
              src={question.image}
              alt="question"
              className="w-full rounded-md"
            />
          )}

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
                  className="rounded-md"
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

      <div className="flex gap-2 ">
        <div className=" flex flex-col gap-4 text-blued border-s-2 py-1 items-center justify-center px-4">
          <div className=" ">
            {question.QuestionLevel == "beginner" && (
              <p className="rounded-2xl  py-1.5 bg-cyan-500 text-white w-8 h-8 text-center font-extrabold  ">
                L1
              </p>
            )}
            {question.QuestionLevel == "intermediate" && (
              <p className="rounded-2xl py-1.5 bg-green-500 text-white w-8 h-8 text-center font-extrabold  ">
                L2
              </p>
            )}
            {question.QuestionLevel == "advanced" && (
              <p className="rounded-2xl  py-1.5 bg-red-500 text-white w-8 h-8 text-center font-extrabold  ">
                L3
              </p>
            )}
          </div>
          {type !== "topic" && view !== "false" && (
            <>
              {" "}
              <div>
                <RxCross1
                  className="text-red-500 w-6 h-6 p-1 rounded-md self-center bg-gray-100 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
              <div>
                <CiBookmarkMinus
                  className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center cursor-pointer"
                  onClick={handleBookmark}
                />
              </div>
              {/* search.get(`${Number}`) !== "true" ? (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-md bg-gray-100 self-center cursor-pointer"
              onClick={() => {
                search.set(`${Number}`, "true");
                setSearch(search);
              }}
            />
          ) : */}
              {
                <div>
                  <PiPencilSimpleLineBold
                    className=" w-6 h-6 p-1 rounded-md bg-amber-600 self-center cursor-pointer"
                    onClick={handleEdit}
                  />
                </div>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mcq;
