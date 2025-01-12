import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAssessmentOverview } from "../../../../redux/college/result/thunks/graph";
import isCompany from "../../../../util/isCompany";
import { getAssessmentOverviewCompany } from "../../../../redux/company/result/thunks/graph";
import PerformanceChart from "../../../ui/charts/PerformanceChart";

const Performance = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { overview, overviewLoading } = useSelector((state) => {
    return isCompany() ? state.companyResult : state.result;
  });

  const [chartData, setChartData] = useState([]);
  const [chartCategories, setChartCategories] = useState([]);
  const [chartLabels, setChartLabels] = useState([
    { color: "#6394DD", label: "Candidates Appeared" },
    { color: "#63B499", label: "Approved Candidates" },
    { color: "#FCBF76", label: "Disapproved Candidates" },
    { color: "#E8836A", label: "Absent" },
  ]);

  useEffect(() => {
    const assessmentId = searchParams.get("assessment");
    if (isCompany()) {
      dispatch(getAssessmentOverviewCompany(assessmentId));
    } else {
      dispatch(getAssessmentOverview(assessmentId));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!overviewLoading) {
      setChartData(overview || []);
      setChartCategories(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]);
    }
  }, [overview, overviewLoading]);

  return (
    <div>
      <PerformanceChart
        chartData={chartData}
        chartCategories={chartCategories}
        chartLabels={chartLabels}
        loading={overviewLoading}
      />
    </div>
  );
};

export default Performance;
