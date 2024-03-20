import React from "react";
import { LuBookmarkMinus } from "react-icons/lu";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const BookMark = () => {
  const navigate = useNavigate();
  const arr = [2, 1, 1, 1, 1];
  return (
    <div className="w-full mx-auto bg-[#f7f7f8] lg:px-8 lg:pt-7 pb-4 rounded-3xl">
      <span className="flex justify-between mb-6">
        <span className="flex gap-2 self-center">
          <LuBookmarkMinus className="self-center text-2xl text-[#95ACFA]" />
          <h2 className="font-bold text-xl self-center">Book mark questions</h2>
        </span>

        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-2 px-3"
          onClick={() => window.alert("design not available")}
        >
          View All
        </button>
      </span>

      {/* list to be iterated */}
      {arr.map(() => (
        <Dropdown />
      ))}
    </div>
  );
};

export default BookMark;
