
import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../../../loaders/Skeleton";

const Info = ({ user, assessment }) => {
const {GET_TEST_LOADING} = useSelector((state) => state.test);
  
  const startDate = new Date(assessment?.startDate);
  const endDate = new Date(assessment?.endDate);



  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let daySuffix;
    if (day % 10 === 1 && day !== 11) {
      daySuffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      daySuffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }

    return `${day}${daySuffix} ${month}`;
  }

  return (
   
    GET_TEST_LOADING ? <>  
    <Skeleton/>
   </> :  <div className="flex justify-between bg-[#8F92A1]   bg-opacity-5 p-5 items-center">
    <div className="flex  gap-5 items-center">
      <div className="flex object-cover rounded-xl  self-center p-2 bg-white md:h-20 md:w-20 h-16 w-16">
        <img
          src={user?.avatar?.public_url || "../../images/companyLogo.png"}
          alt="college logo"
          className="self-center"
        />
      </div>

      <div className="font-dmSans">
        <h2 className="text-lg font-bold text-[#171717]">
          {assessment?.name}
        </h2>

        <h2 className="text-[#7D7D7D] text-xs ">Available Jobs</h2>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-10 text-center font-dmSans">
      <div className="self-center">
        <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Time Period</h2>

        <h2 className="text-sm font-bold text-[#171717]">
          {assessment?.totalTime} mins
        </h2>
      </div>

      <div className="self-center">
        <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Timeline</h2>
        <h2 className="text-sm font-bold text-[#171717]">
          {assessment?.startDate && assessment?.endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : "N/A"}
        </h2>
      </div>

      <div className="self-center">
        <h2 className="text-xs font-bold text-[#8E91A0] mb-1">
          Students Appeared
        </h2>

        <h2 className="text-sm font-bold text-[#171717]">
          {assessment?.studentResponses?.length}
        </h2>
      </div>

      <div className="self-center">
        <h2 className="text-xs font-bold text-[#8E91A0] mb-1">Attempts</h2>

        <h2 className="text-sm font-bold text-[#171717]">
          {assessment?.totalAttempts}
        </h2>
      </div>
    </div>
  </div>
   
  );
};

export default Info;
