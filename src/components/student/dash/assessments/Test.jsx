import React from "react";
import Header from "./Header";
import ActiveTests from "./ActiveTests";

const Test = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-4 my-3">
        <button className="py-3 text-white rounded-2xl text-sm  bg-accent font-bold flex gap-2 px-7 ">
          <p>Active</p>
        </button>
        <button className="py-3 b rounded-2xl text-sm  bg-gray-100 text-gray-800 font-bold flex gap-2 px-7 ">
          <p>Upcoming</p>
        </button>
      </div>

      <div className="flex flex-wrap mx-1 w-fit justify-between ">
        <ActiveTests progress={2} /> <ActiveTests progress={0} />
        <ActiveTests progress={4} />
        <ActiveTests progress={3} />
        <ActiveTests progress={2} /> <ActiveTests progress={0} />
        <ActiveTests progress={4} />
        <ActiveTests progress={0} />
        <ActiveTests progress={3} />
      </div>
    </div>
  );
};

export default Test;
