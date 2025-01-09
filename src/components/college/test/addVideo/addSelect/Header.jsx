import React from "react";

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
import { isUni } from "../../../../../util/isCompany";

const Header = ({ selectQuestionType }) => {
  const entity = isUni() ? "university/pr" : "college";

  const { id } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const level = searchParam.get("level");
  const dispatch = useDispatch();
  let ID;
  searchParam.get("topicId") !== null
    ? (ID = searchParam.get("topicId"))
    : (ID = id);
  const topicToBeAdded = useSelector((state) => state.test.TopicToBeAdded);
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
    if (topicToBeAdded.video.long?.length > 0) {
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
      QuestionLevel: level,
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
          `/${entity}/test/details/${id}?type=section&question=video&topicId=${searchParam.get(
            "section"
          )}&view=false&level=${level}`
        );
      }
    } else {
      dispatch(
        addQuestionToTopic({
          QuestionLevel: level,
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
          navigate(`/${entity}/test/typeOfQuestions/${id}?level=${level}`);
        }
        //           navigate(`/${entity}/test/select`);
      });
    }
    //  dispatch(
    //     addQuestionToTopic({
    //       index: id,
    //       data: vid,
    //       id: searchParam.get("section"),
    //       type: "video",
    //     })
    //   ).then((res) => {
    //     localStorage.setItem(
    //       "TopicToBeAdded",
    //       JSON.stringify(updatedTopicToBeAdded)
    //     );
    //     //console.log(res);

    //     navigate(
    //       `/${entity}/test/${id}?type=section&question=video&topicId=${searchParam.get(
    //         "section"
    //       )}&view=true`
    //     );
    //   })
  };

  const navigate = useNavigate();

  return (
    <div className="flex  justify-between mb-2 ">
      <div>
        <button className="flex items-center ml-2 rounded-md  gap-2">
          <button
            onClick={() =>
              level === "adaptive"
                ? navigate(`/${entity}/test/selectAdaptive?level=adaptive`)
                : navigate(-1)
            }
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-md h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans ">
              Create Assessment
            </h2>
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-blued py-3 px-4 rounded-md text-sm gap-2 text-white"
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
