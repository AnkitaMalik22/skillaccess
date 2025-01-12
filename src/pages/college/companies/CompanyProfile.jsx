import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from "../../../redux/features/company/companySlice";
import { getTotalJobs } from "../../../redux/college/dashboard/dashboardSlice";
import { CompanyHeader } from "../../../components/college/companies/CompanyHeader";
import { CompanyDetails } from "../../../components/college/companies/CompanyDetails";
import { JobList } from "../../../components/college/companies/JobList";

const CompanyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { companyDetails } = useSelector((state) => state.company);
  const { jobs } = useSelector((state) => state.dashboard);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    dispatch(getTotalJobs());
    dispatch(getCompanyDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilterJobs = (value) => {
    if (value.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const regex = new RegExp(value, "i");
      setFilteredJobs(jobs.filter((job) => regex.test(job.JobTitle)));
    }
  };

  return (
    <>
      <CompanyHeader companyName={companyDetails?.basic?.companyName} />
      <div className="flex justify-between font-dmSans gap-5 md:gap-10">
        <CompanyDetails companyDetails={companyDetails} />
        <JobList
          jobs={filteredJobs}
          companyLogo={companyDetails?.basic?.logo}
          companyName={companyDetails?.basic?.companyName}
        />
      </div>
    </>
  );
};

export default CompanyProfile;
