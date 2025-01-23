import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../../redux/college/jobs/collegeJobSlice";
import JobCard from "../../../components/cards/JobCard";
import { ImProfile } from "react-icons/im";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.collegeAuth);
  const { jobs } = useSelector((state) => state.collegeJobs);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filter Jobs based on Search Input
  const handleFilterJobs = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = jobs?.filter((job) =>
      job?.JobTitle?.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    if (user?._id) dispatch(getAllJobs(user?._id));
  }, [user?._id]);

  // Sort jobs to show open jobs first, closed ones at the end
  const sortedJobs = [...(filteredJobs.length ? filteredJobs : jobs)].sort(
    (a, b) =>
      new Date(a?.CloseByDate) - new Date(b?.CloseByDate) ||
      b?.createdAt - a?.createdAt
  );

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500">
            <ImProfile className="h-8 w-8" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Jobs
          </h2>
        </div>
        <div className=" mx-2 w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center border rounded-md">
            <IoIosSearch className="self-center w-10 h-10 rounded-s-lg text-gray-400 py-2" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterJobs}
              className="placeholder p-0 border-none self-center focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {/* {jobs && jobs.map((job) => <JobCard job={job} key={job?._id} />)} */}
        {sortedJobs?.map((job) => (
          <JobCard job={job} key={job?._id} />
        ))}
      </div>
    </>
  );
};

export default JobsPage;
