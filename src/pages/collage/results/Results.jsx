import React, { useEffect } from "react";
import ChartComp from "../../../components/collage/results/home/Chart";
import Filter from "../../../components/collage/results/home/Filters";
import List from "../../../components/collage/results/home/List";
import { useSelector, useDispatch } from "react-redux";
import { getAllTests } from "../../../redux/collage/test/thunks/test";
import { getResultGraph } from "../../../redux/collage/result/thunks/graph";
import useTranslate from "../../../hooks/useTranslate";

const Results = () => {
  useTranslate();
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.test.assessments);

  const [filtered, setFiltered] = React.useState([]);
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
    <>
      <ChartComp />
      <div className="mt-14">
        <Filter handleFilter={handleFilterStudents} />
      </div>
      <div className="mt-5">
        <List FilterdStudents={filtered} />
      </div>
    </>
  );
};

export default Results;
