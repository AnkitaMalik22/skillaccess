import React, { useEffect, useState } from "react";
import Footer from "../../../components/collage/test/addStudents/Footer";
import Header from "../../../components/collage/test/addStudents/Header";
import List from "../../../components/collage/test/addStudents/List";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsForTest } from "../../../redux/collage/test/thunks/test";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../../hooks/useTranslate";

const Invite = () => {
  //useTranslate();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { credit } = useSelector((state) => state.collageAuth);
  const testId = searchParams.get("testId");
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const { approvedStudents: uploadedStudents, loading } = useSelector(
    (state) => state.collegeStudents
  );
  const { students: studentList } = useSelector((state) => state.test);
  const { user } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getStudentsForTest(testId));
  }, []);

  useEffect(() => {
    setFilteredStudents(studentList);
  }, [studentList]);

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");

      setFilteredStudents(studentList);

      return;
    } else {
      setFilteredStudents(
        studentList.filter((student) => {
          const regex = new RegExp(value, "i");
          return (
            regex.test(student.FirstName) ||
            regex.test(student.LastName) ||
            regex.test(student.Email)
          );
        })
      );

      console.log(filteredStudents, "filtered--", value);
    }
  };

  let testName = localStorage.getItem("testName");

  // console.log(uploadedStudents)
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

      <div className=" mx-auto ">
        <div className="w-full">
          <div
            name=""
            id=""
            className="w-full rounded-lg bg-gray-100 focus:outline-none border-none mb-4 p-5 font-bold text-2xl"
          >
            {localStorage?.getItem("testName")}
          </div>
        </div>

        <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg p-5 focus:ring-0placeholder-gray-400 mb-6">
          <Header handleFilter={handleFilterStudents} />
          <List
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
          />
        </div>
      </div>

      <div className="mx-auto">
        {" "}
        <Footer students={students} />
      </div>
    </>
  );
};

export default Invite;
