import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = ({ Q }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const page = search.get("page");
  const level = search.get("level");

  console.log("page", level);
  const handleNext = () => {
    if (page === "qb") {
      navigate(`/collage/quesBank/topic`);
    } else {
      console.log("level", level);
      level === "adaptive"
        ? navigate(`/collage/test/selectAdaptive?level=${level}`)
        : navigate(`/collage/test/select?level=${level}`);
    }
  };

  return (
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center ml-2 rounded-lg  gap-2 items-center">
          <button
            className="bg-[#D9E1E7]  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-14"
            onClick={() => navigate(-1)}
          >
            <img src="../../../../images/icons/back.png" alt="" srcset="" />
          </button>

          <div className="flex items-center">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans ">
              Create Topic
            </h2>
            {/* <div className="flex gap-2 text-[#567BF9] text-xs font-medium mt-3">
              <h3 className="mr-2">Untitiled Assessments</h3>
              <span>
                <img
                  src="../../../../images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2">0 Tests</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="../../../../images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>21 MINS</h3>
            </div> */}
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-[#0052CC] py-3 px-8 rounded-2xl text-xs gap-2 text-white"
            onClick={() => handleNext()}
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
