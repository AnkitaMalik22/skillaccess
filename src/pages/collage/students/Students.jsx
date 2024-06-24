import React, { useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../../redux/collage/student/studentSlice";
import useTranslate from "../../../hooks/useTranslate";
import Header from "../../../components/collage/students/Header";
import Skeleton from "../../../components/loaders/Skeleton";

const Students = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const {
    uploadedStudents,
    approvedStudents,
    pendingStudents,
    GET_STUDENT_LOADING,
  } = useSelector((state) => state.collegeStudents);

  const { user } = useSelector((state) => state.collageAuth);

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

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      setFilteredStudents(uploadedStudents);
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
    }
  };
  return (
    <>
      <Header handleFilter={handleFilterStudents} />

      <div className="w-full flex justify-between md:gap-10 gap-5 flex-wrap md:flex-nowrap md:mb-10 mb-5">
        {/* New students joined */}
        <div className="h-96 w-2/3 bg-[#F8F8F9] overflow-y-scroll scroll rounded-3xl py-8 px-5">
          <span className="flex justify-between items-center font-bold text-base text-[#171717] mb-5 md:mb-8">
            <h2>Invited Students</h2>
            <h2 className="text-[#8F92A1] text-xl tracking-[4px]">...</h2>
          </span>
          {GET_STUDENT_LOADING ? (
            <Skeleton />
          ) : (
            filteredStudents?.map((student, index) => (
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
                  </div>
                </div>
                <div className="font-dmSans font-semibold text-sm text-[#7F7F7F] lowercase break-words">
                  {student?.Email}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pending request */}
        <div className="h-96 w-2/3 bg-[#F8F8F9] overflow-y-scroll scroll rounded-3xl py-8 px-5">
          <span className="flex justify-between items-center font-bold text-base text-[#171717] mb-5 md:mb-8">
            <h2>Pending Requests</h2>
            <h2 className="text-[#8F92A1] text-xl tracking-[4px]">...</h2>
          </span>

          {GET_STUDENT_LOADING ? (
            <Skeleton />
          ) : (
            pendingStudents?.map((student, index) => (
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
                  </div>
                </div>
                <div className="font-dmSans font-semibold text-sm text-[#7F7F7F] lowercase break-words">
                  {student?.Email}
                </div>
                <div className="flex  self-center gap-3">
                  <h2
                    className="font-dmSans text-xs font-bold text-white bg-[#95ACFA] p-2 rounded-lg cursor-pointer"
                    onClick={() =>
                      navigate(`/collage/students/profile/${student._id}`)
                    }
                  >
                    View
                  </h2>

                  <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
                    <TbFileDownload className="text-[#B5B5BE] h-6 w-6" />
                  </h2>
                </div>
                {/* </div>{" "} */}
              </div>
            ))
          )}
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
      {GET_STUDENT_LOADING ? (
        <Skeleton />
      ) : (
        approvedStudents?.map((student, index) => (
          <div className=" grid-cols-6 rounded-2xl  p-2 text-center mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-gray-100 mb-4 ">
            {" "}
            {/* row-2 */}
            <div className="flex gap-3 items-center ">
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
                {student?.studentResponses &&
                student?.studentResponses?.length > 0
                  ? student?.studentResponses?.length >= 2
                    ? student?.studentResponses[
                        student?.studentResponses?.length - 2
                      ]?.assessmentId?.name
                    : student?.studentResponses[
                        student?.studentResponses?.length - 1
                      ]?.assessmentId?.name
                  : "Not Available"}
              </h2>
            </div>
            <div className="flex justify-center flex-col">
              <h2 className="font-dmSans font-normal text-sm text-[#171717]">
                {student?.studentResponses &&
                student?.studentResponses?.length > 0
                  ? student?.studentResponses[
                      student?.studentResponses?.length - 1
                    ]?.assessmentId?.name
                  : "Not Available"}
              </h2>
            </div>
            <div className="flex justify-center">
              <div className=" self-center">
                <span>
                  <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                    Not available
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
                View
              </h2>

              <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
                <TbFileDownload className="text-[#B5B5BE] h-6 w-6" />
              </h2>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Students;
