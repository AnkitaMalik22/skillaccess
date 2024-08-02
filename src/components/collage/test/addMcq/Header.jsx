import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMcq, createTest } from "../../../../redux/collage/test/testSlice";
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
  //   navigate("/collage/test/final");
  // };

  const handleSaveNext = () => {
    handleSave("save");
  };
  // useEffect(() => {
  //   dispatch(setTest({questions}));
  // }, [questions]);
  return (
    <div className="flex w-full mx-auto justify-between mb-5 ">
      <div className="flex gap-3">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>{" "}
        <button
          className="bg-[#0052CC] self-center text-white rounded-lg h-10 w-10 sm:w-32 flex items-center justify-center"
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
