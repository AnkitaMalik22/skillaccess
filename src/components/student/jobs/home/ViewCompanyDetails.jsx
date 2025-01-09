import React from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import Header from "./Header";
const ViewCompanyDetails = () => {
  return (
    <div>
      <div className="mt-4">
        <Header />
      </div>

      <div className="sm:flex w-[95%] mx-auto justify-between mb-2 font-dmSans mt-8">
        <div className="sm:w-[45%]">
          <div className="w-full bg-gray-100 rounded-t-3xl h-56 relative">
            <img
              src="/images/job.png"
              alt=""
              className="w-full h-full rounded-t-3xl z-0 object-cover"
            />
          </div>
          <div className="w-full bg-gray-100 flex justify-between pt-14 pb-6 pr-10 pl-5">
            <div>
              <h2 className="font-bold text-lg">UX UI Designer</h2>
              <h2 className="text-sm font-medium mt-1">Google, Bengaluru</h2>
              <h2 className="text-sm font-medium mt-2 text-gray-400">
                Posted 1 week ago
              </h2>
            </div>
            <div className="self-center">
              <h2 className="text-gray-400 text-sm font-bold ">EMPLOYEES</h2>
              <h2 className="text-sm font-bold text-center mt-1">200+</h2>
            </div>
          </div>

          {/* /Requirements */}

          <div className="bg-gray-100 mt-2 px-6 grid grid-cols-4 text-sm font-bold text-center p-4 ">
            <span>
              <h2 className="text-gray-400 my-1">EXPERIENCE</h2>
              <h2>3-5 Years</h2>
            </span>
            <span>
              <h2 className="text-gray-400 my-1">SENIORITY LEVEL</h2>
              <h2>Medium Level</h2>
            </span>
            <span>
              <h2 className="text-gray-400 my-1">EMPLOYMENT</h2>
              <h2>Full-Time</h2>
            </span>
            <span>
              <h2 className="text-gray-400 my-1">SALARY</h2>
              <h2>$90-100K</h2>
            </span>
          </div>
          {/* Role Overview */}
          <div className="bg-gray-100 mt-2 px-6 ">
            <span className="">
              <h2 className="text-base font-bold pt-6 ">Role Overview</h2>
              <p className=" mt-2 text-sm text-gray-400 pb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                consectetur, blanditiis, rerum temporibus magnam illum maxime
                porro iste eum distinctio quisquam repudiandae assumenda atque
                sed vitae adipisci, iure nemo culpa?Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Molestias porro ratione saepe
                voluptatem atque distinctio quo voluptatum eius, officiis odio
                in et eaque excepturi ex repellat perferendis deserunt tempora
                esse. voluptatem atque distinctio quo voluptatum eius, officiis
                odio in et eaque excepturi ex repellat perferendis deserunt
                tempora esse.
              </p>
            </span>
          </div>

          {/* bullets */}
          <div className="bg-gray-100 mt-2 px-6 pb-6 rounded-b-lg">
            <span className="">
              <h2 className="text-base font-bold pt-6 mb-4">
                Duties & Responsibilities
              </h2>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blued mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
            </span>
          </div>
        </div>

        <div className="sm:w-[50%] ">
          {/* <div className=" w-full relative bg-gray-100 p-4 rounded-md">
          <h2 className="font-bold my-4">Number of Students Placed</h2>
          <div className="w-10/12">
            {" "}
            <ChartComp />
          </div>

          <h2 className="absolute bottom-9 right-9 font-bold text-gray-400">
            Updated 5 mins ago
          </h2>
        </div> */}

          {/*  */}
          <div className="flex justify-between mb-7 mt-4">
            <h2 className="font-bold">Similar jobs</h2>
            <h2 className="font-bold underline underline-offset-2 text-blued">
              See All
            </h2>
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div className="flex justify-between items-center w-[98%] bg-gray-100 rounded-md p-4 mt-4">
              <div className="sm:flex items-center">
                <div className="w-16 h-16 flex items-center mr-4 ">
                  <img
                    src="/images/companyLogo.png"
                    alt=""
                    className=" rounded-2xl "
                  />
                </div>
                <span className="">
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                    Role
                  </h2>
                  <h2 className="font-dmSans font-medium text-[.6rem] sm:text-sm inline">
                    {" "}
                    CompanyName
                  </h2>
                  <h2 className="font-dmSans text-gray-400  font-medium text-sm sm:text-sm inline">
                    {" "}
                    date
                  </h2>
                  <h2 className="font-dmSans text-gray-400  font-medium text-sm sm:text-sm inline">
                    {" "}
                    in <em className="not-italic text-black">Banglore In.</em>
                  </h2>
                </span>
              </div>
              <div className="flex sm:gap-6 gap-1">
                <CiLocationOn className="mx-auto sm:h-6 sm:w-6 h-4 w-4 self-center" />
                <h2 className="font-dmSans text-gray-400  font-medium text-sm self-center sm:text-sm inline">
                  {" "}
                  location
                </h2>
                <h2 className="font-dmSans text-green-500  font-medium text-sm self-center sm:text-sm inline">
                  {" "}
                  Remote
                </h2>
                <button className=" h-8 p-1 w-20 hover:bg-blue-900 bg-blued rounded-md text-white text-[.5rem] sm:text-sm self-center ">
                  full time
                </button>
                <FaArrowRight className="text-gray-400 self-center" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCompanyDetails;
