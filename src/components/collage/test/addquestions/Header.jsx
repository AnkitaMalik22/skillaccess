import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate ,useSearchParams} from "react-router-dom";

const Header = ({ Q, page }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();

  const level = search.get("level");

  return (
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center ml-2 rounded-lg  gap-2">
          <button
            onClick={() =>  level === "adaptive" ?  navigate("/collage/test/selectAdaptive?level=adaptive") : navigate("/collage/test/select")}
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="flex self-center">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans ">
              Create Assessment
            </h2>
            {/* <div className="flex gap-2 text-[#567BF9] text-xs font-medium mt-3">
              <h3 className="mr-2">Untitiled Assessments</h3>
              <span>
                <img
                  src="../../images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2">0 Tests</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="../../images/icons/hourglass.png"
                  alt="test"
                  className=" object-scale-down"
                />
              </span>
              <h3>Add Questions</h3>
            </div> */}
          </div>
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-blue-800 py-3 px-4 rounded-lg text-xs gap-2 text-white"
            onClick={() =>
              page == "submit"
                ? navigate("/collage/test/submit")
                : navigate("/collage/test/final")
            }
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
