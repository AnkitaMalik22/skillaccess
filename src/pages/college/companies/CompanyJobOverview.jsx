import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobById } from "../../../redux/college/dashboard/dashboardSlice";
import {JobHeader} from "../../../components/college/companies/joboverview/JobHeader";
import {JobInformation} from "../../../components/college/companies/joboverview/JobInformation";
import {TestSection} from "../../../components/college/companies/joboverview/TestSection";

const CompanyJobOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobDetails } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);

  const isJobOpen =
    jobDetails?.isOpenForApply ||
    new Date(jobDetails?.CloseByDate) >= new Date();


  useEffect(() => {
    if (user?._id) {
      dispatch(
        getJobById({
          jobId: id,
          collegeId: user?._id,
        })
      );
    }
  }, [id, user?._id, dispatch]);

  const handleInviteStudents = () => {
    if (!isJobOpen) return;
    localStorage.setItem("testId", jobDetails?.assessments[0]?.test?._id);
    localStorage.setItem("testName", jobDetails?.assessments[0]?.test?.name);
    window.location.href = `/college/jobs/test/invite?testId=${jobDetails?.assessments[0]?.test?._id}`;
  };

  return (
    <>
      <JobHeader
        jobTitle={jobDetails?.JobTitle}
        companyName={jobDetails?.company?.basic?.companyName}
      />
      <div className="flex flex-col lg:flex-row gap-6 mx-auto max-w-7xl px-4 py-6">
        <JobInformation jobDetails={jobDetails} isJobOpen={isJobOpen} />
        <TestSection
          jobDetails={jobDetails}
          isJobOpen={isJobOpen}
          handleInviteStudents={handleInviteStudents}
        />
      </div>
    </>
  );
};

export default CompanyJobOverview;
