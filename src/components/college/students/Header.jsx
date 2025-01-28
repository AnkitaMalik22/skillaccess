import React, { useState } from "react";
import { FaAngleLeft, FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import { FiPlus, FiUpload } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import StudentPoP from "../../PopUps/StudentPoP";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import PopUp from "../../PopUps/PopUp";
import Loader from "../test/addVideo/Loader";
import { getStudents, uploadStudents } from "../../../redux/college/student/studentSlice";
import { IoIosSearch } from "react-icons/io";

const Header = ({
  handleFilter,
  year,
  setYear,
  setCreatedAt,
  createdAt,
  setFilterType,
  filterType,
  batch,
  user,
  setSelectedList
}) => {
  const { uploadedStudents } = useSelector((state) => state.collegeStudents);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [excel, setExcel] = useState("");
  const [excelJSON, setExcelJSON] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const [year, setYear] = useState('');

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const upload = useRef(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
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
      setVisible(true);
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        setExcel(e.target.result);
      };
    } else {
      toast.error("Invalid file type only excel file accepted");
      // //console.log("not valid type");
    }
  };

  const handleStudentUpload = async () => {
    if (!excel) {
      toast.error("No file selected");
      return;
    }

    setLoading(true);
    try {
      const workbook = XLSX.read(excel, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        toast.error("The Excel file is empty");
        setLoading(false);
        return;
      }

      const headers = jsonData[0];
      const expectedHeaders = ["FirstName", "LastName", "Email", "Batch", "Approved"];
      const isValidFormat = expectedHeaders.every(
        (header, index) => headers[index] === header
      );

      if (!isValidFormat || headers.length !== expectedHeaders.length) {
        toast.error(
          "Incorrect titles, titles must be FirstName, LastName, Email ,Batch"
        );
        setLoading(false);
        return;
      }

      const students = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];

        // Skip empty rows
        if (row.length === 0 || row.every((cell) => !cell)) {
          continue;
        }

        const [firstName, lastName, email, batch, approved] = row;

        if (!firstName || firstName.length < 1) {
          toast.error(`Row ${i + 1}: The first name must be at least 1 character long.`);
          return;
        }
        if (!lastName || lastName.length < 1) {
          toast.error(`Row ${i + 1}: The last name must be at least 1 character long.`);
          return;
        }
        if (!email) {
          toast.error(`Row ${i + 1}: Email address is required.`);
          return;
        }
        if (!batch) {
          toast.error(`Row ${i + 1}: Batch information is required.`);
          return;
        }
        if (approved === null || approved === undefined) {
          toast.error(`Row ${i + 1}: Approval status must be provided.`);
          return;
        }
        const parsedApproved = typeof approved === "string"
          ? approved.trim().toLowerCase() === "true"
          : Boolean(approved);

        students.push({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Batch: batch,
          approved: parsedApproved
        });
      }

      setVisible(false);
      if (students.length > 0) {
        await dispatch(uploadStudents(students));
        // toast.success("Students uploaded successfully");
      } else {
        toast.warn("No valid student data to upload");
      }
    } catch (error) {
      toast.error("An error occurred while processing the file");
      console.error("Error processing the file:", error);
    } finally {
      setLoading(false);

      if (filterType === "invited-students") {
        await dispatch(getStudents({
          id: user?._id,
          batch,
          filterType,
          createdAt,
          page: 1,
          limit: 10,
        }))
      } else {
        setSelectedList('invitedStudents')
        setFilterType("invited-students")
      }

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
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
      </span>

      <span className="flex gap-3">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500 flex"
          onClick={handleAddTeamClick}
        >
          <FiPlus className="self-center text-lg" /> Add
        </button>

        {showPopup && <StudentPoP onClose={handleClosePopup} filterType={filterType} setFilterType={setFilterType} setSelectedList={setSelectedList} />}

        <button
          className="bg-blued border flex self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-blued text-white"
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

        <div className="relative">
          {/* Button to toggle popup */}
          <button
            onClick={togglePopup}
            className={`bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500  `}
          >
            <PiSlidersHorizontalLight className="self-center text-lg h-6" />
          </button>

          {/* Popup */}
          {isPopupOpen && (
            <div
              className="absolute top-0 right-0 mt-12 w-64 p-4 bg-white shadow-2xl rounded-md z-10 "
              onMouseLeave={togglePopup}
            >
              <div className="flex flex-col space-y-4">
                {/* Year Selection */}
                <label className="text-sm font-semibold">Select Year</label>
                <select
                  onChange={(e) => setYear(e.target.value || "")}
                  className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select Year</option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const years = Array.from(
                      { length: 9 },
                      (_, i) => currentYear - 4 + i
                    );
                    return years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ));
                  })()}
                </select>

                {/* Created At Input */}
                <label className="text-sm font-semibold">Created At</label>
                <input
                  type="date"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <div className="flex justify-between">
                  <button
                    onClick={togglePopup}
                    className="px-4 py-2 text-sm text-white bg-accent rounded-md focus:outline-none"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setYear("");
                      setCreatedAt("");
                    }}
                    className="px-4 py-2 text-sm text-white bg-accent rounded-md focus:outline-none"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </span>
    </div>
  );
};

export default Header;
