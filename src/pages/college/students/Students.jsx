import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../../redux/college/student/studentSlice";
import Header from "../../../components/college/students/Header";
import { isUni } from "../../../util/isCompany";
import StudentsTable from "../../../components/ui/tables/StudentsTable";
import Pagination from "../../../components/Pagination";


const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterType, setFilterType] = useState("approved-students");
  const [batch, setBatch] = useState("all");
  const [createdAt, setCreatedAt] = useState("");
  const [selectedList, setSelectedList] = useState("approvedStudents");

  // Default to "approvedStudents"

  const [queryParams] = useSearchParams();

  const tab = queryParams.get("tab");
  const {
    uploadedStudents,
    approvedStudents,
    pendingStudents,
    GET_STUDENT_LOADING,
    pagination
  } = useSelector((state) => state.collegeStudents);

  const { user } = useSelector((state) => {
    return !isUni() ? state.collegeAuth : state.universityAuth;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        await dispatch(
          getStudents({
            id: user?._id,
            batch,
            filterType,
            createdAt,
            page: 1,
            limit: 10,
          })
        );
      }
    };
    fetchData();
  }, [user, batch, filterType, createdAt]);

  useEffect(() => {
    if (tab === "approvedStudents") {
      setSelectedList("approvedStudents")
    } else if (tab === "invitedStudents") {
      setSelectedList("invitedStudents")
    } else if (tab === "pendingStudents") {
      setSelectedList("pendingStudents")
    }
  }, [tab, uploadedStudents]);

  useEffect(() => {
    setFilteredStudents(uploadedStudents);
  }, [uploadedStudents]);

  const handleFilterStudents = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      setFilteredStudents(uploadedStudents);
      return;
    } else {
      setFilteredStudents(
        uploadedStudents.filter((student) => {
          const regex = new RegExp(value, "i");
          return (
            regex.test(student.FirstName) ||
            regex.test(student.LastName) ||
            regex.test(student.Email)
          );
        })
      );
    }
  };

  const handleCheckboxChange = (e) => {
    setSelectedList(e.target.value);
  };

  return (
    <>
      <Header
        handleFilter={handleFilterStudents}
        setYear={setBatch}
        year={batch}
        setCreatedAt={setCreatedAt}
        createdAt={createdAt}
        filterType={filterType}
        setFilterType={setFilterType}
        batch={batch}
        user={user}
      />

      {/* Checkbox Row for Selecting the List */}
      <div className="w-full flex justify-start gap-5 mb-5 p-5 shadow-md">
        {/* Approved Students Button */}
        <button
          onClick={() => {
            setSelectedList("approvedStudents")
            setFilterType("approved-students")

          }}
          className={`${selectedList === "approvedStudents"
            ? "bg-blued text-white"
            : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md font-semibold hover:bg-lightBlue hover:text-white`}
        >
          Approved Students
        </button>

        {/* Invited Students Button */}
        <button
          onClick={() => {
            setFilterType("invited-students")
            setSelectedList("invitedStudents")
          }}
          className={`${selectedList === "invitedStudents"
            ? "bg-blued text-white"
            : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md font-semibold hover:bg-lightBlue hover:text-white`}
        >
          Invited Students
        </button>

        {/* Pending Requests Button */}
        <button
          onClick={() => {
            setFilterType("pending-students")
            setSelectedList("pendingStudents")
          }}
          className={`${selectedList === "pendingStudents"
            ? "bg-blued text-white"
            : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md font-semibold hover:bg-lightBlue hover:text-white`}
        >
          Pending Requests
        </button>
      </div>

      {/* Full-Screen Table */}
      <div className="w-full h-full  ">
        {selectedList === "approvedStudents" && (
          <StudentsTable
            data={approvedStudents}
            isLoading={GET_STUDENT_LOADING}
            onRowClick={(student) =>
              navigate(`/college/students/profile/${student._id}`)
            }
            filterFields={[
              {
                header: "Name",
                accessor: (student) =>
                  `${student.FirstName} ${student.LastName}`,
                filterKey: "name",
              },
              {
                header: "Education",
                accessor: (student) => student.Education?.[0]?.Degree || "N/A",
                filterKey: "education",
              },
              {
                header: "Performance",
                accessor: (student) => student.performance || "Not Available",
                filterKey: "performance",
              },
              {
                header: "Department",
                accessor: (student) => student.department || "N/A",
                filterKey: "department",
              },
            ]}
          />
        )}

        {selectedList === "invitedStudents" && (
          <StudentsTable
            data={uploadedStudents}
            isLoading={GET_STUDENT_LOADING}
            onRowClick={(student) => { }
              // navigate(`/college/students/profile/${student._id}`)
            }
            filterFields={[
              {
                header: "First Name",
                accessor: (student) => student.FirstName,
                filterKey: "firstName",
              },
              {
                header: "Last Name",
                accessor: (student) => student.LastName,
                filterKey: "lastName",
              },
              {
                header: "Batch",
                accessor: (student) => student.batch,
                filterKey: "batch",
              },

            ]}
          />
        )}

        {selectedList === "pendingStudents" && (
          <StudentsTable
            data={pendingStudents}
            isLoading={GET_STUDENT_LOADING}
            onRowClick={(student) =>
              navigate(`/college/students/profile/${student._id}`)
            }
            filterFields={[
              {
                header: "First Name",
                accessor: (student) => student.FirstName,
                filterKey: "firstName",
              },
              {
                header: "Last Name",
                accessor: (student) => student.LastName,
                filterKey: "lastName",
              },
              {
                header: "Email",
                accessor: (student) => student.Email,
                filterKey: "email",
              },
              {
                header: "Department",
                accessor: (student) => student.department || "N/A",
                filterKey: "department",
              },
            ]}
          />
        )}

        <Pagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} onPageChange={(page) => {
          dispatch(getStudents({
            id: user?._id,
            batch,
            filterType,
            createdAt,
            page: page,
            limit: 10,
          }))
        }} />
      </div>
    </>
  );
};

export default Students;
