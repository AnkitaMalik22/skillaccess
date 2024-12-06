import React, { useState } from "react";
import { CgStopwatch } from "react-icons/cg";
import axios from "axios"
import Loader from "../../../../components/loaders/Loader"
import toast from "react-hot-toast";
const Description = ({ topics,assessment }) => {
  const handleCalculateTime = (topic) => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;

    if (topic.Type === "essay") {
      totalEssay += topic.essay?.reduce((acc, curr) => {
        // //console.log(parseInt(curr.Duration));
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

    // //console.log(
    //   total,
    //   "total",
    //   totalMcq,
    //   totalEssay,
    //   totalVideo,
    //   totalCompiler,
    //   totalFindAnswer
    // );
    return total;
  };
  const [loading,setLoading] = useState(false);

  return (
    <div className="bg-[#8F92A1] font-dmSans bg-opacity-5 p-5 mt-1 mb-5 rounded-b-2xl ">
      <h2 className="font-bold mb-2 text-base">Test Description</h2>

    { !assessment?.isReportGenerated &&  <button
              className="py-3 text-white rounded-2xl text-xs  bg-accent font-bold flex gap-2 px-7 my-4 "
              onClick={async ()=>{
              try {
                setLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}/api/assessments/publish-report/${assessment._id}`);
                setLoading(false)
                toast.success("Result has been published");
              } catch (error) {
                
              }
              }}
              type="button"
            >
             {loading? <Loader />: <p>Publish result</p> }
            </button>}
      {/* card */}
      <div className="flex flex-row flex-wrap gap-4">
        {topics?.map((topic) => (
          <div className="flex  flex-wrap gap-8">
            <div className="w-64 bg-white rounded-2xl p-3">
              <h2 className="font-bold mb-2 text-[#171717] text-base first-letter:capitalize">
                {topic.Heading}
              </h2>
              <p className="text-xs text-[#8F92A1] line-clamp-4 mb-2 font-normal first-letter:capitalize">
                {topic.Description}
              </p>
              <span className="flex justify-between">
                <div className="text-[#8F92A1] flex gap-1">
                  <CgStopwatch className="text-xl" />{" "}
                  <p className="text-xs self-center">
                    {" "}
                    {handleCalculateTime(topic)} Min
                  </p>
                </div>



                <p className="text-xs self-center text-[#2348C7] text-opacity-80 tracking-[-0.4px] first-letter:uppercase">
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
