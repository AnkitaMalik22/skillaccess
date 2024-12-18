import React, { useEffect ,useState } from "react";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../../redux/college/student/studentSlice";
import useTranslate from "../../../hooks/useTranslate";
import Header from "../../../components/college/students/Header";
import Skeleton from "../../../components/loaders/Skeleton";
import { FcNext, FcPrevious } from "react-icons/fc";
import { isUni } from "../../../util/isCompany";

const Students = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterType, setFilterType] = useState('all students');
  const [batch, setBatch] = useState("all");
  const [createdAt, setCreatedAt] = useState("");
  const {
    uploadedStudents,
    approvedStudents,
    pendingStudents,
    GET_STUDENT_LOADING,
  } = useSelector((state) => state.collegeStudents);

  const { user } = useSelector((state) => {return (!isUni() ?  state.collegeAuth :  state.universityAuth)});

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        await dispatch(getStudents({ id: user?._id , batch , filterType, createdAt , page : 1 , limit : 10}));
      }
    };
    

    fetchData();
  }, [dispatch, user,batch,filterType,createdAt]);

  

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


  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // You can adjust this value
  const totalPages = Math.ceil(approvedStudents );

  useEffect(() => {
 dispatch(getStudents({ id: user?._id , batch , filterType, createdAt , page : currentPage , limit : studentsPerPage}));

  }, [currentPage, studentsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 ) {
      setCurrentPage(newPage);
    }
  }
  return (
    <>
      <Header handleFilter={handleFilterStudents} setYear={setBatch} year={batch} setCreatedAt={setCreatedAt} createdAt={createdAt} filterType={filterType} setFilterType={setFilterType} />

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
                        src="/images/defaultUser.jpg"
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
                        src="/images/defaultUser.jpg"
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
                    className="font-dmSans text-xs font-bold text-white bg-accent p-2 rounded-lg cursor-pointer"
                    onClick={() =>
                      navigate(`/${isUni() ?"university/pr" :"college" }/students/profile/${student._id}`)
                    }
                  >
                    View
                  </h2>

                  <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer">
                    <TbFileDownload className="text-lightBlue h-6 w-6" />
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
      {/* {console.log(approvedStudents) } */}
      <div className="space-y-4">
      {/* Student List */}
      {GET_STUDENT_LOADING ? (
        <Skeleton />
      ) : (
        <div className="space-y-4">
          {approvedStudents?.map((student, index) => (
            <div 
              key={student._id} 
              className="grid-cols-6 rounded-2xl p-2 text-center mx-auto font-dmSans font-semibold text-base hidden md:grid bg-gray-100 hover:border-accent hover:cursor-pointer hover:border"
              onClick={() =>
                //  navigate(`/college/students/profile/${student._id}`)
                navigate(`/${isUni() ?"university/pr" :"college" }/students/profile/${student._id}`)
                }  
            >

              <div className=" grid grid-cols-5 col-span-5">
                    {/* Student Info */}
              <div className="flex gap-3 items-center">
                <div className="w-11 h-11 self-center flex items-center justify-center text-xl">
                  <img
                    src={student?.avatar?.url ||"/images/defaultUser.jpg"}
                    alt="user-icon"
                    className="rounded-lg w-11 h-11"
                  />
                </div>
                <h2 className="font-dmSans capitalize font-semibold text-sm text-[#171717] text-start">
                  {student?.FirstName + " " + student?.LastName}
                </h2>
              </div>

              {/* Education */}
              <div className="flex justify-center flex-col">
                <h2 className="font-dmSans font-normal text-sm text-[#7F7F7F]">
                  {student?.Education[0]?.EndDate.substring(0, 4)}
                </h2>
                <h2 className="font-dmSans font-bold text-sm inline text-blued">
                  {student?.Education[0]?.Degree}
                </h2>
              </div>

              {/* Previous Assessment */}
              <div className="flex justify-center flex-col">
                <h2 className="font-dmSans font-normal text-sm text-[#171717]">
                  {student?.studentResponses?.length > 1
                    ? student?.studentResponses[student?.studentResponses?.length - 2]?.assessmentId?.name
                    : "Not Available"}
                </h2>
              </div>

              {/* Latest Assessment */}
              <div className="flex justify-center flex-col">
                <h2 className="font-dmSans font-normal text-sm text-[#171717]">
                  {student?.studentResponses?.length > 0
                    ? student?.studentResponses[student?.studentResponses?.length - 1]?.assessmentId?.name
                    : "Not Available"}
                </h2>
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <div className="self-center">
                  <span>
                    <h2 className="font-dmSans font-bold text-xs sm:text-xs">
                      Not available
                    </h2>
                  </span>
                </div>
              </div>
              </div>
            

              {/* Actions */}
              <div className="flex justify-center items-center gap-3">
                {/* <button
                  className="font-dmSans text-xs font-bold text-white bg-accent p-2 rounded-lg hover:bg-accent/90 transition-colors"
                  onClick={() =>
                    //  navigate(`/college/students/profile/${student._id}`)
                    navigate(`/${isUni() ?"university/pr" :"college" }/students/profile/${student._id}`)
                    }  
                >
                  View
                </button> */}
                <button className="text-lightBlue hover:text-lightBlue/80 transition-colors">
                  <TbFileDownload className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
          {
            approvedStudents?.length === 0 && (
              <div className="text-center text-gray-500">
                <h2 className="text-lg">No students found</h2>
              </div>
            )
          }

        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          {/* <ChevronLeft className="w-5 h-5" /> */}
          <FcPrevious className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {/* First Page */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                1
              </button>
              {currentPage > 3 && <span className="text-gray-400">...</span>}
            </>
          )}

          {/* Current Page and Neighbors */}
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const pageNum = Math.max(
              1,
              Math.min(
                currentPage - 1 + i,
                totalPages
              )
            );
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-accent text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Last Page */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          <FcNext className="w-5 h-5" />
          {/* <ChevronRight className="w-5 h-5" /> */}
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center text-sm text-gray-500 mt-2">
        Page {currentPage} 
        {/* Showing  */}
         {/* to {Math.min(currentPage * studentsPerPage, approvedStudents?.length)}  */}
        {/* of {approvedStudents?.length} students */}
      </div>
    </div>
    </>
  );
};

export default Students;
