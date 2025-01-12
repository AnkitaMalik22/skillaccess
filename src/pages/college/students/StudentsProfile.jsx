import React, { useState, useEffect } from "react";
import Header from "../../../components/college/students/profile/Header";
import Details from "../../../components/college/students/profile/Details";
import Education from "../../../components/college/students/profile/Education";
import Skills from "../../../components/college/students/profile/Skills";
import Results from "../../../components/college/students/profile/Results";
import Portfolio from "../../../components/college/students/profile/Portfolio";
import Loader from "../../../components/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCV } from "../../../redux/college/student/studentSlice";

const StudentsProfile = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(1);
  const dispatch = useDispatch();
  const { studentCV, GET_STUDENT_LOADING, pagination } = useSelector(
    (state) => state.collegeStudents
  );

  useEffect(() => {
    dispatch(getStudentCV({ studentId: id, page: 1 }));
  }, [dispatch, id]);

  return (
    <div className=" flex flex-col">
      {GET_STUDENT_LOADING ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="">
            {/* Main Content */}
            <Details student={studentCV} />
            <div className="flex-grow flex flex-col bg-white shadow-lg rounded-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-gray-100 border-b border-gray-200">
                <div className="flex justify-around text-sm font-bold">
                  {[
                    "Assessment Results",
                    "Skills",
                    "Education",
                    "Portfolio",
                  ].map((tab, index) => (
                    <div
                      key={index}
                      className={`px-6 py-3 cursor-pointer transition-all ${
                        toggle === index + 1
                          ? "text-blued border-b-4 border-blued"
                          : "text-gray-500 hover:text-blued"
                      }`}
                      onClick={() => setToggle(index + 1)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-grow overflow-auto bg-snow rounded-md">
                {toggle === 1 ? (
                  <Results
                    assessmentResult={studentCV?.studentResponses}
                    pagination={pagination}
                    id={id}
                  />
                ) : toggle === 2 ? (
                  <Skills skills={studentCV?.Skills} />
                ) : toggle === 3 ? (
                  <Education Education={studentCV?.Education} />
                ) : (
                  <Portfolio Portfolio={studentCV?.Portfolio} />
                )}
              </div>
            </div>

            {/* Sidebar */}
            {/* <div className="w-1/4 ml-4 bg-white shadow-lg rounded-md p-4 hidden lg:block">
              <AssessmentList id={id} />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentsProfile;
