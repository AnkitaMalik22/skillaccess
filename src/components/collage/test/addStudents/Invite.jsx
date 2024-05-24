import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  setLoading,
} from "../../../../redux/collage/student/studentSlice";
import { getStudentsForTest } from "../../../../redux/collage/test/thunks/test";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Invite = () => {
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
    dispatch(getStudentsForTest(testId)).then((res) => {
      setFilteredStudents(studentList);
    });
  }, [user]);

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
    <div>
      <div className="bg-white min-h-[90vh] w-[98%] mx-auto rounded-xl pt-4 font-dmSans">
        <div className=" sm:w-[95.7%] mx-auto ">
          <div className="w-full">
            <div
              name=""
              id=""
              className="w-full rounded-lg bg-gray-100 focus:outline-none border-none mb-4 py-3 px-7 font-bold text-2xl"
            >
              {localStorage
                .getItem("testName")
                .substring(1, testName.length - 1)}
            </div>
          </div>

          <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg  px-7 pt-3 pb-8 focus:ring-0placeholder-gray-400 mb-6">
            <Header handleFilter={handleFilterStudents} />
            <List
              setStudents={setStudents}
              uploadedStudents={filteredStudents}
              students={students}
            />
          </div>
        </div>

        <div className="w-[95.7%] mx-auto">
          {" "}
          <Footer students={students} />
        </div>
      </div>
    </div>
  );
};

export default Invite;
