import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecentUsedQuestion,
  getRecentUsedQuestions,
} from "../../../../redux/college/test/thunks/question";
import { isUni, isCompany } from "../../../../util/isCompany";
import { Table } from "../../../ui/tables/Table"; // Importing the reusable Table component

const Recent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions, GET_RECENT_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
  }, [dispatch]);

  const handleDelete = (type, id) => {
    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  const handleRowClick = (topic) => {
    navigate(
      isUni()
        ? `/university/pr/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
        : isCompany()
        ? `/company/pr/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
        : `/college/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
    );
  };

  const columns = [
    {
      header: "Topic",
      accessor: (topic) => (
        <span className="text-[#3E3E3E] font-medium first-letter:uppercase">
          {topic?.Heading}
        </span>
      ),
      className: "text-left",
    },
    {
      header: "Type",
      accessor: (topic) => (
        <span className="text-sm text-[#3E3E3E] font-normal first-letter:uppercase">
          {topic?.Type === "mcq" ? "MCQ" : topic?.Type}
        </span>
      ),
      className: "text-center",
    },
    {
      header: "Actions",
      accessor: (topic) => (
        <span
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering row click
            handleDelete(topic?.Type, topic._id);
          }}
          className="tooltip cursor-pointer"
          data-tip="Click here to remove."
        >
          <img
            src="/images/icons/cross.png"
            alt="Delete Icon"
            className="h-8 w-8"
          />
        </span>
      ),
      className: "text-center",
    },
  ];

  return (
    <div className="w-full mx-auto bg-[#F8F8F9] md:px-8 md:py-6 py-5 px-5 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-base">Recent used questions</h2>
        <button
          className="rounded-md bg-accent text-sm font-bold text-white py-[5px] px-3"
          onClick={() =>
            navigate(
              isUni()
                ? "/university/pr/quesBank/recent"
                : isCompany()
                ? "/company/pr/quesBank/recent"
                : "/college/quesBank/recent"
            )
          }
        >
          View All
        </button>
      </div>

      {/* Reusable Table */}
      <Table
        columns={columns}
        data={recentUsedQuestions?.slice(0, 10) || []}
        isLoading={GET_RECENT_QUESTION_LOADING}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Recent;
