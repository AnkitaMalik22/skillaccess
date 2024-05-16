import React from "react";
import ChartComp from "./Chart";
import Filter from "./Filters";
import List from "./List";
const Results = () => {
  return (
    <div className="w-11/12 mx-auto">
      <ChartComp />
      <div className="mt-14">
        <Filter />
      </div>
      <div className="mt-5">
        <List />
      </div>
    </div>
  );
};

export default Results;
