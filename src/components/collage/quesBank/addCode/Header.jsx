import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loaders/Loader";

const Header = ({ handleSave }) => {
  const navigate = useNavigate();
  const { ADD_QUESTION_LOADING}= useSelector((state) => state.test);
  const save = () => {
    handleSave("save");
    // navigate(-1);
  };

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
          <button className="self-center w-24  justify-center flex text-blue-800 py-2 px-4 rounded-xl font-bold gap-2 bg-white"   onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="self-center w-32 justify-center flex bg-blue-700 py-2 font-bold px-4 rounded-xl gap-2 text-white"
            onClick={save}
          >
         {ADD_QUESTION_LOADING ? "Saving" : "Save"}
            {ADD_QUESTION_LOADING && <Loader size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
