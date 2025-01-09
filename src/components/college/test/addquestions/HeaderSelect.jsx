import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isUni } from "../../../../util/isCompany";

const Header = ({ Q }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const page = search.get("page");
  const level = search.get("level");
  const entity = isUni() ? "university/pr" : "college";

  // //console.log("page", level);
  const handleNext = () => {
    if (page === "qb") {
      navigate(`/${entity}/quesBank/topic`);
    } else {
      // //console.log("level", level);
      level === "adaptive"
        ? navigate(`/${entity}/test/selectAdaptive?level=${level}`)
        : navigate(`/${entity}/test/select?level=${level}`);
    }
  };

  return (
    <div className="flex  mx-auto justify-between mb-5">
      <div className="h-fit self-center">
        <button className="flex self-center ml-2 rounded-md  gap-2">
          <button
            onClick={() => {
              navigate(`/${entity}/test/select?level=${level}`);
            }}
            className=" mr-3 self-center bg-white rounded-md "
          >
            <FaChevronLeft className=" p-3  h-10 w-10 self-center " />
          </button>

          <div className="self-center">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  text-white ">
              Create Topic
            </h2>
          </div>
        </button>
      </div>

      <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
        <div className=" flex gap-2">
          <button
            className="self-center w-32 justify-center flex bg-accent py-2 font-bold px-4 rounded-xl gap-2 text-white"
            onClick={() => handleNext()}
          >
            Next
            <FaArrowRightLong className="self-center text-lg text-white ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
