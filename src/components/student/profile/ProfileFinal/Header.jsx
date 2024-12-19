import React from "react";
import { IoIosSearch } from "react-icons/io";
import BackIcon from "../../../buttons/BackIcon";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiPlus, FiUpload } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const Header = ({ editable, setEditable }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6 font-dmSans">
      {/* comp */}
      <span className="flex gap-2">
        <h2 className="text-2xl  font-bold  py-1  self-center">Personal</h2>{" "}
        <div className=" p-[.3rem] w-6 h-6 rounded-lg  bg-accent bg-opacity-80 self-center">
          <img
            src="/images/icons/pen.png"
            alt="pen"
            onClick={() => setEditable(!editable)}
          />
        </div>
      </span>

      <span className="flex gap-2 text-xs font-bold">
        <button
          className="self-center justify-center flex bg-accent bg-opacity-80 py-3  rounded-xl  w-32  gap-2 text-white"
          // onClick={() => navigate("/college/test/addMcq")}
        >
          Personal
        </button>
        <button
          className="self-center justify-center flex bg-gray-100 py-3  rounded-xl  w-32  gap-2 "
          // onClick={() => navigate("/college/test/addMcq")}
        >
          Education
        </button>
        <button
          className="self-center justify-center flex bg-gray-100 py-3  rounded-xl  w-32  gap-2 "
          // onClick={() => navigate("/college/test/addMcq")}
        >
          Skills
        </button>
        <button
          className="self-center justify-center flex bg-gray-100 py-3  rounded-xl  w-32  gap-2 "
          // onClick={() => navigate("/college/test/addMcq")}
        >
          Portfolio
        </button>
      </span>
    </div>
  );
};

export default Header;
