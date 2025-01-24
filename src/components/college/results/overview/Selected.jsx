import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getselectedStudents } from "../../../../redux/college/test/thunks/test";
import { getselectedStudentsCompany } from "../../../../redux/company/test/thunks/test";
import Pagination from "../../../Pagination";
import { Table } from "../../../ui/tables/Table";
import isCompany, { isUni } from "../../../../util/isCompany";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Selected = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (assessmentId) {
      if (isCompany()) {
        dispatch(getselectedStudentsCompany(assessmentId));
      } else {
        dispatch(getselectedStudents(assessmentId));
      }
    }
  }, [assessmentId, dispatch]);

  const { selectedStudents, SELECTED_STUDENTS_LOADING } = useSelector((state) =>
    isCompany() ? state.companyTest : state.test
  );

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

  const filteredData =
    selectedStudents?.filter((student) => {
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
        parseFloat(student?.percentage || 0) ===
          parseFloat(filters.assessmentPerformance);

      return nameMatch && profileDateMatch && performanceMatch;
    }) || [];

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
      accessor: (_, index) => index + 1,
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
      header: "Date",
      accessor: (student) => new Date(student?.createdAt).toDateString(),
    },
    {
      header: "Status",
      accessor: (student) => (
        <span className="capitalize">{student?.status || "Pending"}</span>
      ),
    },
    {
      header: "Assessment Performance",
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
              : `/${
                  isUni() ? "university/pr" : "college"
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
    <div className="w-full mx-auto">
      <Table
        columns={columns}
        data={filteredData}
        isLoading={SELECTED_STUDENTS_LOADING}
        className="mt-4"
      />
    </div>
  );
};

export default Selected;
