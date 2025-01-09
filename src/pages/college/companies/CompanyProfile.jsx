import React, { useEffect } from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { FaAngleLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from "../../../redux/features/company/companySlice";
import {
  getCompany,
  getTotalJobs,
} from "../../../redux/college/dashboard/dashboardSlice";
import useTranslate from "../../../hooks/useTranslate";
import { IoIosSearch } from "react-icons/io";

const CompanyProfile = () => {
  //useTranslate();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { companyDetails } = useSelector((state) => state.company);

  const { jobs } = useSelector((state) => state.dashboard);
  const [filtered, setFiltered] = React.useState([]);
  useEffect(() => {
    dispatch(getTotalJobs());
  }, [dispatch]);
  const handleFilterJobs = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      //console.log("empty");

      setFiltered(jobs);

      return;
    } else {
      setFiltered(
        jobs.filter((Jobs) => {
          const regex = new RegExp(value, "i");
          return regex.test(Jobs.JobTitle);
        })
      );
    }
  };
  useEffect(() => {
    setFiltered(jobs);
  }, [jobs]);

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6 items-center">
        {/* comp */}
        <span className="flex gap-3">
          <button
            className="bg-[#D9E1E7]  self-center object-center  rounded-md p-3"
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
          </button>

          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717] first-letter:uppercase">
            {companyDetails?.basic?.companyName}
          </h2>
        </span>

        {/* search */}
        <div className="rounded-xl w-full sm:h-12 h-10 flex">
          <div className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterJobs}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between font-dmSans gap-5 md:gap-10">
        <div className="w-1/2">
          <div className="w-full bg-[#F8F8F9] rounded-t-[32px] h-40 md:h-[240px] relative">
            <img
              src={companyDetails?.basic?.coverPhoto || "/images/default.jpg"}
              alt="img"
              className="w-full h-full z-0 object-cover rounded-t-[32px]"
            />
            <div className=" absolute -bottom-7  left-5 bg-white h-12 w-12 flex justify-center items-center rounded-md">
              <img
                src={companyDetails?.basic?.logo || "/images/defaultUser.jpg"}
                className="w-10 h-10 object-contain self-center"
                alt="brand logo"
              />
            </div>
          </div>
          <div className="w-full bg-[#F8F8F9] flex justify-between p-5 pt-10 gap-2 mb-[6px]">
            <div className="gap-1 flex flex-col">
              <h2 className="font-bold text-lg">
                {companyDetails?.basic?.companyName}
              </h2>
              <h2 className="text-sm font-medium">
                {companyDetails?.location?.state} Branch Office
              </h2>
              <h2 className="text-sm font-medium text-[#8E91A0">
                Available Jobs
              </h2>
            </div>
            <div className="self-center">
              <h2 className="text-[#8E91A0] text-sm font-bold mb-1">
                EMPLOYEES
              </h2>
              <h2 className="text-sm font-bold text-center">200+</h2>
            </div>
          </div>

          <div className="bg-[#F8F8F9] p-5 mb-[6px]">
            <h2 className="text-base font-bold mb-2">About Us</h2>
            <p className="text-sm text-[#7D7D7D] first-letter:capitalize">
              {companyDetails?.about?.description}
            </p>
          </div>

          {/* bullets */}
          <div className="bg-[#F8F8F9] p-5 rounded-b-[32px]">
            <h2 className="text-base font-bold mb-2">Achievements</h2>
            {/* awards */}
            {companyDetails?.awards?.map((award, index) => (
              <div
                className="text-sm text-gray-400 mb-2 flex gap-2 items-center"
                key={index}
              >
                <VscCircleFilled className="text-white border-4 w-fit h-fit rounded-full self-center border-blued m-0" />
                <p>{award?.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 h-[100vh] overflow-y-auto">
          {/*  */}
          <div className="flex justify-between mb-7">
            <h2 className="font-bold">Available jobs</h2>
            <h2
              className="font-bold underline underline-offset-2 text-blued cursor-pointer"
              onClick={() => {
                navigate("/college/companies/jobs");
              }}
            >
              See All
            </h2>
          </div>
          {filtered
            // ?.filter((job) => job?.company?._id === id)
            ?.map((job, index) => {
              return (
                <div
                  className="flex justify-between mt-4 bg-gray-100 rounded-md p-4"
                  key={index}
                >
                  <>
                    <div className="sm:flex">
                      <div className="  flex justify-center rounded-md mr-2">
                        <img
                          src={
                            companyDetails?.basic?.logo ||
                            "/images/defaultUser.jpg"
                          }
                          className="w-10 h-10 rounded-md self-center"
                          alt=""
                        />
                      </div>
                      <span className="">
                        <h2 className="font-dmSans font-semibold text-sm sm:text-base">
                          {job.JobTitle || "title"}
                        </h2>
                        <h2 className="font-dmSans font-medium text-[.6rem] sm:text-sm inline mr-2">
                          {" "}
                          {companyDetails?.basic?.companyName}
                        </h2>
                        <h2 className="font-dmSans text-gray-400  font-medium text-sm sm:text-sm inline mr-3">
                          {" "}
                          {job.JobLocation || "location"}
                        </h2>
                        <h2 className="font-dmSans text-gray-400  font-medium text-sm sm:text-sm inline">
                          {" "}
                          in{" "}
                          <em className="not-italic text-black">
                            {job.WorkplaceType || "WOrktype"}
                          </em>
                        </h2>
                      </span>
                    </div>
                    <div className="flex sm:gap-6 gap-1">
                      <button
                        className=" h-8 p-1 w-20  hover:bg-blue-900 bg-accent  rounded-md bg-opacity-20 text-white text-[.5rem] sm:text-sm self-center "
                        onClick={() =>
                          navigate(`/college/companies/jobOverview/${job._id}`)
                        }
                      >
                        <p className="text-blued  -ml-8 font-dmSans text-sm font-medium  ">
                          {job.EmploymentType || "employmentType"}
                        </p>
                      </button>
                      <FaArrowRight className="text-gray-400 self-center" />
                    </div>
                  </>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
