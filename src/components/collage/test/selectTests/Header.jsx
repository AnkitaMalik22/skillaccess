import React from "react";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const {name} = useSelector((state) => state.test);
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
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center ml-2 rounded-lg  gap-2">
          <button onClick={() => navigate(`/collage/test/name?level=${level}`)} className="mt-2 mr-3">
            <FaChevronLeft className=" p-5 rounded-lg h-14 w-14 self-center bg-gray-200 text-gray-500" />
          </button>

          <div className="flex flex-col items-start">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans w-full">
              Create Assessment
            </h2>
            <div className="flex gap-2 text-[#567BF9] text-xs font-medium mt-3">
              <h3 className="mr-2">{name}</h3>
              <span>
                <img
                  src="../../images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2"> {topics && topics.length ? topics.length : 0
              } Topics</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="../../images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>Add Questions</h3>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-blue-800 py-3 px-4 rounded-lg text-xs gap-2 text-white"
            onClick={handleSubmit}
          >
            Next Step{" "}
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
