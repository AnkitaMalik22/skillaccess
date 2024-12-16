import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../components/college/test/addStudents/Footer";
import Header from "../../../components/college/test/addStudents/Header";
import List from "../../../components/college/test/addStudents/List";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsForTest } from "../../../redux/college/test/thunks/test";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../../hooks/useTranslate";
import toast from "react-hot-toast";

const Invite = () => {
  //useTranslate();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { credit } = useSelector((state) => state.collegeAuth);
  const testId = searchParams.get("testId");
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [year, setYear] = useState("");
  const [limit,setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const debounceRef = useRef(null); // Ref for debounce timer

  const { approvedStudents: uploadedStudents, loading } = useSelector(
    (state) => state.collegeStudents
  );
  const { students: studentList, assessment, hasNextPageStudent } = useSelector(
    (state) => state.test
  );
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    dispatch(getStudentsForTest({ testId, skip: 0, limit: limit, batch: year }))
  }, []);

  useEffect(() => {
    setFilteredStudents(studentList);
  }, [studentList]);
  useEffect(() => {
    return () => {
      // Cleanup the timer on unmount
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      //console.log("empty");

      setFilteredStudents(studentList);

      return;
    } else {
      // setFilteredStudents(
      //   studentList.filter((student) => {
      //     const regex = new RegExp(value, "i");
      //     return (
      //       regex.test(student.FirstName) ||
      //       regex.test(student.LastName) ||
      //       regex.test(student.Email)
      //     );
      //   })
      // );
      setPage(1);
      
      // Debounce dispatch action
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      dispatch(getStudentsForTest({
        testId,
        skip: 0,
        limit,
        search: value,
        batch: year,
      }));
    }, 300); // Adjust debounce time (300ms is common)
      //console.log(filteredStudents, "filtered--", value);
    }
  };

  let testName = localStorage.getItem("testName");

  const handleNext = () => {
    dispatch(getStudentsForTest({ testId, skip: page * limit, limit: limit, batch: year }));
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    dispatch(getStudentsForTest({ testId, skip: (page - 1) * limit, limit: limit, batch: year }));
    setPage((prev) => prev - 1);
    toast.error("prev")

  }


  // //console.log(uploadedStudents)
  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          className="self-center object-center rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
        </button>
        {/* <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Create Assessment
        </h2> */}
      </div>

      <div className=" mx-auto bg-gray-100">
        <div className="w-full flex  justify-between">
          <div
            name=""
            id=""
            className="rounded-lg  focus:outline-none border-none mb-4 p-5 font-bold text-2xl"
          >
            {localStorage?.getItem("testName")}
          </div>

          {/* {console.log(assessment?.endDate)} */}
          <Footer students={students} endDate={assessment?.endDate} />


        </div>

        <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg p-5 focus:ring-0placeholder-gray-400 mb-6">
          <Header handleFilter={handleFilterStudents}
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
            handleNext={handleNext}
            handlePrev={handlePrev}
            disableNext={!hasNextPageStudent}
            disablePrev={page === 1}
            handleChangeYear={(e) => {
              setPage(1);
              setYear(e.target.value || "");
              dispatch(getStudentsForTest({ testId, skip: (page - 1) * limit, limit: limit, batch: e.target.value }))
            }}
          />

          <List
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
          />
        </div>
      </div>


    </>
  );
};

export default Invite;
