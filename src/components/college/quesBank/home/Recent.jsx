import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecentUsedQuestion,
  getRecentUsedQuestions,
} from "../../../../redux/college/test/thunks/question";
import { isUni, isCompany } from "../../../../util/isCompany";

const Recent = () => {
  const arr = [2, 1, 1, 1, 1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions, GET_RECENT_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
    // //console.log(recentUsedQuestions);
  }, []);

  const handleDelete = (type, id) => {
    // //console.log("Delete", id);

    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  return (
    <div className="w-full mx-auto bg-[#F8F8F9] md:px-8 md:py-6 py-5 px-5 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-base">Recent used questions</h2>
        <button
          className="rounded-xl bg-accent text-sm font-bold text-white py-[5px] px-3"
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

      {/* legend */}
      <div className=" grid-cols-3  text-center py-4 mb-6 mx-auto  font-dmSans font-bold text-base grid bg-accent bg-opacity-5 ">
        <h2>Topic</h2>
        <h2>Type</h2>
        <h2>Actions</h2>{" "}
      </div>

      {/* list to be iterated */}
      {GET_RECENT_QUESTION_LOADING ? (
        // Render skeleton loader
        <>
          <div className="grid-cols-3 text-center mx-auto font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-md">
            <div className="flex justify-center animate-pulse">
              <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
            </div>
            <div className="flex justify-center animate-pulse">
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
            <div className="flex justify-center gap-1 animate-pulse">
              <div className="h-6 bg-gray-300 rounded-md w-6"></div>
            </div>
          </div>
        </>
      ) : (
        recentUsedQuestions?.slice(0, 10).map((topic) => (
          <div className="grid-cols-3 mx-auto font-dmSans hidden md:grid bg-white p-3 mb-3  border-gray-300 focus:outline-none focus:ring-1 focus:ring-blued w-full text-base text-[#4B5563] py-3 px-5 rounded-md shadow-sm focus:shadow-md hover:shadow-md transition-all duration-300">
            {/* Topic */}
            <div
              className="flex items-center justify-start px-4 cursor-pointer"
              onClick={() => {
                navigate(
                  isUni()
                    ? `/university/pr/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
                    : isCompany()
                    ? `/company/pr/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
                    : `/college/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
                );
              }}
            >
              <h2 className="text-left text-[#3E3E3E] font-medium first-letter:uppercase">
                {topic?.Heading}
              </h2>
            </div>

            {/* Type */}
            <div className="flex items-center justify-center px-4">
              <h2 className="text-sm text-[#3E3E3E] font-normal first-letter:uppercase">
                {topic?.Type === "mcq" ? "MCQ" : topic?.Type}
              </h2>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center px-4">
              <span
                onClick={() => handleDelete(topic?.Type, topic._id)}
                className="tooltip cursor-pointer"
                data-tip="Click here to remove."
              >
                <img
                  src="/images/icons/cross.png"
                  alt="Delete Icon"
                  className="h-8 w-8"
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Recent;
