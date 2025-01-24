import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgFolder } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentUsedQuestions,
  deleteRecentUsedQuestion,
} from "../../../redux/college/test/thunks/question";
import { Table } from "../../../components/ui/tables/Table";
import { FaAngleLeft } from "react-icons/fa";
import { isUni } from "../../../util/isCompany";

const Recent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions, GET_RECENT_QUESTION_LOADING } = useSelector(
    (state) => state.test
  );

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
  }, [dispatch]);

  const getTotalQuestions = (topic) => {
    switch (topic?.Type) {
      case "mcq":
        return topic?.questions?.length || 0;
      case "video":
        return topic?.video?.length || 0;
      case "compiler":
        return topic?.compiler?.length || 0;
      case "essay":
        return topic?.essay?.length || 0;
      case "findAnswer":
        return topic?.findAnswers?.length || 0;
      default:
        return 0;
    }
  };

  const handleDelete = (type, id) => {
    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  const recentUsedQuestionsWithIndex = recentUsedQuestions.map(
    (questions, index) => ({
      ...questions,
      index: index + 1, // Add index to each filtered assessment
    })
  );

  const columns = [
    {
      header: "S.No",
      accessor: "index",
    },
    {
      header: "Topic",
      accessor: (item) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate(
              isUni()
                ? `/university/pr/quesbank/topic/${item._id}`
                : `/college/quesbank/topic/${item._id}`
            );
          }}
        >
          <CgFolder className="text-blued" />
          <span className="first-letter:uppercase">{item?.Heading}</span>
        </div>
      ),
      className: "text-left",
    },
    {
      header: "Type",
      accessor: (item) => (
        <span className="first-letter:uppercase">{item?.Type}</span>
      ),
    },
    {
      header: "No. of Questions",
      accessor: (item) => getTotalQuestions(item),
    },
    {
      header: "Category",
      accessor: () => <span className="text-blued">UI/UX Designer</span>,
    },
    {
      header: "Actions",
      accessor: (item) => (
        <div
          className="cursor-pointer"
          onClick={() => handleDelete(item?.Type, item._id)}
        >
          <img src="/images/icons/cross.png" alt="Delete" />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mx-auto mb-2 font-dmSans">
        <button
          className="bg-[#D9E1E7] rounded-md h-10 w-10 sm:h-12 sm:w-14"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>
      </div>

      {/* Recent Used Questions Table */}
      <div className="w-full mx-auto bg-[#F8F8F9] p-4 rounded-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Recent used questions</h2>
        </div>
        <Table
          columns={columns}
          data={recentUsedQuestionsWithIndex || []}
          isLoading={GET_RECENT_QUESTION_LOADING}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Recent;
