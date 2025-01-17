import React, { useState } from "react";
import { CgStopwatch } from "react-icons/cg";
import axios from "axios";
import Loader from "../../../../components/loaders/Loader";
import toast from "react-hot-toast";
import { getHeaders } from "../../../../util/isCompany";

const Description = ({ topics, assessment }) => {
  const handleCalculateTime = (topic) => {
    let totalMcq = 0,
      totalEssay = 0,
      totalVideo = 0,
      totalCompiler = 0,
      totalFindAnswer = 0;

    if (topic.Type === "essay") {
      totalEssay += topic.essay?.reduce(
        (acc, curr) => acc + parseInt(curr.Duration),
        0
      );
    }
    if (topic.Type === "video") {
      totalVideo += topic.video?.reduce(
        (acc, curr) => acc + parseInt(curr.Duration),
        0
      );
    }
    if (topic.Type === "compiler") {
      totalCompiler += topic.compiler?.reduce(
        (acc, curr) => acc + parseInt(curr.Duration),
        0
      );
    }
    if (topic.Type === "findAnswer") {
      totalFindAnswer += topic.findAnswers?.reduce(
        (acc, curr) => acc + parseInt(curr.Duration),
        0
      );
    }
    if (topic.Type === "mcq") {
      totalMcq += topic.questions?.reduce(
        (acc, curr) => acc + parseInt(curr.Duration),
        0
      );
    }

    const total =
      totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;

    return total;
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#F9FAFB] font-dmSans p-6 mt-4 mb-6 rounded-md shadow-lg">
      <h2 className="font-bold mb-3 text-xl text-[#171717]">
        Test Description
      </h2>

      {(
        <button
          className="py-3 text-white rounded-md text-sm bg-accent font-semibold flex gap-2 px-7 my-4 transition-all transform hover:bg-opacity-90  hover:shadow-lg"
          onClick={async () => {
            try {
              setLoading(true);
              await axios.get(
                `${process.env.REACT_APP_API_URL}/api/assessments/publish-report/${assessment._id}`,
                getHeaders()
              );
              setLoading(false);
              toast.success("Result has been published");
            } catch (error) { }
          }}
          type="button"
        >
          {loading ? <Loader /> : <p>Publish result</p>}
        </button>
      )}

      {/* card */}
      <div className="flex flex-row flex-wrap gap-4">
        {topics?.map((topic) => (
          <div className="flex flex-wrap gap-8">
            <div className="w-64 bg-white rounded-md p-4 transition-all transform  hover:shadow-lg hover:border-blued">
              <h2 className="font-bold mb-2 text-[#171717] text-base first-letter:capitalize">
                {topic.Heading}
              </h2>
              <p className="text-sm text-[#8F92A1] line-clamp-4 mb-2 font-normal first-letter:capitalize">
                {topic.Description}
              </p>
              <span className="flex justify-between">
                <div className="text-[#8F92A1] flex gap-1">
                  <CgStopwatch className="text-xl" />
                  <p className="text-sm self-center">
                    {handleCalculateTime(topic)} Min
                  </p>
                </div>

                <p className="text-sm self-center text-blued text-opacity-80 tracking-[-0.4px] uppercase">
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
