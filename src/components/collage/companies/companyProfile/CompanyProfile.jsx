import React from "react";
import Header from "./Header";
import { VscCircleFilled } from "react-icons/vsc";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CompanyProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-4">
        <Header />
      </div>

      <div className="sm:flex w-[95%] mx-auto justify-between mb-2 font-dmSans mt-8">
        <div className="sm:w-[45%]">
          <div className="w-full bg-gray-100 rounded-t-3xl h-56 relative">
            <img
              src="../../images/company.png"
              alt=""
              className="w-full h-full rounded-t-3xl z-0 object-cover"
            />
            <div className=" absolute -bottom-7  left-5 bg-white w-14 h-14 flex justify-center rounded-lg">
              <img
                src="../../images/companyLogo.png"
                className="w-10 h-10 rounded-lg self-center"
                alt=""
              />
            </div>
          </div>
          <div className="w-full bg-gray-100 flex justify-between pt-14 pb-6 pr-10 pl-5">
            <div>
              <h2 className="font-bold text-lg">Google Inc.</h2>
              <h2 className="text-xs font-medium mt-1">
                Banglore Branch Office
              </h2>
              <h2 className="text-xs font-medium mt-2 text-gray-400">
                Available Jobs
              </h2>
            </div>
            <div className="self-center">
              <h2 className="text-gray-400 text-sm font-bold ">EMPLOYEES</h2>
              <h2 className="text-sm font-bold text-center mt-1">200+</h2>
            </div>
          </div>

          <div className="bg-gray-100 mt-2 px-6 ">
            <span className="">
              <h2 className="text-base font-bold pt-6 ">About Us</h2>
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
              <h2 className="text-base font-bold pt-6 mb-4">Achievements</h2>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blue-500 mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blue-500 mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blue-500 mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blue-500 mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
              <span className=" mt-2 text-sm text-gray-400 pb-3 flex gap-2">
                <VscCircleFilled className="text-white  border-4 w-fit h-fit rounded-full self-center border-blue-500 mr-2" />
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consectetur, blanditiis, rerum temporibus magnam illum maxime
                </p>
              </span>
            </span>
          </div>
        </div>

        <div className="sm:w-[50%]">
          {/*  */}
          <div className="flex justify-between mb-7">
            <h2 className="font-bold">Available jobs</h2>
            <h2 className="font-bold underline underline-offset-2 text-blued">
              See All
            </h2>
          </div>
          <div className="flex justify-between w-[98%] bg-gray-100 rounded-lg p-4">
            <div className="sm:flex">
              <div className=" sm:h-10 sm:w-10  w-6 h-6 self-center bg-red-600 mr-2"></div>
              <span className="">
                <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                  Role
                </h2>
                <h2 className="font-dmSans font-medium text-[.6rem] sm:text-xs inline">
                  {" "}
                  CompanyName
                </h2>
                <h2 className="font-dmSans text-gray-400  font-medium text-xs sm:text-xs inline">
                  {" "}
                  date
                </h2>
                <h2 className="font-dmSans text-gray-400  font-medium text-xs sm:text-xs inline">
                  {" "}
                  in <em className="not-italic text-black">Banglore In.</em>
                </h2>
              </span>
            </div>
            <div className="flex sm:gap-6 gap-1">
              <CiLocationOn className="mx-auto sm:h-6 sm:w-6 h-4 w-4 self-center" />
              <h2 className="font-dmSans text-gray-400  font-medium text-xs self-center sm:text-xs inline">
                {" "}
                location
              </h2>
              <h2 className="font-dmSans text-green-500  font-medium text-xs self-center sm:text-xs inline">
                {" "}
                Remote
              </h2>
              <button
                className=" h-8 p-1 w-20 hover:bg-blue-900 bg-blued rounded-lg text-white text-[.5rem] sm:text-sm self-center "
                onClick={() => navigate("/collage/companies/jobOverview")}
              >
                full time
              </button>
              <FaArrowRight className="text-gray-400 self-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
