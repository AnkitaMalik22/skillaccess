import React from "react";
import Top from "./Top";
import List from "./List";

const Accounting = () => {
  return (
    <div className="py-6 px-10 font-dmSans">
      <Top />
      <div className="w-full mt-10">
        <div className="text-2xl font-bold mb-6">Payments</div>

        <div className="w-full bg-[#F8F8F9]"></div>
        <List />
      </div>
    </div>
  );
};

export default Accounting;
