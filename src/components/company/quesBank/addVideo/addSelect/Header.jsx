import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addVideoToSection,
  clearTopicToBeAdded,
} from "../../../../../redux/college/test/testSlice";
import { addQuestionToTopic } from "../../../../../redux/college/test/thunks/topic";

const Header = ({ selectQuestionType }) => {
  const { id } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();

  const dispatch = useDispatch();
  let ID;
  searchParam.get("topicId") !== null
    ? (ID = searchParam.get("topicId"))
    : (ID = id);
  const topicToBeAdded = useSelector((state) => state.test.TopicToBeAdded);

  const [question, setQuestion] = useState({
    level: searchParam.get("level") || "beginner",
  });

  const handleChanges = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    const updatedTopicToBeAdded = {
      ...topicToBeAdded,

      video: {
        videoFile: "", // Set video link to an empty string
        questions: [], // Set questions to an empty array
        long: [],
        short: [],
        // Add other properties if needed
      },
    };

    let mcq;
    if (topicToBeAdded.video.questions?.length > 0) {
      mcq = topicToBeAdded.video.questions.reduce((acc, question) => {
        return acc + parseInt(question.Duration);
      }, 0);
    } else {
      mcq = 0;
    }

    let long;
    if (topicToBeAdded.video.long?.length > 0) {
      long = topicToBeAdded.video?.long?.reduce((acc, question) => {
        return acc + parseInt(question.Duration);
      }, 0);
    } else {
      long = 0;
    }

    let short;
    if (topicToBeAdded.video.short?.length > 0) {
      short = topicToBeAdded.video?.short?.reduce((acc, question) => {
        return acc + parseInt(question.Duration);
      }, 0);
    } else {
      short = 0;
    }

    let Duration = mcq + long + short;
    // //console.log(Duration);

    const vid = {
      ...topicToBeAdded.video,
      QuestionLevel: question.level,
      Duration: Duration,
      id: ID,
      section:
        searchParam.get("section") !== "null" ? searchParam.get("section") : id,
    };

    const totalLength =
      vid.questions.length + vid.long.length + vid.short.length;
    dispatch(clearTopicToBeAdded());

    // //console.log(searchParam.get("section"));
    if (searchParam.get("section") !== "null") {
      dispatch(addVideoToSection({ data: vid, index: id }));
      if (totalLength === 0) {
        toast.error("no questions");
      } else {
        navigate(
          `/college/test/details/${id}?type=section&question=video&topicId=${searchParam.get(
            "section"
          )}&view=false`
        );
      }
    } else {
      dispatch(
        addQuestionToTopic({
          QuestionLevel: question.level,
          data: vid,
          id: id,
          type: "video",
        })
      ).then((res) => {
        localStorage.setItem(
          "TopicToBeAdded",
          JSON.stringify(updatedTopicToBeAdded)
        );
        // //console.log(res);
        if (totalLength === 0) {
          toast.error("Please add questions to the assessment");
          return;
        } else {
          navigate(`/college/quesBank/typeOfQuestions/${id}`);
        }
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-between mb-5 w-full">
      <div className="flex  mb-5 w-1/2">
        <button onClick={() => navigate(-1)} className="mr-3">
          <FaChevronLeft className="p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
        </button>
        <div className="flex justify-between w-full">
          <h2 className="sm:text-xl text-left font-bold self-center text-3xl font-dmSans">
            Create Assessment
          </h2>
          <select
            name="level"
            onChange={handleChanges}
            value={question.level}
            className="w-1/2 rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E]"
          >
            <option value="">Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-100 rounded-xl mx-2 h-12 flex my-2">
        <div className="flex">
          <button
            className="self-center justify-center flex bg-blued py-3 px-4 rounded-lg text-xs gap-2 text-white"
            onClick={submit}
          >
            Next Step{" "}
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
