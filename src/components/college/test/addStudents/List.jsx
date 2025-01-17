import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Skeleton from "../../../loaders/Skeleton";
import { Table } from "../../../ui/tables/Table";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const List = ({ uploadedStudents, setStudents, students }) => {
  const { credit } = useSelector((state) => state.collegeAuth);
  const { GET_STUDENTS_LOADING } = useSelector((state) => state.test);

  const [checkedState, setCheckedState] = useState({});
  const [filters, setFilters] = useState({});
  const [isInputOpen, setIsInputOpen] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedState((prevState) => {
      const isCurrentlyChecked = !!prevState[id];
      const newCheckedState = { ...prevState, [id]: !isCurrentlyChecked };

      if (isCurrentlyChecked) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
      } else {
        const stdToAdd = uploadedStudents.find((student) => student._id === id);
        if (stdToAdd) {
          if (credit?.limit <= students.length) {
            toast.error(
              `Your current plan only supports inviting ${credit?.limit} students`
            );
            return prevState;
          } else {
            setStudents((prevStudents) => [...prevStudents, stdToAdd]);
          }
        }
      }
      return newCheckedState;
    });
  };

  const resetFilter = (field) => {
    setFilters((prev) => ({ ...prev, [field]: "" }));
    setIsInputOpen((prev) => ({ ...prev, [field]: false }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters dynamically
  const filteredStudents = uploadedStudents.filter((student) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key];
      if (!filterValue) return true; // No filter applied for this field
      const fieldValue =
        key === "name"
          ? `${student.FirstName} ${student.LastName}`.toLowerCase()
          : student[key]?.toString().toLowerCase();
      return fieldValue?.includes(filterValue.toLowerCase());
    });
  });

  const filteredStudentsWithIndex = filteredStudents.map((student, index) => ({
    ...student,
    index: index + 1, // Add index to each filtered assessment
  }));

  const columns = [
    {
      header: "S.No.",
      accessor: "index",
      className: "text-center",
    },
    {
      header: "Avatar",
      accessor: (student) => (
        <img
          src={student?.avatar?.url || "/images/student.png"}
          alt="avatar"
          className="rounded-full h-12 w-12"
        />
      ),
      className: "text-center",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span>Name</span>
            <button
              onClick={() =>
                setIsInputOpen((prev) => ({
                  ...prev,
                  name: !prev.name,
                }))
              }
              className="ml-2 text-gray-500"
            >
              {isInputOpen.name ? <IoMdClose /> : <RiArrowDropDownLine />}
            </button>
          </div>
          {isInputOpen.name && (
            <div className="mt-1 flex items-center">
              <input
                type="text"
                placeholder="Filter by Name"
                className="p-2 text-sm border border-gray-300 rounded-md focus:ring-0"
                value={filters.name || ""}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </div>
          )}
        </div>
      ),
      accessor: (student) => `${student.FirstName} ${student.LastName}`,
      className: "capitalize",
    },
    {
      header: (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span>Email</span>
            <button
              onClick={() =>
                setIsInputOpen((prev) => ({
                  ...prev,
                  email: !prev.email,
                }))
              }
              className="ml-2 text-gray-500"
            >
              {isInputOpen.email ? <IoMdClose /> : <RiArrowDropDownLine />}
            </button>
          </div>
          {isInputOpen.email && (
            <div className="mt-1 flex items-center">
              <input
                type="text"
                placeholder="Filter by Email"
                className="p-2 text-sm border border-gray-300 rounded-md focus:ring-0"
                value={filters.email || ""}
                onChange={(e) => handleFilterChange("email", e.target.value)}
              />
            </div>
          )}
        </div>
      ),
      accessor: "Email",
      className: "text-gray-400 lowercase",
    },
    {
      header: "Select",
      accessor: (student) => (
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={
            !!checkedState[student._id] ||
            students.some((std) => std._id === student._id)
          }
          onChange={() => handleCheckboxChange(student._id)}
        />
      ),
      className: "text-center",
    },
  ];

  return (
    <div className="mx-auto font-dmSans text-sm">
      {GET_STUDENTS_LOADING ? (
        <Skeleton />
      ) : uploadedStudents?.length > 0 ? (
        <Table
          columns={columns}
          data={filteredStudentsWithIndex}
          isLoading={GET_STUDENTS_LOADING}
        />
      ) : (
        <div className="w-full flex justify-center items-center bg-white rounded-2xl">
          <h2 className="text-xl font-bold">No Students Found</h2>
        </div>
      )}
    </div>
  );
};

export default List;
