import React, { useEffect } from "react";

import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";

import { FaArrowRightLong } from "react-icons/fa6";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionToTopic,
  setTotalTopicQuestions,
} from "../../../../redux/college/test/thunks/topic";

const Header = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");

  const addType = searchParams.get("addType");

  const navigate = useNavigate();

  //   const topicToBeAdded = JSON.parse(localStorage.getItem("TopicToBeAdded"));
  const topicToBeAdded = useSelector((state) => state.test.TopicToBeAdded);
  const { totalTopicQuestions } = useSelector((state) => state.test);

  //   //console.log(topicToBeAdded.video);

  const hasQuestions =
    Array.isArray(topicToBeAdded?.video?.questions) &&
    topicToBeAdded?.video?.questions?.length > 0;

  const hasLong =
    topicToBeAdded?.video?.long &&
    topicToBeAdded?.video?.long?.Title?.trim() !== "";

  const hasShort =
    topicToBeAdded?.video?.short &&
    topicToBeAdded?.video?.short?.Title?.trim() !== "";

  const showSubmitButton = hasQuestions || hasLong || hasShort;

  const handleSave = () => {
    if (addType === "topic") {
      if (showSubmitButton) {
        // dispatch(addVideoToTopic({ data:topicToBeAdded.video, id: id, type: type }));
        const updatedTopicToBeAdded = {
          ...topicToBeAdded,

          video: {
            videoFile: "", // Set video link to an empty string

            questions: [], // Set questions to an empty array

            long: {
              Title: "", // Set long title to an empty string

              // Add other properties if needed
            },

            short: {
              Title: "", // Set short title to an empty string

              // Add other properties if needed
            },

            // Add other properties if needed
          },
        };
        let mcq = topicToBeAdded.video.questions.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);
        let long = topicToBeAdded.video.long.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);

        let short = topicToBeAdded.video.short.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);
        // //console.log(mcq);
        let Duration = mcq + long + short;
        dispatch(
          addQuestionToTopic({
            data: { ...topicToBeAdded.video, Duration: Duration },
            id: id,
            type: type,
          })
        ).then(() => {
          localStorage.setItem(
            "TopicToBeAdded",
            JSON.stringify(updatedTopicToBeAdded)
          );
          navigate(`/college/quesBank/select`);
        });
      }
    } else {
      if (showSubmitButton) {
        // dispatch(addVideoToTopic({ data:topicToBeAdded.video, id: id, type: type }));
        const updatedTopicToBeAdded = {
          ...topicToBeAdded,

          video: {
            videoFile: "", // Set video link to an empty string

            questions: [], // Set questions to an empty array

            long: {
              Title: "", // Set long title to an empty string

              // Add other properties if needed
            },

            short: {
              Title: "", // Set short title to an empty string

              // Add other properties if needed
            },

            // Add other properties if needed
          },
        };
        let mcq = topicToBeAdded.video.questions.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);
        let long = topicToBeAdded.video.long.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);

        let short = topicToBeAdded.video.short.reduce((acc, question) => {
          return acc + parseInt(question.Duration);
        }, 0);
        // //console.log(mcq);
        let Duration = mcq + long + short;
        dispatch(
          addQuestionToTopic({
            data: { ...topicToBeAdded.video, Duration: Duration },
            id: searchParams.get("topicId"),
            type: "video",
          })
        ).then(() => {
          localStorage.setItem(
            "TopicToBeAdded",
            JSON.stringify(updatedTopicToBeAdded)
          );
          navigate(
            `test/college/details/${id}type=section&question=video&topicId=${searchParams.get(
              "topicId"
            )}&view=true`
          );
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(setTotalTopicQuestions({ id, type: "video", level: "all" }));
    }
  }, [id, ""]);

  return (
    <div className="flex w-full mx-auto justify-between mb-5">
      <div className="flex w-full items-center gap-3 ">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>

        <h2 className="text-xl md:text-[28px] font-bold font-dmSans text-[#171717]">
          Question No : {totalTopicQuestions + 1}
        </h2>
      </div>
    </div>
  );
};

export default Header;
