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
    <div className="bg-[#8F92A1] font-dmSans rounded-md bg-opacity-5 p-5 my-3">
      <h2 className="font-bold mb-3">Test Description</h2>

      {/* card */}
      <div className="flex flex-row justify-between flex-wrap gap-4">
        {topics?.map((topic) => (
          <div className="flex  flex-wrap gap-8 ">
            <div className="w-64 h-40 bg-white rounded-2xl p-4 relative">
              <h2 className="font-bold mb-3">
                {topic.Heading || "no heading"}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-4 mb-4">
                {topic.Description || "loedajndas isadj i isad j"}
              </p>
              <span className="flex flex-col absolute bottom-0 w-full left-0 px-4 py-2">
                {/*  */}
                <div className="flex justify-between mb-4">
                  {/* performance */}
                  <div>
                    {" "}
                    <h2 className="font-bold text-sm text-gray-400 mb-2">
                      Performance
                    </h2>
                    <span className="flex gap-2">
                      <div className="min-w-[6rem] bg-opacity-5 rounded-md h-3 mx-auto bg-green-600">
                        <div
                          className={`w-3/5 bg-green-700 h-full rounded-md`}
                        ></div>
                      </div>
                      <h2 className="font-dmSans font-bold text-sm sm:text-sm ">
                        {" "}
                        70%
                      </h2>
                    </span>
                  </div>
                  {/*  */}
                  {/* score*/}
                  <div>
                    {" "}
                    <h2 className="font-bold text-sm text-gray-400 mb-2">
                      Score
                    </h2>
                    <span className="flex gap-0">
                      <h2 className="font-dmSans font-bold text-sm sm:text-sm ">
                        {" "}
                        70
                      </h2>
                      <h2 className="font-dmSans font-bold text-sm text-gray-400 sm:text-sm ">
                        {" "}
                        /90
                      </h2>
                    </span>
                  </div>
                  {/*  */}
                </div>
                {/*  */}
                <div className="flex justify-between">
                  <div className="text-gray-400 flex gap-1">
                    <CgStopwatch className="text-xl" />{" "}
                    <p className="text-sm self-center">
                      {" "}
                      {handleCalculateTime(topic) || 10}
                    </p>
                  </div>

                  <p className="text-sm self-center text-blued tracking-[-0.4px] text-left">
                    Review
                  </p>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
