import React, { useState } from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import StudentPoP from "../../../PopUps/StudentPoP";
import { useRef } from "react";
import { toast } from "react-hot-toast";



const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const upload = useRef(null);


  // const handleFile = (e) => {
  //   setVisible(true);
  //   const types = [
  //     "application/vnd.ms-excel",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  //     "application/vnd.ms-excel.sheet.macroEnabled.12",
  //     "application/vnd.ms-excel.template.macroEnabled.12",
  //     "application/vnd.ms-excel.addin.macroEnabled.12",
  //     "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  //   ];
  //   let file = e.target.files[0];
  //   if (file && types.includes(file.type)) {
  //     let reader = new FileReader();
  //     reader.readAsArrayBuffer(file);
  //     reader.onload = (e) => {
  //       setExcel(e.target.result);
  //     };
  //   } else {
  //     toast.error("invalid file type");
  //   }
  // };








  const handleAddTeamClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
const handleUploadClick = () => {
  console.log("upload")
  }

  const navigate = useNavigate();
  return (
    <div className="flex w-[95%] mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-4">
        <button
          className=" self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <img src="../../images/icons/reports.png" alt="" />
        </button>
      </span>
      <div className="bg-gray-100 rounded-xl mx-2  sm:h-12 h-10 flex my-2 px-4 w-fit">
        <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="input border-none self-center bg-gray-100 focus:outline-none input-md sm:w-96 max-w-md mx-auto  "
        />
      </div>

      <span className="flex gap-2">
        <button
          className="self-center justify-center flex bg-[#F8F8F9] py-3  rounded-xl w-32  gap-2 "
          onClick={handleAddTeamClick}
        >
          <FiPlus className="self-center text-lg " /> Add
        </button>
        {showPopup && <StudentPoP onClose={handleClosePopup} />}
        <button className="self-center justify-center flex bg-blue-700 py-3  rounded-xl w-48 text-white  gap-2 "
        onClick={handleUploadClick}
        >
          <FiUpload className="self-center text-lg " /> Upload New
        </button>
        <button className="bg-gray-100  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </span>
    </div>
  );
};

export default Header;
