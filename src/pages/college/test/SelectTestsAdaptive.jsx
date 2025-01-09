import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/college/test/selectTests/Header";
import { Progress } from "../../../components/college/test/selectTests/Progress";
import { FiPlusCircle } from "react-icons/fi";
import Inputs from "../../../components/college/test/selectTests/Inputs";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setCurrentQuestionCount,
  setCurrentTopic,
  setTestSelectedTopics,
} from "../../../redux/college/test/testSlice";
import { getAllTopics } from "../../../redux/college/test/thunks/topic";
import PopUpAdaptive from "../../../components/PopUps/PopUpAdaptive";
import useTranslate from "../../../hooks/useTranslate";
import { Disclosure } from "@headlessui/react";
import { isUni } from "../../../util/isCompany";
const SelectTests = () => {
  //useTranslate();
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

  const [filteredSections, setFilteredSections] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");

  const handleFilterSections = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      //console.log("empty");
      //console.log(filteredSections, "filtered");
      setFilteredSections(sections);

      return;
    } else {
      setFilteredSections(
        sections.filter((section) => {
          const regex = new RegExp(value, "i");
          return regex.test(section.Heading);
        })
      );

      //console.log(filteredSections, "filtered--", value);
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
    let Total =
      Math.floor((2 / 6) * parseInt(totalQ)) +
      Math.ceil((2 / 3) * parseInt(totalQ)) +
      parseInt(totalQ);
    // localStorage.setItem("currentTotal", totalQuestions);
    // //console.log(section, "section");

    // //console.log(currentQuestionCount + parseInt(totalQ));

    // let totalInAdv = parseInt(Total)-parseInt(totalQ);
    if (
      parseInt(currentQuestionCount) + parseInt(totalQ) * 2 >
        parseInt(totalQuestions) * 2 ||
      parseInt(totalQ) > parseInt(totalQuestions) * 2
    ) {
      toast.error("max questions reached");
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
            toast.error("This section is already added");
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
      // const questionsByLevel = section?.questions?.reduce((acc, question) => {
      //   acc[question.QuestionLevel] = acc[question.QuestionLevel] || [];
      //   acc[question.QuestionLevel].push(question);
      //   return acc;
      // }, {});

      let questionsByLevel = {
        beginner: [],
        intermediate: [],
        advanced: [],
      };
      section?.questions?.forEach((question) => {
        questionsByLevel[question.QuestionLevel].push(question);
      });

      // //console.log(questionsByLevel, "level");

      // Shuffle questions for each level
      // Object.values(questionsByLevel).forEach(shuffleArray);

      // Shuffle questions for each level
      Object.values(questionsByLevel).forEach((questions) =>
        shuffleArray(questions)
      );
      // //console.log(questionsByLevel);
      let errText = "";

      questionsByLevel.intermediate = questionsByLevel.intermediate.slice(
        0,
        Math.floor((2 * parseInt(totalQ)) / 3)
      );

      questionsByLevel.beginner = questionsByLevel.beginner.slice(
        0,
        Math.floor(parseInt(totalQ))
      );
      questionsByLevel.advanced = questionsByLevel.advanced.slice(
        0,
        Math.ceil(parseInt(totalQ) / 3)
      );
      // Select random questions from each level

      const mixedQuestions = Object.values(questionsByLevel).flatMap(
        (questions, index) => {
          const numQuestionsAvailable = Math.min(
            Math.floor(parseInt(totalQ)),
            questions.length
          );

          //console.log(questions);
          if (
            Math.floor(parseInt(totalQ)) > questionsByLevel["beginner"].length
          ) {
            errText = "Insufficient Beginner questions";
            return;
          }
          if (
            Math.floor((2 * parseInt(totalQ)) / 3) >
            questionsByLevel["intermediate"].length
          ) {
            errText = "Insufficient Intermediate questions";
            return;
          }
          if (
            Math.ceil(parseInt(totalQ) / 3) >
            questionsByLevel["advanced"].length
          ) {
            errText = "Insufficient Advanced questions";
            return;
          }
          //console.log(
          //   "length:" + questions.length,
          //   parseInt(totalQ),
          //   "numQuestionsAvailable:" + numQuestionsAvailable
          // );
          return questions.slice(0, numQuestionsAvailable);
        }
      );

      // Output the mixed questions array
      //console.log(
      //   mixedQuestions.slice(0),
      //   mixedQuestions.length,
      //   "mixedQuestions",
      //   Total
      // );
      if (errText) {
        toast.error(errText);
        return;
      }

      sectionCopy.questions = mixedQuestions.slice(0, Total);
      sectionCopy.totalL2Question = Math.floor((2 * parseInt(totalQ)) / 3);
      sectionCopy.totalL1Question = parseInt(totalQ);
      sectionCopy.totalL3Question =
        totalQ - Math.floor((2 * parseInt(totalQ)) / 3);
      // //console.log(sectionCopy);
      if (mixedQuestions.length < totalQ) {
        toast.error("insufficient number of questions ");
        return;
      } else {
        dispatch(setCurrentQuestionCount(currentQuestionCount + Total));
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

    // //console.log(updatedSections);
  };

  const removeSection = (section, index) => {
    const updatedSections = [...selectedSections];
    let QsCount = Math.floor(selectedSections[index].questions.length);
    dispatch(setCurrentQuestionCount(currentQuestionCount - QsCount));
    updatedSections.splice(index, 1);

    setSelectedSections(updatedSections);

    dispatch(setTestSelectedTopics(updatedSections));
  };

  useEffect(() => {
    let test = JSON.parse(localStorage.getItem("testDetails"));
    dispatch(
      getAllTopics({
        level: level,
        category: test.category,
        accessibleDepartments: test.accessibleDepartments,
        hasAccessToAllDepartments: test.hasAccessToAllDepartments,
        hasAccessToAllCategories: test.hasAccessToAllCategories,
      })
    );

    if (sections) {
      setFilteredSections(sections);
    }

    try {
      topics = JSON.parse(localStorage.getItem("topics"));

      setSelectedSections(topics);
    } catch (error) {}

    // //console.log("hello tests",sections);
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
    <div className={` ${visible ? "h-screen overflow-hidden" : ""}`}>
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

      <div className="bg-white min-h-[90vh] mx-auto">
        <h2 className="w-full text-lg font-medium text-[#7D7D7D] mt-10 mb-3 font-dmSans">
          Your Assessment can include up to 5 Question topics, browse the below
          library to draft the Assessment.{" "}
        </h2>

        <div className="mb-5 md:mb-10 rounded-md grid sm:grid-cols-5 grid-cols-2 gap-5">
          {selectedSections?.map((section, index) => (
            <div
              className="w-full h-full border border-dashed rounded-md border-blued col-span-1 p-2 md:p-5"
              key={`${section._id + section.Type}`}
            >
              {/* {//console.log(section, "section")} */}

              <div className="flex gap-2 flex-col">
                <h2 className="text-xl font-bold line-clamp-2 break-words">
                  {section?.Heading}
                </h2>

                <div className="flex gap-2">
                  <img
                    src="/images/icons/menu-boxed.png"
                    alt="icon"
                    className="w-6 h-6 self-center"
                  />

                  <h2 className="font-bold text-sm text-gray-400 self-center">
                    {section?.Type}
                  </h2>
                </div>

                <div className="flex justify-between">
                  {" "}
                  <div className="flex gap-2 w-full">
                    {/* <img
                      src="/images/icons/stopwatch.png"
                      alt="icon"
                      className="w-6 h-6 self-center"
                    /> */}
                    <span className="self-center">
                      Count : {section?.questions?.length / 2}
                    </span>
                    <h2 className="font-bold text-sm text-gray-400 self-center">
                      {section?.Time}
                    </h2>
                  </div>
                  <img
                    src="/images/icons/cross.png"
                    alt="icon"
                    onClick={() => removeSection(section, index)}
                  />
                </div>
              </div>
            </div>
          ))}

          {selectedSections?.length < 5
            ? Array.from({ length: 5 - selectedSections.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-full h-full border border-dashed rounded-md border-blued col-span-1 flex justify-center p-2 md:p-5"
                  >
                    <div className="self-center">
                      <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

                      <h2 className="font-semibold mt-1">
                        Add section {selectedSections.length + index + 1}{" "}
                      </h2>
                    </div>
                  </div>
                )
              )
            : null}

          {/* <div className="w-full h-32 border border-dashed rounded-md border-blued col-span-1 flex justify-center ">

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
        <div className="w-full  mx-auto my-4 p-4 bg-blue-100 border-l-4 border-blued text-blue-700">
          <Disclosure defaultOpen className="w-full">
            {({ open }) => (
              <div className="w-full">
                <Disclosure.Button className="w-full px-4 py-2 text-left text-lg font-semibold bg-blue-200 hover:bg-blue-300 rounded">
                  {open ? "Hide Instructions" : "Show Instructions"}
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4 w-full">
                  <h3 className="text-lg font-semibold">
                    How calculation of total questions needed/selected is done:
                  </h3>
                  <p className="mt-2">
                    <div>
                      <span className="font-bold"> n</span> = the number you
                      select when you add a topic
                    </div>
                    <div>
                      <span className="font-bold">
                        {" "}
                        Number of question for each type:
                      </span>{" "}
                    </div>
                    <span className="font-bold"> Beginner (n)</span>,{" "}
                    <span className="font-bold">Intermediate (n x 2/3)</span>,
                    and
                    <span className="font-bold"> Advanced (n/3)</span>. This
                    approach will create a valid adaptive assessment.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Example:</h4>
                    <ul className="list-disc list-inside mt-2">
                      <li>
                        Double the total number of questions:{" "}
                        <span className="font-bold">30 x 2 = 60</span>
                      </li>
                      <li>
                        Beginner:{" "}
                        <span className="font-bold">30 questions</span>
                      </li>
                      <li>
                        Intermediate:{" "}
                        <span className="font-bold">20 questions</span>
                      </li>
                      <li>
                        Advanced:{" "}
                        <span className="font-bold">10 questions</span>
                      </li>
                    </ul>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>

        <div className="grid grid-cols-4 gap-8 justify-center">
          <div className="w-full bg-gray-100 rounded-md flex justify-center p-5">
            <div className=" self-center w-fit h-fit ">
              <div
                className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-md mx-auto flex justify-center"
                onClick={() => {
                  localStorage.removeItem("currentTopic");
                  if (isUni()) {
                    Navigate("/university/pr/test/createTopic?level=adaptive");
                  } else {
                    Navigate("/college/test/createTopic?level=adaptive");
                  }
                }}
              >
                <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blued" />
              </div>

              <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60">
                Add New Topic
              </h2>

              <h2 className="text-sm text-center text-gray-400">
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

            <div className="w-full rounded-md bg-gray-100  relative p-5">
              <div className="overflow-y-auto">
                <h2 className="text-xl font-bold mb-2 break-words">
                  {section?.Heading}
                </h2>

                <p className="text-sm leading-[26px] text-[#8F92A1] break-words h-full md:h-40 mb-2">
                  {section?.Description?.length > 150
                    ? section?.Description?.slice(0, 150) + "..."
                    : section?.Description}
                </p>

                <div className="flex justify-between mb-2">
                  <button
                    className="w-[90px] h-[40px] bg-[#8F92A120] rounded-xl"
                    onClick={() => {
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
                      if (isUni()) {
                        Navigate(
                          `/university/pr/test/details/${index}?type=topic&question=${questionType}&level=adaptive`
                        );
                      } else {
                        Navigate(
                          `/college/test/details/${index}?type=topic&question=${questionType}&level=adaptive`
                        );
                      }
                    }}
                  >
                    Details
                  </button>

                  <button
                    className=" bg-[#00875A85] h-[40px] w-[72px] rounded-xl text-white tooltip"
                    data-tip="n"
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
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default SelectTests;
