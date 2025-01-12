import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getStudentCV } from "../../../../redux/college/student/studentSlice";
import { Table } from "../../../ui/tables/Table";
import Pagination from "../../../Pagination";

import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Results = ({ assessmentResult, id, pagination }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTestNameClick = (assessmentItem) => {
    // Extracting the necessary IDs
    const studentId = assessmentItem.studentId;
    const assessmentId = assessmentItem.assessmentId?._id; // Accessing the _id of assessmentId object
    const responseId = assessmentItem.responseId; // Assuming responseId is available in assessmentItem

    // Constructing the URL with the extracted IDs
    if (assessmentId && responseId) {
      const url = `/college/results/assessmentReview?studentId=${studentId}&assessmentId=${assessmentId}&responseId=${responseId}`;
      window.location.href = url; // Navigate to the URL
    }

    console.log(assessmentId, "clicking");
  };

  const [filters, setFilters] = useState({
    testName: "",
    date: "",
    topics: "",
    score: "",
    status: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [isInputOpen, setIsInputOpen] = useState({
    name: false,
    topics: false,
    date: false,
  });

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredResults = assessmentResult?.filter((item) => {
    const testName = item?.assessmentId?.name?.toLowerCase() || "";
    const date = formatDate(item?.createdAt || "");
    const topics = item?.topics
      ?.map((topic) => topic?.Heading)
      .join(", ")
      .toLowerCase();
    const score = item?.percentage?.toFixed(2) || "0";
    const status = item?.status?.toLowerCase() || "pending";

    return (
      (!filters.testName ||
        testName.includes(filters.testName.toLowerCase())) &&
      (!filters.date || date.includes(filters.date)) &&
      (!filters.topics || topics.includes(filters.topics.toLowerCase())) &&
      (!filters.score || score.includes(filters.score)) &&
      (!filters.status || status.includes(filters.status.toLowerCase()))
    );
  });

  const resetFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleInputField = (field) => {
    setIsInputOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const dataWithSerialNumbers = filteredResults?.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const columns = [
    {
      header: "S.No",
      accessor: "serialNumber",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Test Name</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("testName")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.testName ? (
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the toggle
                      resetFilter("testName");
                      toggleInputField("testName");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.testName && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter by Name"
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.testName}
                onChange={(e) => handleFilterChange("testName", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                {filteredResults.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (item) => (
        <span
          onClick={() => handleTestNameClick(item)} // Add onClick event for navigation
          className="text-blue-600 cursor-pointer"
        >
          {truncateText(item?.assessmentId?.name || "N/A", 20)}
        </span>
      ),
      className: "truncate",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Date</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("date")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.date ? (
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the toggle
                      resetFilter("date");
                      toggleInputField("date");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.date && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter by Name"
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                {filteredResults.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (item) => formatDate(item?.createdAt),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Topics</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("topics")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.topics ? (
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the toggle
                      resetFilter("topics");
                      toggleInputField("topics");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.topics && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter by Name"
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.topics}
                onChange={(e) => handleFilterChange("topics", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                {filteredResults.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (item) =>
        truncateText(
          item?.topics?.map((topic) => topic.Heading).join(", ") || "N/A",
          15
        ),
      className: "truncate",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Score (%)</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("score")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.score ? (
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the toggle
                      resetFilter("score");
                      toggleInputField("score");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.score && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter.."
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.score}
                onChange={(e) => handleFilterChange("score", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                {filteredResults.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (item) => (
        <span
          className={`font-medium ${
            item?.percentage >= 70
              ? "text-green-600"
              : item?.percentage >= 40
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {item?.percentage?.toFixed(2)}%
        </span>
      ),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex">
            <span> Status</span>
            <div className="flex items-center">
              <button
                onClick={() => toggleInputField("status")}
                className="ml-2 text-gray-500"
              >
                {isInputOpen.status ? (
                  <IoMdClose
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the toggle
                      resetFilter("status");
                      toggleInputField("status");
                    }}
                  />
                ) : (
                  <RiArrowDropDownLine />
                )}
              </button>
            </div>
          </div>
          {isInputOpen.status && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filter.."
                className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued  hover:border-blued focus:ring-0"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              />
              <span className="ml-2 text-gray-500">
                {filteredResults.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor: (item) => (
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-sm font-medium ${
            item?.status === "selected"
              ? "bg-green-100 text-green-800"
              : item?.status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item?.status || "Pending"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full px-6 py-4 space-y-4">
      {/* Table */}
      <Table
        columns={columns}
        data={dataWithSerialNumbers}
        isLoading={!assessmentResult}
        className="bg-white rounded-lg"
      />

      {/* Pagination */}
      <div className="pt-4">
        <Pagination
          currentPage={pagination?.currentPage}
          onPageChange={(page) => {
            dispatch(getStudentCV({ studentId: id, page }));
          }}
          totalPages={pagination?.totalPages}
        />
      </div>
    </div>
  );
};

export default Results;
