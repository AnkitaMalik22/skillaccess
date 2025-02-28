import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loader from "../../loaders/Loader";

import InputField from "../../../components/InputField"


const EditHeader = ({
  loading,

  setEditable,

  handleUpdate,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-2">
      <div className="h-fit self-center">
        <button className="flex self-center ml-2 rounded-md  gap-2">
          <button
            onClick={() => {
              setEditable(false);
              localStorage.setItem("editable", false);
            }}
            className=" mr-3 self-center bg-[#D9E1E7] w-12 h-12 2xl:w-14 2xl:h-14 p-2 rounded-md flex justify-center"
          >
            <FaChevronLeft className="   h-3 w-3 2xl:h-4 2xl:w-4 self-center " />
          </button>

          <div className="self-center">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans   ">
              Edit Profile
            </h2>
          </div>
        </button>
      </div>

      <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
        <div className=" flex gap-2">
          <button
            className="self-center justify-center flex text-blued h-12 px-4 rounded-xl font-bold gap-2 bg-gray-700 bg-opacity-5 "
            onClick={() => {
              setEditable(false);
              localStorage.setItem("editable", false);
            }}
          >
            <p className="self-center"> Cancel</p>
          </button>
          <button
            className="self-center justify-center flex h-12 px-4 rounded-xl font-bold gap-2 bg-accent text-white sm:px-12 items-center "
            onClick={handleUpdate}
            // onClick={() => setSubmitUpdateProfile(true)}
          >
            {loading ? <Loader /> : <p className="self-center">Save</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
