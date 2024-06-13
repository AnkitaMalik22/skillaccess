import React from "react";
import Header from "../common/Header";
import { Progress } from "../common/Progress";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        next={() => navigate("/student/profile/final")}
        isPortfolio={true}
      />
      <Progress level={4} />
      {/* website & link */}
      <div className="flex flex-col gap-10">
        {/* website */}
        <div>
          <div className="mb-2 font-bold">Website</div>
          <h2 className="text-gray-400 ">
            Add a link that will appear in your profile
          </h2>
        </div>
        {/* link */}
        <div className="w-1/2">
          <div className="mb-2 font-bold">Link</div>
          <input
            type="text"
            className="bg-gray-100 rounded-lg  border-none text-blue-700 placeholder:text-gray-400 mb-4 w-full"
            placeholder="https://www.example.com"
          />
          <button className="self-center justify-center flex  py-3  rounded-xl w-32  gap-2 mx-auto">
            <FiPlus className="self-center text-lg " /> Add
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default Portfolio;
