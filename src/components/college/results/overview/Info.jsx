import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "../../../loaders/Skeleton";
import useFormattedDate from "../../../../hooks/useFormattedDate"; // Import the custom hook

const InfoBlock = ({ title, value }) => (
  <div className="self-center">
    <h2 className="text-sm font-bold text-[#8E91A0] mb-1">{title}</h2>
    <h2 className="text-sm font-bold text-[#171717]">{value}</h2>
  </div>
);

const Info = ({ user, assessment }) => {
  const { GET_TEST_LOADING } = useSelector((state) => state.test);

  // Using the custom hook to format start and end dates
  const startDate = useFormattedDate(assessment?.startDate);
  const endDate = useFormattedDate(assessment?.endDate);

  return GET_TEST_LOADING ? (
    <>
      <Skeleton />
    </>
  ) : (
    <div className="flex justify-between bg-[#8F92A1] bg-opacity-5 p-5 items-center">
      <div className="flex gap-5 items-center">
        <div className="flex object-cover rounded-xl self-center p-2 bg-white md:h-20 md:w-20 h-16 w-16">
          <img
            src={user?.avatar?.url || "/images/companyLogo.png"}
            alt="college logo"
            className="self-center"
          />
        </div>

        <div className="font-dmSans">
          <h2 className="text-lg font-bold text-[#171717]">
            {assessment?.name}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-10 text-center font-dmSans">
        <InfoBlock
          title="Time Period"
          value={`${assessment?.totalTime} mins`}
        />
        <InfoBlock
          title="Timeline"
          value={startDate && endDate ? `${startDate} - ${endDate}` : "N/A"}
        />
        <InfoBlock
          title="Students Appeared"
          value={assessment?.studentResponses?.length || "N/A"}
        />
        <InfoBlock
          title="Attempts"
          value={assessment?.totalAttempts || "N/A"}
        />
      </div>
    </div>
  );
};

export default Info;
