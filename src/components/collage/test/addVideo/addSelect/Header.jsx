import React from "react";

import { FaChevronLeft } from "react-icons/fa";

import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import {
  addVideoToSection,
  clearTopicToBeAdded,
} from "../../../../../redux/collage/test/testSlice";
import { addQuestionToTopic } from "../../../../../redux/collage/test/thunks/topic";

const Header = ({ selectQuestionType }) => {
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
    console.log(Duration);
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

    console.log(searchParam.get("section"));
    if (searchParam.get("section") !== "null") {
      dispatch(addVideoToSection({ data: vid, index: id }));
      if (totalLength === 0) {
        toast.error("no questions");
      } else {
        navigate(
          `/collage/test/details/${id}?type=section&question=video&topicId=${searchParam.get(
            "section"
          )}&view=false&level=${level}`
        );
      }
    } else {
      dispatch(
        addQuestionToTopic({
          data: vid,
          id: id,
          type: "video",
        })
      ).then((res) => {
        localStorage.setItem(
          "TopicToBeAdded",
          JSON.stringify(updatedTopicToBeAdded)
        );
        console.log(res);
        if (totalLength === 0) {
          toast.error("Please add questions to the assessment");
          return;
        } else {
          navigate(`/collage/test/typeOfQuestions/${id}?level=${level}`);
        }
        //           navigate(`/collage/test/select`);
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
    //     console.log(res);

    //     navigate(
    //       `/collage/test/${id}?type=section&question=video&topicId=${searchParam.get(
    //         "section"
    //       )}&view=true`
    //     );
    //   })
  };

  const navigate = useNavigate();

  //   const NavHandler = () => {
  //     switch (selectQuestionType) {
  //       case "mcq":
  //         navigate(`/collage/test/video/${id}/addmcq`);

  //         break;

  //       case "short":
  //         navigate(`/collage/test/video/shortlong/${id}?length=short`);

  //         break;

  //       case "long":
  //         navigate(`/collage/test/video/shortlong/${id}?length=long`);

  //         break;

  //       default:
  //         window.alert("please select field");

  //         break;
  //     }
  //   };

  return (
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center ml-2 rounded-lg  gap-2">
          <button
            onClick={() =>
              level === "adaptive"
                ? navigate("/collage/test/selectAdaptive?level=adaptive")
                : navigate(-1)
            }
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans ">
              Create Assessment
            </h2>
            {/* 
            <div className="flex gap-2 text-[#567BF9] text-xs font-medium mt-3">
              <h3 className="mr-2">Untitiled Assessments</h3>
              <span>
                <img
                  src="../../../../images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2">0 Tests</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="../../../../images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>Add Questions</h3>
            </div> */}
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-blue-800 py-3 px-4 rounded-lg text-xs gap-2 text-white"
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
