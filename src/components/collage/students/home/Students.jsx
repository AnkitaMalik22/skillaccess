import React, { useEffect } from "react";
import Header from "./Header";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  approveStudent,
  setLoading,
} from "../../../../redux/collage/student/studentSlice";
import PopUp from "./PopUp";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [sId, setSId] = React.useState(null);
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const {
    uploadedStudents,
    approvedStudents,
    pendingStudents,
    loading,
    GET_STUDENT_LOADING,
  } = useSelector((state) => state.collegeStudents);

  const { user } = useSelector((state) => state.collageAuth);

  console.log(pendingStudents);
  //  useEffect(() => {
  // async()=>{
  //  await dispatch(getStudents({id: user?._id}))

  // setFilteredStudents(uploadedStudents)
  // }

  // console.log(filteredStudents, "filteredStudents")

  //   // console.log(students)

  //  }, [])

  //  useEffect(() => {
  // if (!loading)
  // {
  //   console.log("loading", loading, user?._id,user)
  //  //await dispatch(getStudents({id: user?._id}))
  //   //await  setFilteredStudents(uploadedStudents)

  //   dispatch(setLoading(false))

  // }

  // console.log(filteredStudents, "filteredStudents")
  // //if (user) {
  //  // setFilteredStudents(uploadedStudents)
  // //}

  //   }, [loading,])

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        await dispatch(getStudents({ id: user?._id }));
      }
    };

    fetchData();
  }, [dispatch, user]);

  useEffect(() => {
    // Update filtered students when uploadedStudents changes
    // For simplicity, assuming uploadedStudents is the same as filteredStudents initially
    setFilteredStudents(uploadedStudents);
  }, [uploadedStudents]);

  console.log(filteredStudents, "filteredStudents");

  const handleApprove = (studentId) => {};

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");

      setFilteredStudents(uploadedStudents);
         console.log(uploadedStudents);
      return;
    } else {
      setFilteredStudents(
        uploadedStudents.filter((student) => {
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

  return (
    <div>
      <Header handleFilter={handleFilterStudents} />
      {/* {visible && (
        <PopUp
          visible={visible}
          handleSave={handleApprove}
          studentId={sId}
          handleOverlay={() => {
            setVisible(false);
          }}
        />
      )} */}
      <div className="w-11/12 flex justify-between mx-auto gap-1">
        {/* New students joined */}
        <div className="h-96 w-1/3 bg-gray-100 overflow-y-scroll scroll rounded-lg">
          <span className="flex justify-between font-bold text-sm px-4 py-2">
            <h2>Invited Students</h2>
            <h2 className="text-gray-400">...</h2>
          </span>
          {filteredStudents?.map((student, index) => (
            <div className=" grid-cols-2 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
              {" "}
              {/* row-2 */}
              <div className={` flex `}>
                <div className="flex self-center items-center">
                  <div className=" min-w-[3rem]  h-12 self-center  mr-2 flex items-center justify-center text-xl ">
                    <img
                      src="../../images/student.png"
                      alt=""
                      width="50px"
                      height="50px"
                    />
                  </div>
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base text-start">
                    {student?.FirstName + " " + student?.LastName}
                  </h2>

                  {/* <span className="break-words min-w-0 pt-1 ">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                    Role
                  </h2>
                  <h2 className="font-dmSans font-medium text-xs break-words text-gray-400">
                    {" "}
                   Student
                  </h2>
                </span> */}
                </div>
              </div>
              <div className="flex justify-center items-center  " >
                <h2 className="font-dmSans font-semibold text-sm    sm:text-base text-gray-400 w-3/4" style={{ wordWrap: 'break-word'}} >
                  {student?.Email}
                </h2>
                <div className=" self-center h-fit">
                  {/* <span>
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base text-gray-400">
                    Year
                  </h2>
                  <h2 className="font-dmSans font-base text-xs sm:text-xs inline text-blue-500">
                    {" "}
                    Degree
                  </h2>
                </span> */}
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Pending request */}
        <div className="h-96 w-2/3 bg-gray-100 overflow-y-scroll rounded-lg">
          <span className="flex justify-between font-bold text-sm px-4 py-2">
            <h2>Pending Request</h2>
            <h2 className="text-gray-400">...</h2>
          </span>

          {pendingStudents?.map((student, index) => (
            
            <div className=" grid-cols-3 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
              {" "}
              {/* row-2 */}
              <div className={` flex `}>
                <div className="flex self-center">
                  <div className=" min-w-[3rem]  h-12 self-center gap-2  mr-2  flex items-center justify-center ">
                    {" "}
                    <img
                      src="../../images/student.png"
                      alt=""
                      width="50px"
                      height="50px"
                    />
                    <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                    {student?.FirstName + " " + student?.LastName}
                  </h2>
                  </div>
                  

                  {/* <span className="break-words min-w-0 pt-1 ">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                    Role
                  </h2>
                  <h2 className="font-dmSans font-medium text-xs break-words text-gray-400">
                    {" "}
                   Student
                  </h2>
                </span> */}
                </div>
              </div>
              <div className="flex justify-center ">
              <h2 className="font-dmSans font-semibold text-sm    sm:text-base text-gray-400 w-full" style={{ wordWrap: 'break-word'}} >
                  {student?.Email}
                </h2>
                <div className=" self-center h-fit"></div>
              </div>
              {/* <div className="flex item-center gap-2"> */}
              {/* <button
                className="flex justify-center"
                onClick={() => {
                  setVisible(true);
                  setSId(student?._id);
                }}
              >
                <span className="flex justify-center h-fit self-center gap-2 bg-[#DE350B66] bg-opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:cursor-pointer">
                  Approve Request
                </span>
              </button> */}
              
                <span className="flex  h-fit self-center gap-2 ml-8">
                  <h2
                    className="font-dmSans text-xs font-bold text-white bg-blued p-2 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/collage/students/profile/${student._id}`)}
                  >
                    View CV
                  </h2>

                  <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
                    <TbFileDownload className="text-gray-400 h-6 w-6" />
                  </h2>
                </span>
              {/* </div>{" "} */}
            </div>
          ))}

          {/* <div className=" grid-cols-3 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
            {" "}
            {/* row-2 */}
          {/* <div className={` flex `}>
              <div className="flex self-center">
                <div className=" min-w-[3rem]  h-12 self-center bg-red-600 mr-2  "></div>
                <span className="break-words min-w-0 pt-1 ">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                    Role
                  </h2>
                  <h2 className="font-dmSans font-medium text-xs break-words text-gray-400">
                    {" "}
                    CompanyName
                  </h2>
                </span>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base text-gray-400">
                    Year
                  </h2>
                  <h2 className="font-dmSans font-base text-xs sm:text-xs inline text-blue-500">
                    {" "}
                    Degree
                  </h2>
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <span className="flex justify-center h-fit self-center gap-2 bg-[#DE350B66] bg-opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:cursor-pointer">
                Approve Request
              </span>
            </div>{" "}
          </div> */}
        </div>
      </div>

      {/* lower half */}
      {/* legend */}
      <div className=" grid-cols-6  text-center w-11/12 mx-auto mt-4 font-dmSans font-semibold text-base hidden md:grid">
        <div className="bg-[#0052cc1f] rounded-s-lg p-2 ">
          <h2>Name of the Student</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Education</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Last Assessment</h2>{" "}
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Current Assessment</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2">
          <h2>Performance</h2>
        </div>
        <div className="bg-[#0052cc1f] p-2 rounded-e-lg">
          <h2>Resume</h2>
        </div>
      </div>

      {/* list to be iterated */}

      {approvedStudents?.map((student, index) => (
        <div className=" grid-cols-6 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-gray-100 ">
          {" "}
          {/* row-2 */}
          <div className={` flex `}>
            <div className="flex self-center">
              <div className=" min-w-[3rem]  h-12 self-center mr-2  flex items-center justify-center">
                <img
                  src="../../images/student.png"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </div>
              <span className="break-words min-w-0 pt-1 flex items-center ">
                <h2 className="font-dmSans font-semibold text-sm sm:text-base  ">
                  {student?.FirstName + " " + student?.LastName}
                </h2>
                {/* <h2 className="font-dmSans font-medium text-xs break-words text-gray-400">
                {" "}
                CompanyName
              </h2> */}
              </span>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans font-semibold text-sm sm:text-base text-gray-400">
                  {student?.Education[0]?.EndDate.substring(0,4)}
                </h2>
                <h2 className="font-dmSans font-base text-xs sm:text-xs inline text-blue-500">
                  {" "}
                  {student?.Education[0]?.Degree}

                </h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                  Midweight UI/UX Designer
                </h2>
                <h2 className="font-dmSans font-medium text-xs sm:text-xs inline">
                  {" "}
                  Mailchimp{" "}
                  <h3 className="inline break-words text-gray-400">
                    in London, UK
                  </h3>
                </h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <span>
              <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                Midweight UI/UX Designer
              </h2>
              <h2 className="font-dmSans font-medium text-xs sm:text-xs inline">
                {" "}
                Mailchimp{" "}
                <h3 className="inline break-words text-gray-400">
                  in London, UK
                </h3>
              </h2>
            </span>
          </div>
          <div className="flex justify-center">
            <div className=" self-center">
              <span>
                <div className="min-w-[4rem] bg-gray-300 rounded-lg h-2 mx-auto">
                  <div className="w-3/4 bg-green-600 h-full rounded-lg"></div>
                </div>
                <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                  {" "}
                  Good
                </h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="flex justify-center h-fit self-center gap-2">
              <h2
                className="font-dmSans text-xs font-bold text-white bg-blued p-2 rounded-lg cursor-pointer"
                onClick={() => navigate(`/collage/students/profile/${student._id}`)}
              >
                View CV
              </h2>

              <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center">
                <TbFileDownload className="text-gray-400 h-6 w-6" />
              </h2>
            </span>
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default Students;
