import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import { LiaStopwatchSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import { PiPencilSimpleLine } from "react-icons/pi";
import { ImFileText } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionCount,
  setQuesions,
  setTest,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const AddQuestions = () => {
  const { topics, currentQuestionCount } = useSelector((state) => state.test);

  const navigate = useNavigate();
  // question of the topic
  // const { topics } = useSelector((state) => state.test);
  // React.useEffect(() => {
  //   console.log(topics, "topics");
  // }, [topics]);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");
  const removeTopic = (index) => {
    let Qt;

    switch (topics[index].Type) {
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
    dispatch(
      setCurrentQuestionCount(currentQuestionCount - topics[index][Qt].length)
    );
    let topicsCopy = [...topics];
    topicsCopy.splice(index, 1);
    dispatch(setTestSelectedTopics(topicsCopy));
  };

  const handleCalculateTime = () => {
    const topicTimes = topics.reduce((acc, topic) => {
      const existingIndex = acc.findIndex(
        (item) => item.type === topic.Type && item.Heading === topic.Heading
      );
      let totalMcq = 0,
        totalEssay = 0,
        totalVideo = 0,
        totalCompiler = 0,
        totalFindAnswer = 0;

      if (topic.Type === "essay") {
        totalEssay = topic.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "video") {
        totalVideo = topic.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "compiler") {
        totalCompiler = topic.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "findAnswer") {
        totalFindAnswer = topic.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (topic.Type === "mcq") {
        totalMcq = topic.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (existingIndex !== -1) {
        // If entry exists, add to existing total
        acc[existingIndex].total +=
          totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;
      } else {
        // If entry doesn't exist, push a new entry
        acc.push({
          type: topic.Type,
          Heading: topic.Heading,
          total:
            totalMcq +
            totalEssay +
            totalVideo +
            totalCompiler +
            totalFindAnswer,
        });
      }

      return acc;
    }, []);

    return topicTimes;
  };

  //     return {
  //       type: topic.Type,
  //       Heading:topic.Heading,
  //       total: totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer,
  //     };
  //   });

  //   return topicTimes;
  // };

  const totalTime = handleCalculateTime();
  console.log(totalTime);
  return (
    <>
      <Header page={"submit"} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className="w-11/12 mx-auto mt-20">
        {/* larger screens */}
        <div className="   my-2 rounded-lg tracking-wide justify-between  ">
          <div className="grid grid-rows-1 w-[65vw]">
            <h2 className="font-normal text-xs sm:text-sm text-gray-400  mt-8 tracking-wide [word-spacing:4px] ">
              Add up to 10 custom questions to your assessment (optional). You
              can use five question types: multiple-choice, essay, video ,code
              and find answer.
            </h2>
            {topics?.map((topic, index) => (
              <div className=" sm:mt-5 rounded-lg tracking-wide justify-between  ">
                <div className=" grid grid-cols-10 row-span-2 gap-x-10 gap-y-3 p-3 bg-gray-100 rounded-lg border border-blued h-28 w-[64vw] mx-auto">
                  {" "}
                  <div className="col-span-4 ">
                    <h2 className="self-center text-xs sm:text-sm line-clamp-2">
                      {topic.Heading}
                    </h2>
                  </div>
                  <div className="col-span-2 col-start-7 ">
                    <span className="flex gap-1">
                      <ImFileText className="text-blued self-center " />
                      <p className="self-center text-xs text-gray-500   sm:text-sm">
                        {topic.Type}
                      </p>
                    </span>
                  </div>
                  <div className="col-span-1 col-start-9">
                    <div className="flex gap-1">
                      <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
                      <p className="text-gray-400 text-xs self-center">
                        {
                          totalTime.find(
                            (timeObj) =>
                              timeObj.type === topic.Type &&
                              timeObj.Heading === topic.Heading
                          )?.total
                        }{" "}
                        mins
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-span-1 col-start-10  flex justify-center"
                    onClick={() => removeTopic(index)}
                  >
                    <RxCross1 className="self-center text-red-600 w-5 h-5 cursor-pointer" />
                  </div>
                  <div className="col-span-4 line-clamp-2 text-xs font-normal text-[#8F92A1] ">
                    {topic.Description.length > 100
                      ? topic.Description.slice(0, 100) + "..."
                      : topic.Description}
                  </div>
                  <div className="col-span-1 col-start-9  flex">
                    {/* Need Question Details page */}
                    <button
                      className="self-center  justify-center bg-gray-200 p-2 rounded-lg text-xs"
                      // onClick={() =>
                      //   navigate(`/collage/test/${topic.type}/${topic.id}`)
                      // }
                      onClick={() =>
                        navigate(
                          `/collage/test/details/${index}?type=section&question=${topic.Type}&topicId=${topic._id}&view=false&level=${level}`
                        )
                      }
                    >
                      Details
                    </button>
                  </div>
                  <div className="col-span-1  flex justify-center">
                    <PiPencilSimpleLine
                      className="self-center text-blued w-5 h-5 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/collage/test/details/${index}?type=section&question=${topic.Type}&topicId=${topic._id}&view=true&level=${level}`
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
