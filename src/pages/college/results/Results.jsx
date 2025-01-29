import React, { useEffect } from "react";
import ChartComp from "../../../components/college/results/home/Chart";
import Filter from "../../../components/college/results/home/Filters";
import { useSelector, useDispatch } from "react-redux";
import { getAllTests } from "../../../redux/college/test/thunks/test";
import { getResultGraph } from "../../../redux/college/result/thunks/graph";
import AssessmentTable from "../../../components/ui/tables/AssessmentTable";
import toast from "react-hot-toast";
import isCompany, { isUni } from "../../../util/isCompany";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.test.assessments);
  const { GET_TEST_LOADING } = useSelector((state) => state.test);

  const [filtered, setFiltered] = React.useState([]);

  useEffect(() => {
    dispatch(getResultGraph());
    dispatch(getAllTests("all"));
  }, [dispatch]);

  const allAssessments = assessments.beginner.concat(
    assessments.intermediate,
    assessments.advanced,
    assessments.adaptive
  );

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setFiltered(allAssessments);
    } else {
      setFiltered(
        allAssessments.filter((assessment) => {
          const regex = new RegExp(value, "i");
          return regex.test(assessment.name);
        })
      );
    }
  };

  useEffect(() => {
    setFiltered(allAssessments);
  }, [assessments]);

  const handleRowClick = (assessmentId) => {
    if (isCompany()) {
      navigate(
        `/company/pr/results/overview?level=beginner&assessment=${assessmentId}`
      );
    } else {
      navigate(
        `/${
          isUni() ? "university/pr" : "college"
        }/results/overview?level=beginner&assessment=${assessmentId}`
      );
    }
    console.log(`Row clicked for assessment ID: ${assessmentId}`);
  };

  const handleResultsDownload = async (assessmentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/assessments/download/${assessmentId}`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download successful");
    } catch (error) {
      toast.error("Download failed");
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <ChartComp />
      <div className="mt-14">
        <Filter handleFilter={handleFilterStudents} />
      </div>
      <div className="mt-5">
        <AssessmentTable
          assessments={filtered}
          isLoading={GET_TEST_LOADING}
          onRowClick={handleRowClick}
          onDownload={handleResultsDownload}
        />
      </div>
    </>
  );
};

export default Results;
