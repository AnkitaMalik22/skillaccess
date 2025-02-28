import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionToTopic } from "../../../../redux/college/test/thunks/topic";
import { setTotalTopicQuestions } from "../../../../redux/college/test/thunks/topic";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const { totalTopicQuestions } = useSelector((state) => state.test);
  const type = searchParams.get("type");
  const level = searchParams.get("level");

  const addType = searchParams.get("addType");

  const navigate = useNavigate();

  //   const topicToBeAdded = JSON.parse(localStorage.getItem("TopicToBeAdded"));
  const topicToBeAdded = useSelector((state) => state.test.TopicToBeAdded);
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
          navigate(`/college/test/select?level=${level}`);
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
            QuestionLevel: level,
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
      dispatch(setTotalTopicQuestions({ id, type: "video", level }));
    }
  }, [id, ""]);

  return (
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Question No : {totalTopicQuestions + 1}
        </h2>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          {/* {showSubmitButton && (
            // Show "Submit" button

            <button
              className="self-center justify-center flex bg-accent py-3 px-8 rounded-2xl text-sm gap-2 text-white"
              onClick={handleSave}
            >
              Submit
              <FaArrowRightLong className="self-center text-lg text-white ml-4" />
            </button>
          )} */}

          {/* // : 

          // (

          //   // Show "Next Step" button

          //   <button

          //     className="self-center justify-center flex bg-accent py-3 px-8 rounded-2xl text-sm gap-2 text-white"

          //     onClick={() => navigate("/college/test/select")}

          //   >

          //     Next Step

          //     <FaArrowRightLong className="self-center text-lg text-white ml-4" />

          //   </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
