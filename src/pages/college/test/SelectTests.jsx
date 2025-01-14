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
import Loader from "../../../components/loaders/Loader";
import isCompany, { getEntity, isUni } from "../../../util/isCompany";
import CommonHeader from "../../../components/CommonHeader";



const AddTopic = ({ Navigate, level }) => (
  <div className="w-full max-w-64 h-64 bg-gray-100 rounded-md flex justify-center">
    <div className=" self-center w-fit h-fit ">
      <div
        className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-md mx-auto flex justify-center"
        onClick={() => {
          localStorage.removeItem("currentTopic");
          Navigate(
            `/${isUni() ? "university/pr" : "college"
            }/test/createTopic?level=${level}`
          );
        }}
      >
        <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blued cursor-pointer" />
      </div>

      <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60 ">
        Add New Topic
      </h2>

      <h2 className="text-sm text-center text-gray-400">Create new Topics</h2>
    </div>
  </div>
);

const SelectTests = () => {


  //useTranslate();
  const [visible, setVisible] = useState(false);
  const [totalQ, setTotalQ] = useState(0);
  const [qType, setQType] = useState("questions");
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");
  const [questionType, setQuestionType] = useState("");
  const [section, setSection] = useState({});

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const { sections, currentQuestionCount, totalQuestions, GET_TOPICS_LOADING } =
    useSelector((state) => state.test);
  const entity = isUni() ? "university/pr" : isCompany() ? "company/pr" : "college";
  // for filter the sections

  const [filteredSections, setFilteredSections] = useState([]);

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
    if (
      parseInt(currentQuestionCount) + parseInt(totalQ) >
      parseInt(totalQuestions) ||
      totalQ > totalQuestions
    ) {
      toast.error(
        `Number of question must be less than or equal to ${totalQuestions}`
      );
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
        }
      }

      let sectionCopy = { ...section, Type: questionType };

      // sectionCopy[Type] ="mcq";
      // //console.log(section);
      // //console.log(sectionCopy);

      switch (questionType) {
        case "mcq":
          setQType("questions");
          break;
        case "essay":
          setQType("essay");
          break;
        case "findAnswer":
          setQType("findAnswers");
          break;
        case "video":
          setQType("video");
          break;
        case "compiler":
          setQType("compiler");
          break;
        default:
          break;
      }
      let typeIf;
      if (questionType === "mcq") {
        typeIf = "questions";
      } else if (questionType === "findAnswer") {
        typeIf = "findAnswers";
      } else {
        typeIf = questionType;
      }
      const shuffleArray = (array) => {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          // for (let i = totalQ; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      //console.log(
      //   sectionCopy[qType]?.length,
      //   parseInt(totalQ),
      //   qType,
      //   questionType
      // );
      if (sectionCopy[typeIf]?.length < parseInt(totalQ)) {
        toast.error("insufficient number of questions");
        return;
      } else {
        // <<<<<<< saveMainCopy
        sectionCopy[typeIf] = shuffleArray(sectionCopy[typeIf]).slice(
          0,
          parseInt(totalQ)
        );
        //console.log(sectionCopy, totalQ);
        // =======
        //         //console.log("totalQ : ", totalQ)
        //         sectionCopy[qType] = shuffleArray(sectionCopy[qType]).slice(0, totalQ);
        // >>>>>>> saveMain
        dispatch(
          setCurrentQuestionCount(currentQuestionCount + parseInt(totalQ))
        );
        setSelectedSections([...selectedSections, sectionCopy]);
        dispatch(setTestSelectedTopics(selectedSections));
      }
      // setSelectedSections([...selectedSections, sectionCopy]);

      //   dispatch(

      //     setTest({

      //       sections: selectedSections,

      //     })

      //   );

      // dispatch(setTestSelectedTopics(selectedSections));
    }

    // dispatch(setSections(sections.filter((s) => s !== section)));

    // //console.log(updatedSections);
  };
  //console.log(selectedSections?.length);
  const getSectionName = (name) => {
    let Qt = "name";
    switch (name) {

      case "mcq":
        Qt = "Multiple Choice Questions";
        break;
      case "essay":
        Qt = "essay";
        break;
      case "findAnswer":
        Qt = "findAnswers";
        break;
      case "video":
        Qt = "video";
        break;
      case "compiler":
        Qt = "compiler";
        break;
      default:
        break;

        return Qt
    }
  }

  const removeSection = (section, index) => {
    let Qt;
    //console.log(selectedSections[index].Type);
    switch (selectedSections[index].Type) {
      case "mcq":
        Qt = "questions";
        break;
      case "essay":
        Qt = "essay";
        break;
      case "findAnswer":
        Qt = "findAnswers";
        break;
      case "video":
        Qt = "video";
        break;
      case "compiler":
        Qt = "compiler";
        break;
      default:
        break;
    }
    const updatedSections = [...selectedSections];

    updatedSections.splice(index, 1);

    setSelectedSections(updatedSections);
    // //console.log(selectedSections[index][Qt].length);
    dispatch(setTestSelectedTopics(updatedSections));
    dispatch(
      setCurrentQuestionCount(
        currentQuestionCount - selectedSections[index][Qt].length
      )
    );
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
    } catch (error) { }

    // //console.log("hello tests",sections);
  }, []);

  const handleSubmit = () => {
    if (topics.length === 0) {
      toast.error("Please select atleast one topic to proceed");
      return;
    }
    Navigate(`/${getEntity()}/test/questions?level=${level}`);

  };

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
    <>
      {visible && (
        <PopUpAdaptive
          // manual={true}
          // selectManual={() => { Navigate(`/${isUni() ? "university/pr" : "college"}/test/details/${section._id}?type=topic&question=${questionType}&level=${level}`) }}
          section={section}
          visible={visible}
          handleSave={addSection}
          handleOverlay={() => {
            setVisible(false);
          }}
          addSection={addSection}
          totalQ={totalQ}
          setTotalQ={setTotalQ}
        // setTotalQuestions={setTotalQuestions}
        // totalQuestions={totalQuestions}
        />
      )}
      <CommonHeader backPath={`/${getEntity()}/test/name?level=${level}`} title="Select Topics" handleNext={handleSubmit} />

      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      {/* larger screens */}

      <div className="min-h-[90vh] my-2 rounded-md tracking-wide justify-between  ">
        <h2 className=" text-gray-400 sm:h-10 py-2 sm:mt-12  mt-4 rounded-md mb-10 sm:mb-1 ">
          Your Assessment can include up to 5 Question topics, browse the below
          library to draft the Assessment.{" "}
        </h2>

        <div className=" mx-auto  my-2 rounded-md grid sm:grid-cols-5 grid-cols-2 gap-6">
          {selectedSections?.map((section, index) => (
            <div
              className="w-full h-32 border border-dashed rounded-md border-blued col-span-1 flex justify-center "
              key={`${section._id + section.Type}`}
            >
              {/* {//console.log(section, "section")} */}

              <span className="self-center">
                <h2 className="text-xl font-bold px-2 line-clamp-2 break-words">
                  {section?.Heading}
                </h2>

                <div className="flex gap-2 px-2">
                  <img
                    src="/images/icons/menu-boxed.png"
                    alt="icon"
                    className="self-center"
                  />

                  <h2 className="font-bold text-sm text-gray-400 self-center ">
                    {getSectionName(section?.Type)}
                  </h2>
                </div>

                <div className="flex justify-between mt-1">
                  {" "}
                  <div className="flex gap-2 w-full px-2">
                    <img
                      src="/images/icons/stopwatch.png"
                      alt="icon"
                      className="w-6 h-6 self-center"
                    />

                    <h2 className="font-bold text-sm text-gray-400 self-center px-2">
                      {section?.Time}
                    </h2>
                  </div>
                  <img
                    src="/images/icons/cross.png"
                    alt="icons"
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
                  className="w-full h-full border border-dashed rounded-md border-blued col-span-1 flex justify-center p-2 md:p-5"
                >
                  <span className="self-center">
                    <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

                    <h2 className="font-semibold mt-1">
                      Add section {selectedSections.length + index + 1}{" "}
                    </h2>
                  </span>
                </div>
              )
            )
            : null}
        </div>

        <Inputs
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleFilter={handleFilterSections}
          type={""}
        />

        <div className="grid grid-cols-4 gap-8 justify-center">
          {filteredSections?.length > 0 && (
            <AddTopic Navigate={Navigate} level={level} />
          )}
          {GET_TOPICS_LOADING && (
            <div className=" min-h-64 rounded-md flex items-center  justify-center ">
              <Loader size="md" />
            </div>
          )}
          {filteredSections?.map((section, index) => (
            <div className="p-5 flex flex-col justify-between bg-gray-100  rounded-md min-h-64 overflow-y-scroll">
              <div>
                <h2 className="text-base text-[#171717] font-semibold mb-2 first-letter:uppercase line-clamp-2 break-words min-h-12">
                  {section?.Heading}
                </h2>
                <p className="text-sm font-normal text-[#8F92A1] first-letter:uppercase line-clamp-4">
                  {section?.Description?.length > 150
                    ? section?.Description?.slice(0, 150) + "..."
                    : section?.Description}
                </p>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  className="py-2 px-4  bg-[#8F92A120] rounded-md"
                  onClick={() => {
                    if (!questionType) {
                      toast.error("Please select a question type first.");
                      return;
                    }
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
                      `/${entity}/test/details/${section._id
                      }?type=topic&question=${questionType}&level=${level}&select=true`
                    );
                  }}
                >
                  Details
                </button>
                <button
                  className=" bg-[#00875A85] py-2 px-4 rounded-md text-white "
                  onClick={() => {
                    if (!questionType) {
                      toast.error("Please select a question type first.");
                      return;
                    }
                    if (selectedSections?.length === 5) {
                      toast.error(
                        "Please remove one from added section to add this topic's question"
                      );
                      return;
                    }
                    // //console.log(section);
                    setSection(section);
                    setVisible(true);
                  }}
                >
                  Add
                </button>
              </div>{" "}
            </div>
          ))}
        </div>
        {filteredSections?.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center text-gray-400 self-center mx-auto text-2xl my-10">
              No topics found
            </div>
            <AddTopic Navigate={Navigate} level={level} />
          </div>
        )}
      </div>
    </>
  );
};

export default SelectTests;
