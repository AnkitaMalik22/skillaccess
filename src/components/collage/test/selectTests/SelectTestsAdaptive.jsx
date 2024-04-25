import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "./Header";

import { Progress } from "./Progress";

import { FiPlusCircle } from "react-icons/fi";

import Inputs from "./Inputs";

import { useSelector, useDispatch } from "react-redux";

import { FaPlus } from "react-icons/fa";

import { useNavigate, useSearchParams } from "react-router-dom";

import {
  setCurrentQuestionCount,
  setCurrentTopic,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { getAllTopics } from "../../../../redux/collage/test/thunks/topic";
import PopUpAdaptive from "../../../PopUps/PopUpAdaptive";

const SelectTests = () => {
  const [questionType, setQuestionType] = useState("mcq");
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState({});
  const [totalQ, setTotalQ] = useState(0);
  // const [totalQuestions, setTotalQuestions] = useState(
  //   parseInt(JSON.parse(localStorage.getItem("currentTotal")) || "0")
  // );
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const { sections, currentQuestionCount, totalQuestions } = useSelector(
    (state) => state.test
  );
  // for filter the sections

  const [filteredSections, setFilteredSections] = useState(sections);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");

  const handleFilterSections = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");
      console.log(filteredSections, "filtered");
      setFilteredSections(sections);

      return;
    } else {
      setFilteredSections(
        sections.filter((section) => {
          const regex = new RegExp(value, "i");
          return regex.test(section.Heading);
        })
      );

      console.log(filteredSections, "filtered--", value);
    }
  };

  let topics = localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [];

  const [selectedSections, setSelectedSections] = useState(topics);

  const addSection = (section) => {
    // setTotalQuestions((prev) => {
    //   return prev + totalQ;
    // });

    // localStorage.setItem("currentTotal", totalQuestions);
    // console.log(section, "section");

    // console.log(currentQuestionCount + parseInt(totalQ));

    if (currentQuestionCount > totalQuestions) {
      toast.error("too many questions");
      return;
    }

    if (!questionType) {
      toast.error("Please select a question type first.");
      return;
    }
    if (selectedSections?.length < 5 || !selectedSections) {
      for (let i = 0; i < selectedSections.length; i++) {
        if (selectedSections[i]._id === section._id) {
          if (selectedSections[i].Type === questionType) {
            return;
          }

          // else{

          //   selectedSections[i].Type = questionType;

          //   return;

          // }
        }
      }

      let sectionCopy = { ...section, Type: questionType };

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          // for (let i = totalQ; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      // Group questions by level
      const questionsByLevel = section?.questions?.reduce((acc, question) => {
        acc[question.QuestionLevel] = acc[question.QuestionLevel] || [];
        acc[question.QuestionLevel].push(question);
        return acc;
      }, {});

      // Shuffle questions for each level
      // Object.values(questionsByLevel).forEach(shuffleArray);

      // Shuffle questions for each level
      Object.values(questionsByLevel).forEach((questions) =>
        shuffleArray(questions)
      );
      console.log(questionsByLevel);
      // Select random questions from each level
      const mixedQuestions = Object.values(questionsByLevel).flatMap(
        (questions) => {
          const numQuestionsAvailable = Math.min(
            Math.ceil(parseInt(totalQ) / 3),
            questions.length
          );
          console.log("length:" + questions.length, parseInt(totalQ));
          return questions.slice(0, numQuestionsAvailable);
        }
      );

      // Output the mixed questions array
      console.log(
        mixedQuestions.slice(0, totalQ),
        mixedQuestions.length,
        "mixedQuestions",
        totalQ
      );

      sectionCopy.questions = mixedQuestions.slice(0, totalQ);

      // console.log(sectionCopy);
      if (mixedQuestions.length < totalQ) {
        toast.error("insufficient number of questions");
        return;
      } else {
        dispatch(
          setCurrentQuestionCount(currentQuestionCount + parseInt(totalQ))
        );
        setSelectedSections([...selectedSections, sectionCopy]);
        dispatch(setTestSelectedTopics(selectedSections));
      }

      //   dispatch(

      //     setTest({

      //       sections: selectedSections,

      //     })

      //   );
    }

    // dispatch(setSections(sections.filter((s) => s !== section)));

    // console.log(updatedSections);
  };

  const removeSection = (section, index) => {
    const updatedSections = [...selectedSections];

    dispatch(
      setCurrentQuestionCount(
        currentQuestionCount - selectedSections[index].questions.length
      )
    );
    updatedSections.splice(index, 1);

    setSelectedSections(updatedSections);

    dispatch(setTestSelectedTopics(updatedSections));
  };

  useEffect(() => {
    dispatch(
      getAllTopics({
        level: level,
      })
    );

    if (sections) {
      setFilteredSections(sections);
    }

    try {
      topics = JSON.parse(localStorage.getItem("topics"));

      setSelectedSections(topics);
    } catch (error) {}

    // console.log("hello tests",sections);
  }, []);

  useEffect(() => {
    if (sections) {
      setFilteredSections(sections);
    }
  }, [sections]);

  useEffect(() => {
    // getSelectedSections();

    dispatch(setTestSelectedTopics(selectedSections));
  }, [addSection, removeSection, selectedSections]);

  return (
    <div
      className={`font-dmSans text-sm font-bold ${
        visible ? "h-screen overflow-hidden" : ""
      }`}
    >
      {visible && (
        <PopUpAdaptive
          visible={visible}
          handleSave={addSection}
          handleOverlay={() => {
            setVisible(false);
          }}
          addSection={addSection}
          section={section}
          totalQ={totalQ}
          setTotalQ={setTotalQ}
          // setTotalQuestions={setTotalQuestions}
          // totalQuestions={totalQuestions}
        />
      )}

      <Header />

      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      {/* larger screens */}

      <div className="  w-11/12 mx-auto min-h-[90vh] my-2 rounded-lg tracking-wide justify-between  ">
        <div>
          <h2 className="w-11/12  text-gray-400 sm:h-10 py-2 sm:mt-12  mt-4 rounded-lg mb-10 sm:mb-1 ">
            Your Assessment can include upto 5 tests, Browse the test library
            and add the most relevant tests.{" "}
          </h2>
        </div>

        <div className=" mx-auto  my-2 rounded-lg grid sm:grid-cols-5 grid-cols-2 gap-6">
          {selectedSections?.map((section, index) => (
            <div
              className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center "
              key={`${section._id + section.Type}`}
            >
              {/* {console.log(section, "section")} */}

              <span className="self-center">
                <h2 className="text-xl font-bold mb-4 line-clamp-2 break-words">{section?.Heading}</h2>

                <div className="flex gap-2">
                  <img
                    src="../../images/icons/menu-boxed.png"
                    alt=""
                    className="self-center"
                  />

                  <h2 className="font-bold text-xs text-gray-400 self-center">
                    {section?.Type}
                  </h2>
                </div>

                <div className="flex justify-between mt-1">
                  {" "}
                  <div className="flex gap-2 w-full">
                    <img
                      src="../../images/icons/stopwatch.png"
                      alt=""
                      className="w-6 h-6 self-center"
                    />

                    <h2 className="font-bold text-xs text-gray-400 self-center">
                      {section?.Time}
                    </h2>
                  </div>
                  <img
                    src="../../images/icons/cross.png"
                    alt=""
                    onClick={() => removeSection(section, index)}
                  />
                </div>
              </span>
            </div>
          ))}

          {selectedSections?.length < 5
            ? Array.from({ length: 5 - selectedSections.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center "
                  >
                    <span className="self-center">
                      <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

                      <h2 className="font-semibold mt-1">
                        Add section {index + 1}{" "}
                      </h2>
                    </span>
                  </div>
                )
              )
            : null}

          {/* <div className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center ">

            <span className="self-center">

              <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

              <h2 className="font-semibold mt-1">Add section 2 </h2>

            </span>

          </div> */}
        </div>

        <Inputs
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleFilter={handleFilterSections}
          type={"adaptive"}
        />

        <div className="grid grid-cols-4 gap-8 justify-center">
          <div className="w-full h-64 bg-gray-100 rounded-lg flex justify-center">
            <div className=" self-center w-fit h-fit ">
              <div
                className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-lg mx-auto flex justify-center"
                onClick={() =>
                  Navigate("/collage/test/createTopicAdaptive?level=adaptive")
                }
              >
                <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
              </div>

              <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60">
                Add New Topic
              </h2>

              <h2 className="text-xs text-center text-gray-400">
                Create new Topic
              </h2>
            </div>
          </div>
          {filteredSections?.map((section, index) => (
            // <div className="card w-96 bg-base-100 shadow-xl">

            //   <div className="card-body">

            //     <h2 className="card-title">{section.name}</h2>

            //     <p> {section.desription}</p>

            //     <div className="card-actions justify-end">

            //       <button

            //         onClick={() => addSection(section)}

            //         className="btn btn-primary"

            //       >

            //         Add

            //       </button>

            //       <button

            //         onClick={() => removeSection(section)}

            //         className="btn btn-primary"

            //       >

            //         Remove

            //       </button>

            //     </div>

            //   </div>

            // </div>

            <div className="w-full h-64 rounded-lg bg-gray-100  relative">
                <div className="card-body overflow-y-auto h-52">
                <h2 className="text-xl font-bold mb-4 break-words">{section.Heading}</h2>

                <p className="text-sm leading-[26px] text-[#8F92A1] break-words">
                  {
                  // section.Description.length > 60
                  //   ? section.Description.substring(0, 60) + "..."
                  //   : 
                    section.Description
                    }
                </p>

                <div>
                  <div className="flex justify-between absolute bottom-0 w-3/4 mb-2">
                    <div>
                      {/* <span className="flex gap-1 mb-1">
                        <img
                          src="./../../images/icons/stopwatch.png"
                          alt=""
                          className="w-7 h-7"
                        />{" "}
                        <p className="text-gray-400 self-center">
                          {section.Time}
                        </p>
                      </span> */}

                      <button
                        className="w-[90px] h-[40px] bg-[#8F92A120] rounded-xl"
                        onClick={() => {
                          // if (!questionType) {
                          //   toast.error("Please select a question type first.");
                          //   return;
                          // }
                          dispatch(
                            setCurrentTopic({
                              topic: {
                                ...section,
                                Type: questionType || "mcq",
                              },
                            })
                          );
                          localStorage.setItem(
                            "Details",

                            JSON.stringify({
                              ...section,
                              Type: questionType || "mcq",
                            })
                          );

                          Navigate(
                            `/collage/test/details/${index}?type=topic&question=${questionType}&level=adaptive`
                          );
                        }}
                      >
                        Details
                      </button>
                    </div>

                    <button
                      className=" bg-[#00875A85] h-[40px] w-[72px] rounded-xl text-white "
                      onClick={() => {
                        setVisible(true);
                        setSection(section);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default SelectTests;
