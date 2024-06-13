import React from "react";
import ChartComp from "./Chart";
import Filter from "./Filters";
import List from "./List";
const Results = () => {
  return (
    <>
      <ChartComp />
      <div className="mt-14">
        <Filter />
      </div>
      <div className="mt-5">
        <List />
      </div>
    </>
  );
};

export default Results;
