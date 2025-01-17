import React from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMcq, createTest } from "../../../../redux/college/test/testSlice";
import Loader from "../../../loaders/Loader";

const Header = ({
  search,
  question,
  setQuestion,
  section,
  count,
  isPrev,
  setIsPrev,
  handleSave,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { test, ADD_QUESTION_LOADING } = useSelector((state) => state.test);
  const addType = searchParams.get("addType");
  // const handleCreateTest = () => {
  //   //console.log("test", test);
  //   dispatch(
  //     createTest({
  //       name: test.testName,
  //       level: test.testType,
  //       testSections: test.sections,
  //     })
  //   );
  //   navigate("/college/test/final");
  // };

  const handleSaveNext = () => {
    if (ADD_QUESTION_LOADING) return;
    handleSave("save");
  };
  // useEffect(() => {
  //   dispatch(setTest({questions}));
  // }, [questions]);
  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
      <div className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-accent self-center text-white rounded-md h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={handleSaveNext}
        >
          {ADD_QUESTION_LOADING && addType !== "test" ? "Saving" : "Save"}
          {ADD_QUESTION_LOADING && addType !== "test" && <Loader size="sm" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
