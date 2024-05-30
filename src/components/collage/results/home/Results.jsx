import React, { useEffect } from "react";
import ChartComp from "./Chart";
import Filter from "./Filters";
import List from "./List";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllTests } from "../../../../redux/collage/test/thunks/test";
import { getResultGraph } from "../../../../redux/collage/result/thunks/graph";
const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assessments = useSelector((state) => state.test.assessments);

  const [filtered, setFiltered] = React.useState([]);
  console.log(assessments);
  useEffect(() => {
    dispatch(getResultGraph());
    dispatch(getAllTests());
  }, [dispatch, ""]);
  let arr = assessments.beginner.concat(
    assessments.intermediate,
    assessments.advanced,
    assessments.adaptive
  );
  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");

      setFiltered(arr);

      return;
    } else {
      setFiltered(
        arr.filter((assessment) => {
          const regex = new RegExp(value, "i");
          return regex.test(assessment.name);
        })
      );
    }
  };
  useEffect(() => {
    setFiltered(arr);
  }, [assessments]);
  return (
    <div className="w-11/12 mx-auto">
      <ChartComp />
      <div className="mt-14">
        <Filter handleFilter={handleFilterStudents} />
      </div>
      <div className="mt-5">
        <List FilterdStudents={filtered} />
      </div>
    </div>
  );
};

export default Results;
