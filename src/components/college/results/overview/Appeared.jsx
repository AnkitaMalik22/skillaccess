import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  bulkSelectStudents,
  getTestResultPage,
  selectStudentsByThreshold,
} from "../../../../redux/college/test/thunks/test";
import { resetStudentList } from "../../../../redux/college/test/testSlice";
import Pagination from "../../../Pagination";
import PopUp from "../../../PopUps/PopUp";
import Button from "../../../buttons/Button";
import { Table } from "../../../ui/tables/Table";
import isCompany, { isUni } from "../../../../util/isCompany";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Appeared = ({ assessment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [numberValue, setNumberValue] = useState("");
  const [showEvaluateConfirm, setShowEvaluationConfirm] = useState(false);
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get("assessment");

  const [filters, setFilters] = useState({
    name: "",
    profileDate: "",
    assessmentPerformance: "",
  });

  const [isInputOpen, setIsInputOpen] = useState({
    name: false,
    profileDate: false,
    assessmentPerformance: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (assessmentId) {
      dispatch(resetStudentList());
      dispatch(
        getTestResultPage({ id: assessmentId, status: "pending", page: 1 })
      );
    }
  }, [assessmentId, dispatch]);

  const { testDataResponse, TEST_DATA_RESPONSE_LOADING } = useSelector(
    (state) => (isCompany() ? state.test : state.companyTest)
  );

  const currentPage = testDataResponse?.currentPage || 1;
  const totalPages = testDataResponse?.totalPages || 1;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInputField = (field) => {
    setIsInputOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetFilter = (field) => {
    setFilters((prev) => ({ ...prev, [field]: "" }));
    setIsInputOpen((prev) => ({ ...prev, [field]: false }));
  };

  const parsePerformanceFilter = (value, studentPerformance) => {
    const trimmedValue = value.trim();
    if (trimmedValue.startsWith(">")) {
      return studentPerformance > parseFloat(trimmedValue.slice(1));
    } else if (trimmedValue.startsWith("<")) {
      return studentPerformance < parseFloat(trimmedValue.slice(1));
    } else if (trimmedValue.startsWith("=")) {
      return studentPerformance === parseFloat(trimmedValue.slice(1));
    } else {
      return true; // No valid operator, ignore the filter
    }
  };

  const filteredData =
    testDataResponse?.students?.filter((student, index) => {
      const nameMatch =
        !filters.name ||
        student?.studentId?.FirstName?.toLowerCase().includes(
          filters.name.toLowerCase()
        );

      const profileDateMatch =
        !filters.profileDate ||
        new Date(student?.createdAt)
          .toDateString()
          .includes(filters.profileDate);

      const performanceMatch =
        !filters.assessmentPerformance ||
        parsePerformanceFilter(
          filters.assessmentPerformance,
          student?.percentage || 0
        );

      return nameMatch && profileDateMatch && performanceMatch;
    }) || [];

  const filteredAssessmentsWithIndex = filteredData.map(
    (testDataResponse, index) => ({
      ...testDataResponse,
      index: index + 1, // Add index to each filtered assessment
    })
  );

  const getColorByPercentage = (value) => {
    if (value >= 90) return "bg-green-500";
    if (value >= 80) return "bg-green-400";
    if (value >= 70) return "bg-blue-500";
    if (value >= 60) return "bg-yellow-500";
    if (value >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  const columns = [
    {
      header: "S. No.",
      accessor: "index",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>Name and Profile</span>
            <button
              onClick={() => toggleInputField("name")}
              className="text-gray-500"
            >
              {isInputOpen.name ? (
                <IoMdClose
                  onClick={() => {
                    resetFilter("name");
                    toggleInputField("name");
                  }}
                />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>
          </div>
          {isInputOpen.name && (
            <input
              type="text"
              placeholder="Filter by Name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued focus:ring-0"
            />
          )}
        </div>
      ),
      accessor: (student) => (
        <div className="flex items-center gap-2">
          <img
            src={student?.studentId?.avatar?.url || "/images/student.png"}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <span>{student?.studentId?.FirstName}</span>
        </div>
      ),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>Date</span>
            <button
              onClick={() => toggleInputField("profileDate")}
              className="text-gray-500"
            >
              {isInputOpen.profileDate ? (
                <IoMdClose
                  onClick={() => {
                    resetFilter("profileDate");
                    toggleInputField("profileDate");
                  }}
                />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>
          </div>
          {isInputOpen.profileDate && (
            <input
              type="text"
              placeholder="Filter by Date"
              value={filters.profileDate}
              onChange={(e) =>
                handleFilterChange("profileDate", e.target.value)
              }
              className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued focus:ring-0"
            />
          )}
        </div>
      ),
      accessor: (student) => new Date(student?.createdAt).toDateString(),
    },
    {
      header: "Status",
      accessor: (student) => (
        <span className="capitalize">{student?.status || "Pending"}</span>
      ),
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>Assessment Performance</span>
            <button
              onClick={() => toggleInputField("assessmentPerformance")}
              className="text-gray-500"
            >
              {isInputOpen.assessmentPerformance ? (
                <IoMdClose
                  onClick={() => {
                    resetFilter("assessmentPerformance");
                    toggleInputField("assessmentPerformance");
                  }}
                />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>
          </div>
          {isInputOpen.assessmentPerformance && (
            <input
              type="text"
              placeholder="e.g., >50, <70, =80"
              value={filters.assessmentPerformance}
              onChange={(e) =>
                handleFilterChange("assessmentPerformance", e.target.value)
              }
              className="mt-1 p-2 text-sm border border-gray-300 rounded-md focus:border-blued focus:ring-0"
            />
          )}
        </div>
      ),
      accessor: (student) => (
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 bg-gray-200 rounded-md">
            <div
              className={`h-full rounded-md ${getColorByPercentage(
                student?.percentage || 0
              )}`}
              style={{ width: `${student?.percentage || 0}%` }}
            ></div>
          </div>
          <span>{(student?.percentage || 0).toFixed(2)}%</span>
        </div>
      ),
    },
    {
      header: "Review",
      accessor: (student) => (
        <button
          className="text-blued underline"
          onClick={(e) => {
            e.stopPropagation();
            const basePath = isCompany()
              ? "/company/pr/results/assessmentReview"
              : `/${isUni() ? "university/pr" : "college"
              }/results/assessmentReview`;

            navigate(
              `${basePath}?studentId=${student.studentId._id}&assessmentId=${student.assessmentId}&responseId=${student._id}`
            );
          }}
        >
          Assessment Review
        </button>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto ">
      <div className="flex justify-between items-center mb-4 p-4 bg-white  rounded-md">
        <label className="flex items-center gap-2">
          Enter cut-off percentage
          <input
            type="number"
            placeholder="75"
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <Button
          loading={isLoading}
          handleClick={() => setShowEvaluationConfirm(true)}
          saveText="Auto Evaluate"
          disabled={(!numberValue || numberValue < 0 || numberValue > 99)}
          dataTip={(!numberValue || numberValue < 0 || numberValue > 99) ? "Enter a valid cut-off" : ""}
        />
      </div>

      {showEvaluateConfirm && (
        <PopUp
          message="Evaluate students based on threshold?"
          saveText="Confirm"
          handleSave={async () => {
            try {

              setIsLoading(true)
              await dispatch(
                selectStudentsByThreshold({
                  testId: assessmentId,
                  threshold: numberValue,
                })
              );

              dispatch(resetStudentList());
              dispatch(
                getTestResultPage({ id: assessmentId, status: "pending", page: 1 })
              );
              setShowEvaluationConfirm(false);
            } catch (error) {

            } finally {
              setIsLoading(false)
            }
          }}
          handleOverlay={() => setShowEvaluationConfirm(false)}
        />
      )}

      <Table
        columns={columns}
        data={filteredAssessmentsWithIndex}
        isLoading={TEST_DATA_RESPONSE_LOADING}
        className="mt-4"
      />

      <div className="pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) =>
            dispatch(
              getTestResultPage({ id: assessmentId, status: "pending", page })
            )
          }
        />
      </div>
    </div>
  );
};

export default Appeared;
