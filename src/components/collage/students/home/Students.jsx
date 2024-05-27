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
    setFilteredStudents(uploadedStudents);
  }, [uploadedStudents]);

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
  console.log(uploadedStudents);
  return (
    <div className="w-11/12 mx-auto py-5 md:py-10">
      <Header handleFilter={handleFilterStudents} />

      <div className="w-full flex justify-between md:gap-10 gap-5 flex-wrap md:flex-nowrap md:mb-10 mb-5">
        {/* New students joined */}
        <div className="h-96 w-2/3 bg-[#F8F8F9] overflow-y-scroll scroll rounded-3xl py-8 px-5">
          <span className="flex justify-between items-center font-bold text-base text-[#171717] mb-5 md:mb-8">
            <h2>Invited Students</h2>
            <h2 className="text-[#8F92A1] text-xl tracking-[4px]">...</h2>
          </span>
          {filteredStudents?.map((student, index) => (
            <div className="flex rounded-2xl justify-between items-center  text-center mx-auto  font-dmSans font-semibold text-base bg-white mb-3 p-4 flex-wrap">
              {" "}
              {/* row-2 */}
              <div className="flex justify-between gap-2">
                <div className="flex self-center items-center gap-3">
                  <div className="w-11  h-11 self-center  flex items-center justify-center text-xl ">
                    <img
                      src="../../images/teams.png"
                      alt=" user-icon"
                      className=" rounded-lg w-11 h-11"
                    />
                  </div>
                  <h2 className="font-dmSans capitalize font-semibold text-sm text-[#171717] text-start">
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
              <div className="font-dmSans font-semibold text-sm text-[#7F7F7F] lowercase break-words">
                {student?.Email}
              </div>
            </div>
          ))}
        </div>

        {/* Pending request */}
        <div className="h-96 w-2/3 bg-[#F8F8F9] overflow-y-scroll scroll rounded-3xl py-8 px-5">
          <span className="flex justify-between items-center font-bold text-base text-[#171717] mb-5 md:mb-8">
            <h2>Pending Requests</h2>
            <h2 className="text-[#8F92A1] text-xl tracking-[4px]">...</h2>
          </span>

          {pendingStudents?.map((student, index) => (
            <div className="flex rounded-2xl justify-between items-center  text-center mx-auto  font-dmSans font-semibold text-base bg-white mb-3 p-4 gap-3 flex-wrap xl:flex-nowrap ">
              {" "}
              {/* row-2 */}
              <div className="flex">
                <div className="flex self-center">
                  <div className="self-center gap-3 flex items-center justify-between">
                    {" "}
                    <img
                      src="../../images/teams.png"
                      alt=" user-icon"
                      className=" rounded-lg w-11 h-11"
                    />
                    <h2 className="font-dmSans capitalize font-semibold text-sm text-[#171717] text-start">
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
              <div className="font-dmSans font-semibold text-sm text-[#7F7F7F] lowercase break-words">
                {student?.Email}
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
              <div className="flex  self-center gap-3">
                <h2
                  className="font-dmSans text-xs font-bold text-white bg-[#95ACFA] p-2 rounded-lg cursor-pointer"
                  onClick={() =>
                    navigate(`/collage/students/profile/${student._id}`)
                  }
                >
                  View CV
                </h2>

                <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
                  <TbFileDownload className="text-[#B5B5BE] h-6 w-6" />
                </h2>
              </div>
              {/* </div>{" "} */}
            </div>
          ))}
        </div>
      </div>

      {/* lower half */}
      {/* legend */}
      <div className="text-center mb-6  mx-auto font-dmSans font-bold text-base bg-[#0052cc0d] px-2 py-3 rounded-xl">
        <div className="grid-cols-6 md:grid">
          <h2>Name of the Student</h2>
          <h2>Education</h2>
          <h2>Last Assessment</h2> <h2>Current Assessment</h2>
          <h2>Performance</h2>
          <h2>Resume</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {console.log(approvedStudents)}
      {approvedStudents?.map((student, index) => (
        <div className=" grid-cols-6 rounded-2xl  p-2 text-center mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-gray-100 mb-4 ">
          {" "}
          {/* row-2 */}
          <div className="flex gap-3 items-center justify-center">
            <div className="w-11  h-11 self-center  flex items-center justify-center text-xl ">
              <img
                src="../../images/teams.png"
                alt=" user-icon"
                className=" rounded-lg w-11 h-11"
              />
            </div>
            <h2 className="font-dmSans capitalize font-semibold text-sm text-[#171717] text-start">
              {student?.FirstName + " " + student?.LastName}
            </h2>
          </div>
          <div className="flex justify-center flex-col">
            <h2 className="font-dmSans font-normal text-sm text-[#7F7F7F]">
              {student?.Education[0]?.EndDate.substring(0, 4)}
            </h2>
            <h2 className="font-dmSans font-bold text-sm inline text-[#0052CC]">
              {" "}
              {student?.Education[0]?.Degree}
            </h2>
          </div>
          <div className="flex justify-center flex-col">
            <h2 className="font-dmSans font-normal text-sm text-[#171717]">
            {
  student?.studentResponses &&  student?.studentResponses?.length >0 
    ? student?.studentResponses?.length >= 2
      ? student?.studentResponses[student?.studentResponses?.length - 2]?.assessmentId?.name
      : student?.studentResponses[student?.studentResponses?.length - 1]?.assessmentId?.name
    : 'Not Available'
}
            </h2>
            {/* <h2 className="font-dmSans font-bold text-sm inline text-[#0052C#171717C]">
              Mailchimp
              <span className="inline font-normal break-words text-[#8F92A1]">
                , in London, UK
              </span>
            </h2> */}
          </div>
          <div className="flex justify-center flex-col">
            <h2 className="font-dmSans font-normal text-sm text-[#171717]">
            {
  student?.studentResponses &&  student?.studentResponses?.length >0 
    ? student?.studentResponses[student?.studentResponses?.length - 1]?.assessmentId?.name
    : 'Not Available'
}
            </h2>
            {/* <h2 className="font-dmSans font-bold text-sm inline text-[#0052C#171717C]">
              Mailchimp
              <span className="inline font-normal break-words text-[#8F92A1]">
                , in London, UK
              </span>
            </h2> */}
          </div>
          <div className="flex justify-center">
            <div className=" self-center">
              <span>
                <div className="min-w-[4rem] bg-gray-300 rounded-lg h-2 mx-auto">
                  <div className="w-3/4 bg-[#00875A] h-full rounded-lg"></div>
                </div>
                <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                  {" "}
                  Good
                </h2>
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <h2
              className="font-dmSans text-xs font-bold text-white bg-[#95ACFA] p-2 rounded-lg cursor-pointer"
              onClick={() =>
                navigate(`/collage/students/profile/${student._id}`)
              }
            >
              View CV
            </h2>

            <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
              <TbFileDownload className="text-[#B5B5BE] h-6 w-6" />
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Students;
