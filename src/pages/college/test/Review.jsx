import React, { useEffect, useState } from "react";
import Header from "../../../components/college/test/review/Header";
import { LiaStopwatchSolid } from "react-icons/lia";
import Mcq from "../../../components/college/test/review/Mcq";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import FindAnswer from "../../../components/college/test/review/FindAnswer";
import Essay from "../../../components/college/test/review/Essay";
import Code from "../../../components/college/test/review/Code";
import Video from "../../../components/college/test/review/Video";
import { getTopicById } from "../../../redux/college/test/thunks/topic";
import Loader from "../../../components/loaders/Loader";
import { setCurrentQuestionCount, setTestSelectedTopics } from "../../../redux/college/test/testSlice";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const Review = () => {
  //useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [questions, setQuestions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const select = searchParams.get("select");

  const questionType = searchParams.get("question");
  const level = searchParams.get("level");
  const view = searchParams.get("view");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentTopic, topics, currentQuestionCount, totalQuestions } = useSelector((state) => state.test);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [count, setCount] = useState(selectedQuestions.length);


  let sections = localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [];

  // Handle individual question selection
  const handleQuestionSelect = (question) => {
    setSelectedQuestions((prev) => {
      const isSelected = prev.some((q) => JSON.stringify(q) === JSON.stringify(question));

      if (isSelected) {
        // Remove the question if it exists in the selectedQuestions array
        return prev.filter((q) => JSON.stringify(q) !== JSON.stringify(question));
      } else {

        const topicIndex = sections.findIndex(
          (section) => section.Type === questionType && section.id === currentTopic.id // Use an identifier like `id`
        );
        let newCount = 0;
        if (topicIndex !== -1) {
          newCount = currentQuestionCount - count + selectedQuestions.length + 1;
          console.log(newCount, "newCount", currentQuestionCount, "currentQuestionCount", count, "count", selectedQuestions.length, "selectedQuestions.length");
        } else {
          newCount = parseInt(currentQuestionCount) - count + selectedQuestions.length + 1; // Add 1 for the new question
        }
        // console.log(newCount, "newCount", totalQuestions, "totalQuestions", count, "count", selectedQuestions.length, "selectedQuestions.length");

        if (newCount > parseInt(totalQuestions)) {
          toast.error(`Number of questions must be less than or equal to  ${totalQuestions}`);
          return prev; // Do not add the question if the limit is exceeded
        }
        // Add the question to the selectedQuestions array
        return [...prev, JSON.parse(JSON.stringify(question))];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    const selectedCount = selectedQuestions.length;

    // Calculate the new total count if all questions are selected

    // Check if the topic already exists
    const topicIndex = sections.findIndex(
      (section) => section.Type === questionType && section.id === currentTopic.id // Use an identifier like `id`
    );
    let newTotalCount = 0;
    if (topicIndex !== -1) {
      newTotalCount = currentQuestionCount - selectedCount + questions.length;
    } else {
      newTotalCount = currentQuestionCount + questions.length
    }

    console.log(newTotalCount, "<-newTotalCount", currentQuestionCount, "<-currentQuestionCount", selectedCount, "<-selectedCount", questions.length, "<-questions.length");
    if (selectedCount === questions.length) {
      // Deselect all
      setSelectedQuestions([]);
    } else if (newTotalCount > parseInt(totalQuestions)) {
      toast.error(`Number of questions must be less than or equal to ${totalQuestions}`);
    } else {
      // Select all
      setSelectedQuestions(questions);
    }
  };


  const QuestionCheckbox = ({ question }) => {
    const isQuestionSelected = selectedQuestions.some(
      (q) => JSON.stringify(q) === JSON.stringify(question)
    );

    const handleCheckboxChange = () => {
      handleQuestionSelect(
        JSON.parse(JSON.stringify(question)) // Ensures the exact object structure
      );
    };

    return (
      <div className="absolute left-4 top-4">
        <input
          type="checkbox"
          checked={isQuestionSelected}
          onChange={handleCheckboxChange}
          className="h-5 w-5 rounded border-gray-300"
        />
      </div>
    );
  };



  useEffect(() => {
    handleTopics();


  }, [topics, currentTopic]);


  async function handleTopics() {

    let typeIf;

    if (questionType === "mcq") {
      typeIf = "questions";
    } else if (questionType === "findAnswer") {
      typeIf = "findAnswers";
    } else {
      typeIf = questionType;
    }

    try {
      if (type === "section") {

        console.log(topics[id]);
        // const topics = JSON.parse(localStorage.getItem("topics"));
        setName(topics[id].Heading);

        if (questionType === "mcq") {
          if (select) {
            console.log(topics[id].questions);
            setQuestions(
              currentTopic.questions.filter(q => {
                console.log(q);
                // Compare by a unique identifier like 'id' or '_id'
                return !topics[id].questions.some(tq => tq._id === q._id);
              })
            );
          } else {
            setQuestions(topics[id].questions);
          }
        };

        questionType === "findAnswer" && setQuestions(topics[id].findAnswers);
        questionType === "essay" && setQuestions(topics[id].essay);
        questionType === "video" && setQuestions(topics[id].video);
        questionType === "compiler" && setQuestions(topics[id].compiler);

      } else if (type === "topic") {

        const req = await dispatch(getTopicById({ id: id, level }));

        const isPresent = topics.filter((topic) => topic._id === id);

        setName(currentTopic.Heading);
        questionType === "mcq" && setQuestions(currentTopic.questions);
        questionType === "findAnswer" && setQuestions(currentTopic.findAnswers);
        questionType === "essay" && setQuestions(currentTopic.essay);
        questionType === "video" && setQuestions(currentTopic.video);
        questionType === "compiler" && setQuestions(currentTopic.compiler);

        console.log(isPresent, "isPresent");
        if (isPresent && isPresent?.length > 0 && isPresent[0][typeIf]?.length > 0) {
          setSelectedQuestions(isPresent[0][typeIf]);
          setCount(isPresent[0][typeIf].length);
          console.log(isPresent[0][typeIf], "isPresent");
        }

      } else {
        setName(
          JSON.parse(localStorage.getItem("assessment")).topics[id].Heading
        );
        questionType === "mcq" &&
          setQuestions(
            JSON.parse(localStorage.getItem("assessment")).topics[id].questions
          );
        questionType === "findAnswer" &&
          setQuestions(
            JSON.parse(localStorage.getItem("assessment")).topics[id].findAnswers
          );
        questionType === "essay" &&
          setQuestions(
            JSON.parse(localStorage.getItem("assessment")).topics[id].essay
          );
        questionType === "video" &&
          setQuestions(
            JSON.parse(localStorage.getItem("assessment")).topics[id].video
          );
        questionType === "compiler" &&
          setQuestions(
            JSON.parse(localStorage.getItem("assessment")).topics[id].compiler
          );
      }
    } catch (error) {
      console.log(error);
    }

  }


  const handleCalculateTime = () => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;

    if (type === "topic") {
      if (currentTopic.Type === "essay") {
        totalEssay += currentTopic.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "video") {
        totalVideo += currentTopic.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "compiler") {
        totalCompiler += currentTopic.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (currentTopic.Type === "findAnswer") {
        totalFindAnswer += currentTopic.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (currentTopic.Type === "mcq") {
        totalMcq += currentTopic.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
    } else if (type === "section") {
      const section = topics[id];

      if (section.Type === "essay") {
        totalEssay += section.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "video") {
        totalVideo += section.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "compiler") {
        totalCompiler += section.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (section.Type === "findAnswer") {
        totalFindAnswer += section.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (section.Type === "mcq") {
        totalMcq += section.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
    }

    const total =
      totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;

    return total;
  };

  const addToSection = () => {

    try {
      if (type === "section") {
        if (selectedQuestions.length === 0) {
          toast.error("Please select questions to add to section");
          return;
        }

        if (
          parseInt(currentQuestionCount) + selectedQuestions.length >
          parseInt(totalQuestions)
        ) {
          toast.error(`Number of question must be less than or equal to ${totalQuestions}`);
          return;
        }

        let typeIf;
        if (questionType === "mcq") {
          typeIf = "questions";
        } else if (questionType === "findAnswer") {
          typeIf = "findAnswers";
        } else {
          typeIf = questionType;
        }
        {
          let topicsCopy = JSON.parse(JSON.stringify(topics));
          topicsCopy[id][typeIf] = [...topicsCopy[id][typeIf], ...selectedQuestions];
          dispatch(
            setCurrentQuestionCount(currentQuestionCount + selectedQuestions.length)
          );
          dispatch(setTestSelectedTopics(topicsCopy));
          console.log(topicsCopy, "topicsCopy");
          const newParams = new URLSearchParams(searchParams);

          // Remove the "select" parameter
          newParams.delete("select");

          // Update the URL with the new search params
          setSearchParams(newParams);

        }
      } else {
        let sectionCopy = { ...currentTopic, Type: questionType };

        let typeIf;
        if (questionType === "mcq") {
          typeIf = "questions";
        } else if (questionType === "findAnswer") {
          typeIf = "findAnswers";
        } else {
          typeIf = questionType;
        }

        // Check if the topic already exists
        const topicIndex = sections.findIndex(
          (section) => section.Type === questionType && section._id === currentTopic._id
        );
        console.log(topicIndex, "topicIndex");
        if (topicIndex !== -1) {
          // Topic exists, replace questions
          const existingCount = sections[topicIndex][typeIf]?.length || 0;
          const newQuestionCount =
            currentQuestionCount - existingCount + selectedQuestions.length;
          console.log(newQuestionCount, "newQuestionCount", parseInt(totalQuestions), "totalQuestions");
          if (newQuestionCount > parseInt(totalQuestions)) {
            toast.error(`Number of questions must be less than or equal to ${totalQuestions}`);
            return;
          }

          // Replace the questions for the topic
          sections[topicIndex][typeIf] = selectedQuestions;
          dispatch(setCurrentQuestionCount(newQuestionCount));
          dispatch(setTestSelectedTopics([...sections]));
        } else {
          // Topic doesn't exist, add it
          sectionCopy[typeIf] = selectedQuestions;
          dispatch(setCurrentQuestionCount(currentQuestionCount + selectedQuestions.length));
          dispatch(setTestSelectedTopics([...sections, sectionCopy]));
        }

        navigate(-1);

      }
    } catch (error) {
      console.log(error);
    }
  }
  const [noQuestionsMessage, setNoQuestionsMessage] = useState("");

  // useEffect(() => {
  //   // Other code...

  //   // Set message if no questions are present for the type
  //   if (questions?.length === 0) {
  //     setNoQuestionsMessage(`No ${questionType} questions found.`);
  //   } else {
  //     setNoQuestionsMessage("");
  //   }
  // }, [questions]);
  const totalTime = handleCalculateTime();
  return (
    <>
      <Header
        name={name}
        view={view}
        qt={questionType}
        id={
          localStorage.getItem("Topics")
            ? JSON.parse(localStorage.getItem("Topics"))._id
            : ""
        }
        handleTopics={handleTopics}
        visible={visible}
        setVisible={setVisible}
        type={type}
        topicId={searchParams.get("topicId")}
        sectionId={localStorage.getItem("Details") ? currentTopic._id : ""}
      />

      {loading ? (<Loader />) : (<div
        className={`mx-auto p-5 min-h-[80vh] my-2 rounded-lg   bg-gray-100  ${visible && "h-[80vh] overflow-hidden"
          }`}
      >
        <div className="flex justify-between mb-5">
          <span className="flex gap-2 items-center">
            <h2 className="capitalize text-lg">{questionType}</h2>
            <div className="flex gap-1 items-center ">
              <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
              <p className="text-gray-400 text-xs self-center">
                {totalTime} mins
              </p>
            </div>
          </span>
          {/* <span className="flex">
            <input
              type="checkbox"
              name="delete"
              className="self-center bg-[#DEEBFF] border-none rounded-md"
            />
            <label for="delete" className="pl-2">
              Delete Selected
            </label>
          </span> */}
        </div>

        {(questions?.length > 0 && select) && (

          <div className="flex justify-between">

            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox"
                checked={selectedQuestions.length === questions.length && questions.length > 0}
                onChange={handleSelectAll}
                className="h-5 w-5 rounded border-gray-300"
              />
              <span className="text-sm font-medium">
                Select All ({selectedQuestions.length}/{questions.length})
              </span>



            </div>

            <button
              className="self-center justify-center flex bg-blued my-6 p-2 text-white hover:bg-cyan-600 rounded-xl w-32  gap-2 "
              onClick={addToSection}
            >
              <FiPlus className="self-center text-lg " /> Add
            </button>
          </div>

        )}

        {noQuestionsMessage && (
          <div className="text-red-500 text-center">{noQuestionsMessage}</div>
        )}

        {questionType === "mcq" ? (
          questions?.length > 0 ? (
            [...questions]
              .sort((a, b) => {
                const levelsOrder = ["beginner", "intermediate", "advanced"];
                const levelAIndex = levelsOrder.indexOf(a.QuestionLevel);
                const levelBIndex = levelsOrder.indexOf(b.QuestionLevel);
                return levelAIndex - levelBIndex;
              })
              .map((question, i) => (
                <div key={i} className="relative">
                  {select && <QuestionCheckbox question={question} />}
                  <div className="pl-12">
                    <Mcq
                      view={view}
                      type={type}
                      id={id}
                      Number={i}
                      reset={() => handleTopics()}
                      question={question}
                      Title={question.Title}
                      Options={question.Options}
                      AnswerIndex={question.AnswerIndex}
                    />
                  </div>
                </div>
              ))
          ) : null
        ) : questionType === "findAnswer" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => (
              <div key={i} className="relative">
                {select && <QuestionCheckbox question={question} />}
                <div className="pl-12">
                  <FindAnswer
                    view={view}
                    type={type}
                    id={id}
                    Number={i}
                    question={question}
                    Title={question?.Title || ""}
                    Options={question?.questions || []}
                  />
                </div>
              </div>
            ))
          ) : null
        ) : questionType === "essay" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => (
              <div key={i} className="relative">
                {select && <QuestionCheckbox question={question} />}
                <div className="pl-12">
                  <Essay
                    Number={i}
                    Title={question?.Title || ""}
                    id={id}
                    view={view}
                    type={type}
                    question={question}
                  />
                </div>
              </div>
            ))
          ) : null
        ) : questionType === "compiler" ? (
          questions?.length > 0 ? (
            questions.map((question, i) => (
              <div key={i} className="relative">
                {select && <QuestionCheckbox question={question} />}
                <div className="pl-12">
                  <Code
                    view={view}
                    type={type}
                    id={id}
                    Number={i}
                    Title={question?.codeQuestion || ""}
                    code={question?.code}
                    question={question}
                  />
                </div>
              </div>
            ))
          ) : null
        ) : questions?.length > 0 ? (
          questions.map((question, i) => (
            <div key={i} className="relative">
              {select && <QuestionCheckbox question={question} />}
              <div className="pl-12">
                <Video
                  Number={i}
                  id={id}
                  video={question}
                  view={view}
                  type={type}
                  question={question}
                />
              </div>
            </div>
          ))
        ) : null}

        {questions?.length === 0 && <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-center">No Questions Found, Add Questions to this topic</p>
        </div>}
      </div>)}
    </>
  );
};

export default Review;




