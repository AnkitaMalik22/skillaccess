import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams,useSearchParams } from "react-router-dom";
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
  const { test ,ADD_QUESTION_LOADING}= useSelector((state) => state.test);
  const addType = searchParams.get("addType");
  // const handleCreateTest = () => {
  //   console.log("test", test);
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
    <div className="flex w-[98%] mx-auto justify-between mb-2 mt-5">
      <div className="h-fit self-center">
        <button className="flex self-center ml-2 rounded-lg  gap-2">
          <button
            onClick={() => navigate(-1)}
            className=" mr-3 self-center bg-white rounded-lg "
          >
            <FaChevronLeft className=" p-3  h-10 w-10 self-center " />
          </button>

          <div className="self-center">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  text-white ">
              Create Assessment
            </h2>
          </div>
        </button>
      </div>

      <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
        <div className=" flex gap-2">
          <button
            className="self-center w-24  justify-center flex text-blue-800 py-2 px-4 rounded-xl font-bold gap-2 bg-white"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="self-center w-32 justify-center flex bg-blue-700 py-2 font-bold px-4 rounded-xl gap-2 text-white"
            // onClick={handleCreateTest}

            onClick={handleSaveNext}
          >
             {ADD_QUESTION_LOADING && addType !== 'test' ?  "Saving" : "Save"}
            {ADD_QUESTION_LOADING  && addType !== 'test' && <Loader size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
