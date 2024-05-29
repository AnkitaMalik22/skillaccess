import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecentUsedQuestion,
  getRecentUsedQuestions,
} from "../../../../redux/collage/test/thunks/question";

const Recent = () => {
  const arr = [2, 1, 1, 1, 1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
    console.log(recentUsedQuestions);
  }, []);

  const handleDelete = (type, id) => {
    console.log("Delete", id);

    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  return (
    <div className="w-full mx-auto bg-[#F8F8F9] md:px-8 md:py-6 py-5 px-5 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-base">Recent used questions</h2>
        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-[5px] px-2"
          onClick={() => navigate("/collage/quesBank/recent")}
        >
          View All
        </button>
      </div>

      {/* legend */}
      <div className=" grid-cols-3  text-center py-4 mb-6 mx-auto  font-dmSans font-bold text-base grid bg-[#0052CC] bg-opacity-5 ">
        <h2>Topic</h2>
        <h2>Type</h2>
        <h2>Actions</h2>{" "}
      </div>

      {/* list to be iterated */}
      {recentUsedQuestions?.map((topic) => (
        <div className="grid-cols-3 text-center mx-auto font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-xl">
          {" "}
          {/* row-2 */}
          <div
            className={`flex justify-center cursor-pointer`}
            onClick={() => {
              navigate(
                `/collage/quesBank/recentAll?id=${topic._id}&type=${topic.Type}`
              );
            }}
          >
            <div className="flex self-center ">
              <h2 className="font-dmSans text-center text-base text-[#3E3E3E]">
                {topic?.Heading}
              </h2>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center ">
            <div className=" self-center h-fit">
              <h2 className="font-dmSans font-normal text-sm text-[#3E3E3E]">
                {topic?.Type === "mcq"
                  ? "Multiple Choice Question"
                  : topic?.Type}
              </h2>
            </div>
          </div>
          <div className="flex justify-center gap-1 ">
            <div
              className=" self-center cursor-pointer"
              onClick={() => handleDelete(topic?.Type, topic._id)}
            >
              <img src="../../images/icons/cross.png" alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recent;
