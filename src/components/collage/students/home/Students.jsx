import React, { useEffect } from "react";
import Header from "./Header";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getStudent } from "../../../../redux/features/dashboard/dashboardSlice";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.dashboard);

 useEffect(() => {
  dispatch(getStudent())
  console.log(students)
  
 }, [dispatch])
 
  return (
    <div>
      <Header />

      <div className="w-11/12 flex justify-between mx-auto gap-1">
        {/* New students joined */}
        <div className="h-96 w-[48%] bg-gray-100 overflow-y-scroll scroll rounded-lg">
          <span className="flex justify-between font-bold text-sm px-4 py-2">
            <h2>New Students Joined</h2>
            <h2 className="text-gray-400">...</h2>
          </span>
          <div className=" grid-cols-3 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
            {" "}
            {/* row-2 */}
            <div className={` flex `}>
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
              <span className="flex justify-center h-fit self-center gap-2">
                <h2
                  className="font-dmSans text-xs font-bold text-white bg-blued p-2 rounded-lg cursor-pointer"
                  onClick={() => navigate("/collage/students/profile")}
                >
                  View CV
                </h2>

                <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center">
                  <TbFileDownload className="text-gray-400 h-6 w-6" />
                </h2>
              </span>
            </div>{" "}
          </div>
        </div>

        {/* Pending request */}
        <div className="h-96 w-[49%] bg-gray-100 overflow-y-scroll rounded-lg">
          <span className="flex justify-between font-bold text-sm px-4 py-2">
            <h2>Pending Request</h2>
            <h2 className="text-gray-400">...</h2>
          </span>
          <div className=" grid-cols-3 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
            {" "}
            {/* row-2 */}
            <div className={` flex `}>
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
          </div>
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
          <h2>Latest Assessment</h2>{" "}
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
      <div className=" grid-cols-6 rounded-lg my-2 py-2 pl-2 text-center w-11/12 mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-gray-200">
        {" "}
        {/* row-2 */}
        <div className={` flex `}>
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
          <div className=" self-center h-fit">
            <span>
              <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                Designation
              </h2>
              <h2 className="font-dmSans font-medium text-xs sm:text-xs inline">
                {" "}
                City in{" "}
                <h3 className="inline break-words text-gray-400">Country</h3>
              </h2>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="self-center ">
            <h2 className="font-dmSans font-semibold text-sm sm:text-base text-green-500   ">
              300/<h2 className="inline text-black">500</h2>
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
              onClick={() => navigate("/collage/students/profile")}
            >
              View CV
            </h2>

            <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center">
              <TbFileDownload className="text-gray-400 h-6 w-6" />
            </h2>
          </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default Students;
