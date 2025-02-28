import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import isCompany, { isUni } from "../../../../util/isCompany";

const Header = ({ Q, page }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const { name } = useSelector((state) => state.test);
  const level = search.get("level");

  return (
    <div className="flex mx-auto justify-between mb-5">
      <div>
        <button className="flex items-center ml-2 rounded-md  gap-2">
          <button
            onClick={() =>
              isUni()
                ? level === "adaptive"
                  ? navigate(
                      `/university/pr/test/selectAdaptive?level=${level}`
                    )
                  : navigate(`/university/pr/test/select?level=${level}`)
                : level === "adaptive"
                ? navigate(`/college/test/selectAdaptive?level=${level}`)
                : navigate(`/college/test/select?level=${level}`)
            }
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-5 rounded-md h-14 w-14 self-center bg-gray-200 text-gray-500" />
          </button>

          <div className="flex flex-col items-start">
            <h2 className="sm:text-xl mt-2 text-left font-bold self-center text-3xl font-dmSans  w-full ">
              Create Assessment
            </h2>
            {/* <div className="flex gap-2 text-[#567BF9] text-sm font-medium mt-3 ">
              <h3 className="mr-2 ">{name}</h3>
              <span>
                <img
                  src="/images/icons/test.png"
                  alt="test"
                  className="w-4 h-4"
                />
              </span>
              <h3 className="mr-2"> {topics && topics.length ? topics.length : 0
              } Topics</h3>{" "}
              <span className="w-2 h-2">
                <img
                  src="/images/icons/hourglass.png"
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
            className="self-center justify-center flex bg-blued py-3 px-4 rounded-md text-sm gap-2 text-white"
            onClick={() =>
              isUni()
                ? navigate("/university/pr/quesBank")
                : isCompany()
                ? navigate("/company/pr/quesBank")
                : navigate("/college/quesBank")
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
