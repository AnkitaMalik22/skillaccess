import React, { useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import List from "./List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createTest,
  setTestBasicDetails,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Submit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, description, topics, totalAttempts } = useSelector(
    (state) => state.test
  );



  const [questions, setQuestions] = useState();
  let section1 = [];
  let section2 = [];
  let section3 = [];
  let section4 = [];
  let section5 = [];
  useEffect(() => {
    if (topics[0])
      switch (topics[0].Type) {
        case "essay":
          section1 = topics[0].essay;
          break;
        case "video":
          section1 = topics[0].video;
          break;
        case "code":
          section1 = topics[0].code;
          break;
        case "findAnswer":
          section1 = topics[0].findAnswers;
          break;
        default:
          section1 = topics[0].questions;
          break;
      }

    if (topics[1])
      switch (topics[1].Type) {
        case "essay":
          section2 = topics[1].essay;
          break;
        case "video":
          section2 = topics[1].video;
          break;
        case "code":
          section2 = topics[1].code;
          break;
        case "findAnswer":
          section2 = topics[1].findAnswers;
          break;
        default:
          section2 = topics[1].questions;
          break;
      }

    if (topics[2])
      switch (topics[2].Type) {
        case "essay":
          section3 = topics[2].essay;
          break;
        case "video":
          section3 = topics[2].video;
          break;
        case "code":
          section3 = topics[2].code;
          break;
        case "findAnswer":
          section3 = topics[2].findAnswers;
          break;
        default:
          section3 = topics[2].questions;
          break;
      }

    if (topics[3])
      switch (topics[3].Type) {
        case "essay":
          section4 = topics[3].essay;
          break;
        case "video":
          section4 = topics[3].video;
          break;
        case "code":
          section4 = topics[3].code;
          break;
        case "findAnswer":
          section4 = topics[3].findAnswers;
          break;
        default:
          section4 = topics[3].questions;
          break;
      }

    if (topics[4])
      switch (topics[4].Type) {
        case "essay":
          section5 = topics[4].essay;
          break;
        case "video":
          section5 = topics[4].video;
          break;
        case "code":
          section5 = topics[4].code;
          break;
        case "findAnswer":
          section5 = topics[4].findAnswers;
          break;
        default:
          section5 = topics[2].questions;
          break;
      }

    console.log(section1, section2, section3, section4, section5);

    setQuestions([
      ...section1,
      ...section2,
      ...section3,
      ...section4,
      ...section5,
    ]);

 
  }, []);

  const handleSubmit = () => {
    // dispatch(setTest({
    //   totalTime,
    //   totalQuestions,
    //   totalAttempts
    // }
  
    dispatch(
   
      createTest({
        name,
        description,
        totalAttempts,
        topics,
      })
    ).then(() => {
      dispatch(
        setTestBasicDetails({ name: "", description: "", totalAttempts: null })
      );

      navigate("/collage/test/final");
    });
  };

  const max = Math.ceil(questions?.length / 10);
  const [selected, setSelected] = useState(1);

  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      <Header page={"final"} handleSubmit={handleSubmit} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>
      <div className="mt-16">
        {questions
          ?.slice((selected - 1) * 10 + (selected > 1 ? 1 : 0), selected * 10)
          .map((question, i) => {
            return (
              <div className="my-2">
                <List
                  question={question}
                  number={(selected - 1) * 10 + 1 + i}
                />{" "}
              </div>
            );
          })}

        {/* iterate this list */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronLeft
            className={`rotate-45 text-lg self-center ${
              selected === max && "disabled"
            }`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected === 1 ? "bg-blue-700 text-white" : "bg-gray-100 "
          }`}
          onClick={() => setSelected(1)}
        >
          <p className="self-center">1</p>
        </div>
        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected === 2 ? "bg-blue-700 text-white" : "bg-gray-100 "
          }`}
          onClick={() => setSelected(2)}
        >
          <p className="self-center">2</p>
        </div>
        <div
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected > 2 && selected < max
              ? "bg-blue-700 text-white"
              : "bg-gray-100 "
          }`}
          onClick={() => {
            selected !== 3 && setSelected(3);
          }}
        >
          <p className="self-center">
            {selected >= 3 && selected < max ? selected : 3}
          </p>
        </div>
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <p className="self-center">...</p>
        </div>

        {max > 3 && (
          <div
            className={`rounded-lg h-10 w-10 flex justify-center ${
              selected === max ? "bg-blue-700 text-white" : "bg-gray-100 "
            }`}
            onClick={() => setSelected(max)}
          >
            <p className="self-center">{max}</p>
          </div>
        )}

        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronRight
            className={`rotate-45 text-lg self-center ${
              selected === max && "disabled"
            }`}
            onClick={() => selected !== max && setSelected(selected + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Submit;
