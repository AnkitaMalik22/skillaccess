import React, { useState,useEffect} from "react";

import Header from "./Header";

import Details from "./Details";
import AssessmentList from "./AssessmentList";
import Education from "./Education";
import Skills from "./Skills";
import Results from "./Results";
import Portfolio from "./Portfolio";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentCV
} from "../../../../redux/collage/student/studentSlice";
const Profile = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(1);
  const dispatch = useDispatch();
  const {
    studentCV
  } = useSelector((state) => state.collegeStudents);

  useEffect(() => {
    dispatch(getStudentCV(id));
  }, [dispatch,id]);

  console.log(studentCV);
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-12 w-[96%] mt-1 mx-auto border-gray-200  ">
        <div className="col-span-9 rounded-lg mt-3  ">
          <Details student={studentCV} />
          {/* toggler */}
          <div className="bg-gray-50 p-4 mt-4 rounded-lg">
            <span className="grid grid-cols-4 text-xs font-bold border-b border-spacing-0 border-gray-200">
              <h2
                className={`${
                  toggle === 1 ? "text-blue-500 border-b-4 border-blue-500" : ""
                } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                onClick={() => setToggle(1)}
              >
                Education
              </h2>
              <h2
                className={`${
                  toggle === 2 ? "text-blue-500 border-b-4 border-blue-500" : ""
                } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                onClick={() => setToggle(2)}
              >
                Skills
              </h2>
              <h2
                className={`${
                  toggle === 3 ? "text-blue-500 border-b-4 border-blue-500" : ""
                } w-fit px-12 pb-2 hover:cursor-pointer mx-auto`}
                onClick={() => setToggle(3)}
              >
                Assessment Results
              </h2>
              <h2
                className={`${
                  toggle === 4 ? "text-blue-500 border-b-4 border-blue-500" : ""
                } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
                onClick={() => setToggle(4)}
              >
                Portfolio
              </h2>
            </span>

            {toggle === 1 ? (
              <Education Education={studentCV?.Education}/>
            ) : toggle === 2 ? (
              <Skills  skills={studentCV?.Skills}/>
            ) : toggle === 3 ? (
              <Results />
            ) : (
              <Portfolio Portfolio={studentCV?.Portfolio} />
            )}
          </div>
        </div>

        {/* right side */}
        <div className=" col-start-10 col-span-3 w-10/12  ml-10 bg-gray-50  rounded-lg  mt-3 pb-4 h-full max-h-[85vh] basis-full font-dmSans sm:block sm:basis-auto pt-2 ">
          <AssessmentList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
