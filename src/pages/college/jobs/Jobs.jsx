import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../../redux/college/jobs/collegeJobSlice";
import JobCard from "../../../components/cards/JobCard";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.collegeAuth);
  const { jobs } = useSelector((state) => state.collegeJobs);

  const handleFilterJobs = (e) => {};

  useEffect(() => {
    dispatch(getAllJobs(user?._id));
  }, []);

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button
            className="self-center object-center rounded-md h-10 w-10 "
            // onClick={() => navigate('college/companies')}
          >
            <img src="/images/icons/sales.jpg" alt="icon" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Jobs
          </h2>
        </div>
        <div className=" rounded-xl w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterJobs}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {jobs && jobs.map((job) => <JobCard job={job} key={job?._id} />)}
      </div>
    </>
  );
};

export default JobsPage;
