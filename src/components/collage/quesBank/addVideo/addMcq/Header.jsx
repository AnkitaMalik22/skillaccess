import React from "react";

import { FaChevronLeft } from "react-icons/fa";

import { FaArrowRightLong } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../../../redux/collage/test/thunks/test";

const Header = ({ question, setQuestion, handleSave, addType }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { test } = useSelector((state) => state.test);

  const handleCreateTest = () => {
    console.log("test", test);

    dispatch(
      createTest({
        name: test.testName,

        level: test.testType,

        testSections: test.sections,
      })
    );

    navigate("/collage/test/final");
  };

  const handleSaveHeader = () => {
    handleSave("save");
  };

  // useEffect(() => {

  //   dispatch(setTest({questions}));

  // }, [questions]);

  return (
    <div className="flex  justify-between mb-5">
      <div className="h-fit self-center">
        <button className="flex self-center rounded-lg  gap-2">
          {addType !== "edit" && (
            <button
              onClick={() => navigate(-1)}
              className=" mr-3 self-center bg-white rounded-lg "
            >
              <FaChevronLeft className=" p-3  h-10 w-10 self-center " />
            </button>
          )}

          <div className="self-center">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  ">
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

            onClick={handleSaveHeader}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
