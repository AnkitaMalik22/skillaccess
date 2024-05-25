import React, { useState } from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import StudentPoP from "../../../PopUps/StudentPoP";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import PopUp from "../../../PopUps/PopUp";
import Loader from "../../test/addVideo/Loader";
import { uploadStudents } from "../../../../redux/collage/student/studentSlice";
import { IoIosSearch } from "react-icons/io";

const Header = ({ handleFilter, setFilteredStudents }) => {
  const { uploadedStudents } = useSelector((state) => state.collegeStudents);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [excel, setExcel] = useState("");
  const [excelJSON, setExcelJSON] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  const upload = useRef(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    setVisible(true);
    const types = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
      "application/vnd.ms-excel.template.macroEnabled.12",
      "application/vnd.ms-excel.addin.macroEnabled.12",
      "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    ];
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        setExcel(e.target.result);
      };
    } else {
      toast.error("invalid file type");
    }
  };

  const handleStudentUpload = async () => {
    if (excel) {
      setLoading(true);
      try {
        const workbook = XLSX.read(excel, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = jsonData[0];
        const students = [];

        // if (headers.length !== 3 || headers[0] !== 'FirstName' || headers[1] !== 'LastName' || headers[2] !== 'Email') {
        //   toast.error('Invalid file format');
        //   return;
        // }

        if (
          headers.length !== 3 ||
          headers[0] !== "FirstName" ||
          headers[1] !== "LastName" ||
          headers[2] !== "Email"
        ) {
          toast.error("Invalid file format");
          return;
        }

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];

          if (!row[0]) {
            toast.error(`First Name is Required at Row ${i}`);
            setLoading(false);
            return;
          } else if (!row[1]) {
            toast.error(`Last Name is Required at Row ${i} `);
            setLoading(false);
            return;
          } else if (!row[2]) {
            toast.error(`Email is Required at Row ${i}`);
            setLoading(false);
            return;
          } else {
            students.push({
              FirstName: row[0],
              LastName: row[1],
              Email: row[2],
            });
          }
        }

        dispatch(uploadStudents(students));

        // console.log(students);

        setLoading(false);
        setVisible(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while processing the file");
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleAddTeamClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // const handleUploadClick = () => {
  // handleStudentUpload();
  //   }

  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      {visible && (
        <PopUp
          visible={visible}
          handleSave={handleStudentUpload}
          handleOverlay={() => {
            upload.current.value = "";
            setVisible(false);
          }}
        />
      )}

      <span className="flex gap-2">
        <button className="  self-center object-center  rounded-lg h-10 w-10 ">
          <img src="../../images/icons/reports.png" alt="ico" />
        </button>
      </span>

      <div className=" rounded-xl w-full sm:h-12 h-10 flex">
        <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
          <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleFilter}
            className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          />
        </span>
      </div>

      <span className="flex gap-3">
        <button
          className="self-center justify-center flex bg-[#8f92a11a] px-7 py-3 rounded-2xl gap-2 text-sm text-[#171717] font-bold "
          onClick={handleAddTeamClick}
        >
          <FiPlus className="self-center text-lg " /> Add
        </button>

        {showPopup && <StudentPoP onClose={handleClosePopup} />}

        <button
          className="self-center justify-center flex bg-[#0052CC] px-5 py-3  rounded-2xl text-white  gap-2 text-md font-bold w-40"
          onClick={() => {
            upload.current.click();
          }}
        >
          <input
            type="file"
            ref={upload}
            className="hidden"
            onChange={handleFile}
          />
          {loading ? <Loader /> : <FiUpload className="self-center text-lg" />}{" "}
          Upload New
        </button>

        <button className="bg-[#8f92a11a]  self-center  rounded-lg h-10 w-10 sm:h-12 sm:w-16 flex items-center justify-center">
          <PiSlidersHorizontalLight className="h-7 w-7" />
        </button>
      </span>
    </div>
  );
};

export default Header;
