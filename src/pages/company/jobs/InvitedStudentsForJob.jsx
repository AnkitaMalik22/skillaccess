import React, { useEffect } from "react";
import List from "../../../components/company/invitation/List";
import Header from "../../../components/company/invitation/Header";
import Footer from "../../../components/company/invitation/Footer.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { getTest } from "../../../redux/college/test/thunks/test.js";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const InvitedStudentsForJob = () => {
  const navigate = useNavigate();
  const { students, test } = useSelector((state) => state.test);
  const [filteredStudents, setStudents] = React.useState(students);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const testId = searchParams.get("assessment");
  // console.log(testId);

  // const handleFilterStudents = (e) => {
  //   const value = e.target.value;
  //   if (value === "" || value.trim() === "") {
  //     setStudents(students);
  //     return;
  //   } else {
  //     setStudents(
  //       students.filter((student) => {
  //         const regex = new RegExp(value, "i");
  //         return (
  //           regex.test(student.FirstName) ||
  //           regex.test(student.LastName) ||
  //           regex.test(student.Email)
  //         );
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    dispatch(getTest(testId));
  }, [dispatch, testId]);
  console.log(test);

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full flex justify-between">
        <div className="flex gap-3 px-4">
          <button
            className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft className="h-5 w-5" />
          </button>
        </div>
        <div
          name=""
          id=""
          className="rounded-md  focus:outline-none border-none  p-5 font-bold text-2xl"
        >
          {test?.name}
        </div>
        {/* <Footer students={students} endDate={test?.endDate} /> */}
      </div>
      <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-md p-5 focus:ring-0placeholder-gray-400 mb-6">
        {/* back btn */}

        {/* <Header
            handleFilter={handleFilterStudents}
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
            /> */}
        <List
          setStudents={setStudents}
          uploadedStudents={filteredStudents}
          students={test?.invitedStudents}
        />
      </div>
    </div>
  );
};

export default InvitedStudentsForJob;
