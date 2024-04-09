import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { getStudents,setLoading } from "../../../../redux/collage/student/studentSlice";


const Invite = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const testDetails = JSON.parse(localStorage.getItem("testDetails"));


  const { uploadedStudents,loading} = useSelector((state) => state.collegeStudents);
  const {user } = useSelector((state) => state.collageAuth);
 useEffect(() => {
  dispatch(getStudents({id: user?._id}))
  // console.log(students)

 }, [dispatch])


  useEffect(() => {
    if (!loading) {
      dispatch(getStudents({id: user?._id}))
      dispatch(setLoading(false))
    }
    
      }, [loading])
    
  console.log(uploadedStudents)
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
              {localStorage.getItem("testName")}
            </div>
          </div>

          <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg  px-7 pt-3 pb-8 focus:ring-0placeholder-gray-400 mb-6">
            <Header />
            <List setStudents={setStudents} uploadedStudents={uploadedStudents} students={students}/>
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
