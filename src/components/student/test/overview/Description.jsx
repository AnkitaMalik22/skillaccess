import React from "react";
import { CgStopwatch } from "react-icons/cg";

const Description = ({ topics }) => {
  const handleCalculateTime = (topic) => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;

    if (topic.Type === "essay") {
      totalEssay += topic.essay?.reduce((acc, curr) => {
        //console.log(parseInt(curr.Duration));
        return acc + parseInt(curr.Duration);
      }, 0);
    }
    if (topic.Type === "video") {
      totalVideo += topic.video?.reduce((acc, curr) => {
        return acc + parseInt(curr.Duration);
      }, 0);
    }
    if (topic.Type === "compiler") {
      totalCompiler += topic.compiler?.reduce((acc, curr) => {
        return acc + parseInt(curr.Duration);
      }, 0);
    }
    if (topic.Type === "findAnswer") {
      totalFindAnswer += topic.findAnswers?.reduce((acc, curr) => {
        return acc + parseInt(curr.Duration);
      }, 0);
    }

    if (topic.Type === "mcq") {
      totalMcq += topic.questions?.reduce((acc, curr) => {
        return acc + parseInt(curr.Duration);
      }, 0);
    }

    const total =
      totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;

    //console.log(
      total,
      "total",
      totalMcq,
      totalEssay,
      totalVideo,
      totalCompiler,
      totalFindAnswer
    );
    return total;
  };

  return (
    <div className="bg-[#8F92A1] font-dmSans rounded-lg bg-opacity-5 p-6 ">
      <h2 className="font-bold mb-3">Test Description</h2>
      <div className="flex flex-row justify-between flex-wrap gap-4 mt-8">
        {topics?.map((topic) => (
          <div className="flex  flex-wrap gap-8">
            <div className="w-64 h-40 bg-white rounded-2xl p-4">
              <h2 className="font-bold mb-3">{topic.Heading}</h2>
              <p className="text-xs text-gray-400 line-clamp-4 mb-4">
                {topic.Description}
              </p>
              <span className="flex justify-between">
                <div className="text-gray-400 flex gap-1">
                  <CgStopwatch className="text-xl" />{" "}
                  <p className="text-xs self-center">
                    {" "}
                    {handleCalculateTime(topic)}
                  </p>
                </div>

                <p className="text-xs self-center text-blued tracking-[-0.4px]">
                  {topic.Type}
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
