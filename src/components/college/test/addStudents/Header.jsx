import React from "react";
import {
  FaAngleLeft,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaSearch,
  FaSortDown,
} from "react-icons/fa";
import { PiCheck, PiSlidersHorizontalLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../loaders/Loader";

const Header = ({
  handleFilter,
  uploadedStudents,
  setStudents,
  students,
  handleNext,
  handlePrev,
  disableNext,
  disablePrev,
  handleChangeYear,
}) => {
  const navigate = useNavigate();

  const { credit } = useSelector((state) => state.collegeAuth);
  const { GET_STUDENTS_LOADING } = useSelector((state) => state.test);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectAll = () => {
    const isSelect = !checked; // Determine whether to select or deselect
    setChecked(isSelect); // Update the checked state

    if (isSelect) {
      setStudents(uploadedStudents); // Select all students
    } else {
      setStudents([]); // Deselect all students
    }
  };

  return (
    <div className="flex w-full mx-auto justify-between mb-5 font-dmSans">
      <button className=" mr-2 rounded-md h-10 w-24 sm:h-12 sm:w-32 flex self-center justify-center items-center justify-items-center">
        <input
          type="checkbox"
          className="p-1 rounded cursor-pointer mr-3"
          checked={checked} // Determine if checked
          onChange={handleSelectAll} // Use the updated function
        />{" "}
        <p className="text-gray-400 font-bold text-sm mr-2 w-20 ">
          {GET_STUDENTS_LOADING
            ? "Loading Students"
            : checked
            ? "Deselect All"
            : "Select All"}
        </p>
      </button>
      <div className="bg-gray-200 rounded-xl mx-2 sm:h-12 h-10 flex my-2 px-4 w-fit">
        <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
        <input
          type="text"
          placeholder="Search student, email..."
          onChange={handleFilter}
          className="input border-none self-center bg-gray-200 focus:outline-none input-md sm:w-96 max-w-md mx-auto placeholder-gray-400"
        />
      </div>
      <div className="self-center min-w-40">
        <select
          onChange={handleChangeYear}
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
      </div>
      <button
        className={`self-center justify-center flex bg-accent rounded-md text-sm font-bold gap-2 px-10 py-3 ${
          disablePrev && "bg-opacity-30"
        }`}
        onClick={handlePrev}
        disabled={disablePrev}
      >
        {loading ? (
          <Loader />
        ) : (
          <FaChevronLeft className="text-white text-lg" />
        )}

        <p className="self-center text-white tooltip">Prev</p>
      </button>
      <button
        className={`self-center justify-center flex bg-accent rounded-md text-sm font-bold gap-2 px-10 py-3 ${
          disableNext && "bg-opacity-30"
        }`}
        onClick={handleNext}
        disabled={disableNext}
      >
        <p className="self-center text-white tooltip">Next</p>
        {loading ? (
          <Loader />
        ) : (
          <FaChevronRight className="text-white text-lg" />
        )}
      </button>
    </div>
  );
};

export default Header;
