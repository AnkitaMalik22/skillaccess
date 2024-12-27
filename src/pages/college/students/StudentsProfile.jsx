import React, { useState, useEffect } from "react";
import Header from "../../../components/college/students/profile/Header";
import Details from "../../../components/college/students/profile/Details";
import AssessmentList from "../../../components/college/students/profile/AssessmentList";
import Education from "../../../components/college/students/profile/Education";
import Skills from "../../../components/college/students/profile/Skills";
import Results from "../../../components/college/students/profile/Results";
import Portfolio from "../../../components/college/students/profile/Portfolio";
import Loader from "../../../Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCV } from "../../../redux/college/student/studentSlice";
import useTranslate from "../../../hooks/useTranslate";

const StudentsProfile = () => {
  //useTranslate();
  const { id } = useParams();
  const [toggle, setToggle] = useState(1);
  const dispatch = useDispatch();
  const { studentCV, GET_STUDENT_LOADING, pagination } = useSelector(
    (state) => state.collegeStudents
  );

  useEffect(() => {
    dispatch(getStudentCV({ studentId: id, page: 1 }));
  }, [dispatch, id]);

  //console.log(studentCV.studentResponses);
  return (
    <div className="h-screen flex flex-col">
      {GET_STUDENT_LOADING ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="flex-grow flex overflow-hidden">
            <div className="flex-grow overflow-auto">
              <div className="grid grid-cols-12 mx-auto border-gray-200 h-full">
                <div className="col-span-9 rounded-2xl overflow-auto">
                  <Details student={studentCV} />
                  {/* toggler */}
                  <div className="bg-gray-50 p-4">
                    <span className="grid grid-cols-4 text-xs font-bold border-b border-spacing-0 border-gray-200">
                      <h2
                        className={`${toggle === 1
                          ? "text-blued border-b-4 border-blued"
                          : ""
                          } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                        onClick={() => setToggle(1)}
                      >
                        Assessment Results
                      </h2>
                      <h2
                        className={`${toggle === 2
                          ? "text-blued border-b-4 border-blued"
                          : ""
                          } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                        onClick={() => setToggle(2)}
                      >
                        Skills
                      </h2>
                      <h2
                        className={`${toggle === 3
                          ? "text-blued border-b-4 border-blued"
                          : ""
                          } w-fit px-12 pb-2 hover:cursor-pointer mx-auto`}
                        onClick={() => setToggle(3)}
                      >
                        Education
                      </h2>
                      <h2
                        className={`${toggle === 4
                          ? "text-blued border-b-4 border-blued"
                          : ""
                          } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                        onClick={() => setToggle(4)}
                      >
                        Portfolio
                      </h2>
                    </span>
                    <div className="overflow-auto">
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
                </div>

                {/* right side */}
                <div className="col-start-10 col-span-3 w-10/12 ml-10 bg-gray-50 rounded-lg mt-3 pb-4 basis-full font-dmSans sm:block sm:basis-auto pt-2 overflow-hidden">
                  <AssessmentList id={id} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default StudentsProfile;
