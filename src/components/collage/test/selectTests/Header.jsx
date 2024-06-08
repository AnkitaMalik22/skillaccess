import React from "react";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const { name } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");
  const handleSubmit = () => {
    if (topics.length === 0) {
      toast.error("Please select atleast one topic to proceed");
      return;
    }
    navigate(`/collage/test/questions?level=${level}`);
  };

  return (
    <div className="flex w-11/12 mx-auto justify-between my-6">
      <div className="flex gap-3 items-center">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(`/collage/test/name?level=${level}`)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <div className="flex flex-col ">
          <h2 className="text-xl md:text-[28px] font-bold font-dmSans text-[#171717] mb-2">
            Create Question
          </h2>
          {/* <div className="flex gap-3 items-center text-[#567BF9] text-xs font-medium">
            <h3>Untitiled Assessments</h3>
            <div className="flex gap-2">
              <img
                src="../../../../images/icons/test.png"
                alt="test"
                className="w-4 h-4"
              />
              <h3>0 Tests</h3>{" "}
            </div>
            <div className="flex gap-2">
              <img
                src="../../../../images/icons/hourglass.png"
                alt="test"
                className="w-4 h-4 object-contain"
              />
              <h3>21 MINS</h3>
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={handleSubmit}
        >
          Next Step{" "}
          <FaArrowRightLong className="self-center text-lg text-white ml-4" />
        </button>{" "}
      </div>
    </div>
  );
};

export default Header;
