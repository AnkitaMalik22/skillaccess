import React, { useEffect } from "react";
import ChartComp from "../../../components/college/results/home/Chart";
import Filter from "../../../components/college/results/home/Filters";
import List from "../../../components/college/results/home/List";
import { useSelector, useDispatch } from "react-redux";

import { getResultGraphCompany } from "../../../redux/company/result/thunks/graph";
import { getAllTests } from "../../../redux/company/test/thunks/test";

const Results = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.companyTest.assessments);
  const { GET_TEST_LOADING } = useSelector((state) => state.companyTest);

  const [filtered, setFiltered] = React.useState([]);

  useEffect(() => {
    dispatch(getResultGraphCompany());
    dispatch(getAllTests(true));
  }, [dispatch, ""]);

  let arr = assessments.beginner.concat(
    assessments.intermediate,
    assessments.advanced,
    assessments.adaptive
  );
  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      setFiltered(
        arr.filter((assessment) => {
          return !!assessment.job;
        })
      );
      return;
    } else {
      setFiltered(
        arr.filter((assessment) => {
          const regex = new RegExp(value, "i");
          return regex.test(assessment.name) && assessment.job;
        })
      );
    }
  };
  useEffect(() => {
    setFiltered(
      arr.filter((assessment) => {
        return !!assessment.job;
      })
    );
  }, [assessments]);
  return (
    <>
      <ChartComp />
      <div className="mt-14">
        <Filter handleFilter={handleFilterStudents} />
      </div>
      <div className="mt-5">
        <List FilterdStudents={filtered} isLoading={GET_TEST_LOADING} />
      </div>
    </>
  );
};

export default Results;
