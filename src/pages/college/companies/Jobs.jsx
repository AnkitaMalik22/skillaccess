import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalJobs } from "../../../redux/college/dashboard/dashboardSlice";
import calculateDaysAgo from "../../../util/calculateDaysAgo";
import { Table } from "../../../components/ui/tables/Table";

const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => state.dashboard);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(getTotalJobs());
  }, [dispatch]);

  useEffect(() => {
    setFiltered(jobs);
  }, [jobs]);

  const handleFilterJobs = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setFiltered(jobs);
    } else {
      setFiltered(
        jobs.filter((job) => new RegExp(value, "i").test(job.JobTitle || ""))
      );
    }
  };

  const columns = [
    {
      header: "Logo",
      accessor: (job) => (
        <img
          src={job?.company?.basic?.logo || "/images/defaultUser.jpg"}
          alt="Company Logo"
          className="w-10 h-10 rounded-md"
        />
      ),
      className: "text-center",
    },
    {
      header: "Job Title",
      accessor: (job) => (
        <div>
          <h2 className="font-dmSans font-semibold">{job.JobTitle || "N/A"}</h2>
          <h3 className="font-dmSans font-medium text-gray-600">
            {job?.company?.basic?.companyName || "Company Name"}
          </h3>
        </div>
      ),
    },
    {
      header: "Posted",
      accessor: (job) => calculateDaysAgo(job.createdAt),
      className: "text-center",
    },
    {
      header: "Location",
      accessor: (job) => job.JobLocation || "N/A",
      className: "text-center",
    },
    {
      header: "Workplace Type",
      accessor: (job) => job.WorkplaceType || "N/A",
      className: "text-center text-green-500",
    },
    {
      header: "Employment Type",
      accessor: (job) => job.EmploymentType || "N/A",
      className: "text-center",
    },
    {
      header: "Action",
      accessor: (job) => (
        <button
          className="h-8 px-4 bg-blued text-white text-sm rounded-md"
          onClick={() => navigate(`/college/jobs/overview/${job._id}`)}
        >
          {"View"}
        </button>
      ),
      className: "text-center",
    },
  ];

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-4">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <div className=" mx-2 w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center border rounded-md">
            <IoIosSearch className="self-center w-10 h-10 rounded-s-lg text-gray-400 py-2" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterJobs}
              className="placeholder pl-0 border-none self-center focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        isLoading={!jobs.length}
        onRowClick={(job) => navigate(`/college/jobs/overview/${job._id}`)} //fixed typo
        className="shadow-md rounded-lg"
      />
    </>
  );
};

export default Jobs;
