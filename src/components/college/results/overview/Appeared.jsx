import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  bulkSelectStudents,
  getAllTests,
  getTest,
  selectStudentsByThreshold,
  selectStudentTest,
} from "../../../../redux/college/test/thunks/test";
import { getTestResultPage } from "../../../../redux/college/test/thunks/test";
import { getStudentResponse } from "../../../../redux/college/test/thunks/student";
import CircularLoader from "../../../CircularLoader";
import Skeleton from "../../../loaders/Skeleton";
import {
  getTestCompany,
  getTestResultPageCompany,
  selectStudentTestCompany,
} from "../../../../redux/company/test/thunks/test";
import isCompany, { isUni } from "../../../../util/isCompany";
import PopUp from "../../../PopUps/PopUp";
import Filter from "../../../buttons/Filter";
import Button from "../../../buttons/Button";
import Pagination from "../../../Pagination";
import { resetStudentList } from "../../../../redux/college/test/testSlice";

const Appeared = ({ assessment }) => {
  const [isLoading, setIsLoading] = useState({});
  const [loadingBatch, setLoadingBatch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [numberValue, setNumberValue] = useState("");
  const [category, setCategory] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEvaluateComfirm, setShowEvaluationConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const assessmentId = searchParams.get("assessment");

  const getColorByPercentage = (value) => {
    if (value >= 90) return 'bg-green-500'; // Excellent
    if (value >= 80) return 'bg-green-400'; // Very Good
    if (value >= 70) return 'bg-blue-500';  // Good
    if (value >= 60) return 'bg-yellow-500'; // Fair
    if (value >= 50) return 'bg-orange-500'; // Needs Improvement
    return 'bg-red-500'; // Poor
  };


  // For threshold-based selection:


  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedStudents(testDataResponse?.map((student) => student._id) || []);
    } else {
      setSelectedStudents([]);
    }
  };


  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };


  const handleStatusChange = (testId, responseId, student) => async (event) => {
    console.log("student");
    const status = event.target.value;
    setIsLoading({ ...isLoading, [responseId]: true });
    if (isCompany()) {
      console.log(testId, responseId, student);
      await dispatch(
        selectStudentTestCompany({
          testId: student.assessmentId,
          responseId: student._id,
          status,
        })
      );
      dispatch(getTestCompany(student.assessmentId));
      await dispatch(getTestResultPageCompany(student.assessmentId));
    } else {
      await dispatch(selectStudentTest({ testId, responseId, status }));
      dispatch(getTest(testId));
      await dispatch(getTestResultPage(assessment._id));
    }

    setIsLoading({ ...isLoading, [responseId]: false });
  };

  const { testDataResponse, response, TEST_DATA_RESPONSE_LOADING, } =
    useSelector((state) => {
      if (isCompany()) {
        return state.test;
      } else {
        return state.companyTest;
      }
    });

  // //console.log(response);

  useEffect(() => {
    if (assessmentId) {
      if (isCompany()) {
        dispatch(getTestResultPageCompany(assessmentId));

      } else {
        dispatch(resetStudentList)
        dispatch(getTestResultPage({ id: assessmentId, status: "pending", page: 1 }));

      }
      console.log(colors)
    }
  }, [assessmentId]);


  const getResponse = (responseId) => {
    dispatch(getStudentResponse(responseId));
  };

  let arr = [assessment?.studentResponses];

  let percentageData = [];
  let colors = [];



  const covertToDateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };
  { console.log(testDataResponse?.students) }

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center gap-4 mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="selectAll"
            checked={testDataResponse?.length > 0 && selectedStudents.length === testDataResponse?.length}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-accent"
          />
          <label htmlFor="selectAll" className="text-sm font-medium text-gray-700">
            Select All
          </label>
        </div> */}
        <div className="flex items-center gap-4">
          {/* <select
            onChange={(e) => setCategory(e.target.value)}
            className="block w-[180px] rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="selected">Selected</option>
          </select>

          <Button
            loading={loadingBatch}
            handleClick={() => { setShowConfirm(true) }}
            saveText="Confirm"
            disabled={!category} /> */}
          <label htmlFor="">Enter cut-off percentage</label>
          <input
            type="number"
            placeholder="75"
            min={0}
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
            className="block w-20  rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <Button
            loading={false}
            disabled={!numberValue}
            handleClick={() => {
              setShowEvaluationConfirm(true)
            }}
            saveText={"Auto evaluate"}
          />
        </div>

        {/* <Filter handleClick={() => { }} isPopupOpen={false} size="small" colorScheme="" /> */}
      </div>
      {/* legend */}
      <div className="grid-cols-5 text-center mx-auto font-dmSans font-bold text-base hidden md:grid bg-accent bg-opacity-5 rounded-md p-4 mb-5">
        {/* <h2 className="flex justify-center items-center">Select</h2> */}
        <h2>Name and Profile</h2>
        <h2>Date</h2>
        <h2>Status</h2>
        <h2>Assessment Performance</h2>
        <h2>Review</h2>
      </div>

      {showConfirm &&
        <PopUp
          message={`Mark ${selectedStudents.length} student(s) as ${category}`}
          saveText={"Save"}
          handleOverlay={() => { setShowConfirm(false) }}
          handleSave={async () => {
            setLoadingBatch(true)
            setShowConfirm(false)
            await dispatch(bulkSelectStudents({
              testId: assessmentId,
              studentIds: selectedStudents,
              status: "selected"
            }));
            setLoadingBatch(false)
          }}
        />}

      {
        showEvaluateComfirm && <PopUp
          saveText={"Save"}
          handleOverlay={() => {
            dispatch(selectStudentsByThreshold({
              testId: assessmentId,
              threshold: numberValue
            }));
            setShowEvaluationConfirm(false)
          }}
          handleSave={() => { setShowEvaluationConfirm(false) }}
        />
      }

      {TEST_DATA_RESPONSE_LOADING ? (
        <Skeleton />
      ) : (
        <>
          {!TEST_DATA_RESPONSE_LOADING && testDataResponse?.students?.length > 0 ? (
            testDataResponse?.students?.map((student, index) => {

              const percentage = student?.percentage || 0
              return (
                <div
                  className="grid-cols-5 rounded-2xl my-4 py-2 pl-2 text-center mx-auto font-dmSans text-sm hidden md:grid w-full border border-transparent hover:border-accent transition-colors duration-300 bg-white"
                  key={student._id}
                >
                  {/* Checkbox column */}
                  {/* <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-accent"
                      checked={selectedStudents.includes(student._id)}
                      onChange={(e) => handleSelectStudent(student._id, e.target.checked)}
                    />
  
                  </div> */}

                  {/* Existing columns */}
                  <div className="flex justify-center gap-2">
                    <div className="min-w-[3rem] h-12 self-center">
                      <img
                        src={student?.studentId?.avatar?.url || "/images/student.png"}
                        alt="icon"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <span className="break-words min-w-24 self-center">
                      <h2 className="font-dmSans font-semibold text-sm first-letter:capitalize">
                        {student?.studentId?.FirstName}
                      </h2>
                    </span>
                  </div>

                  {/* Rest of the existing columns remain the same */}
                  <div className="flex justify-center items-center">
                    <h2 className="font-dmSans text-sm">
                      {covertToDateFormat(student?.createdAt)}
                    </h2>
                  </div>

                  <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                    <div className="self-center h-fit">
                      {/* <span>
                        {isLoading[student?._id] ? (
                          <CircularLoader />
                        ) : (
                          <select
                            className="font-dmSans border-none focus:border-none bg-transparent focus:ring-0 sm:text-sm"
                            onChange={handleStatusChange(assessment?._id, student?._id, student)}
                            value={student?.status}
                          >
                            <option value="">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="selected">Selected</option>
                          </select>
                        )}
                      </span> */}

                      <h2 className="font-dmSans font-semibold text-sm first-letter:capitalize">
                        {student?.status}
                      </h2>

                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="self-center">
                      <span className="flex gap-2">
                        <div className="min-w-[6rem] bg-opacity-5 rounded-md h-3 mx-auto bg-gray-200">
                          <div
                            className={`h-full rounded-md ${getColorByPercentage(percentage)}`}
                            style={{
                              width: `${percentage}%`
                            }}
                          ></div>
                        </div>
                        <h2 className="font-medium text-sm">
                          {percentage?.toFixed(2)}%
                        </h2>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className="self-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCompany()) {
                          navigate(
                            `/company/pr/results/assessmentReview?studentId=${student.studentId._id}&assessmentId=${student.assessmentId}&responseId=${student._id}`
                          );
                        } else {
                          navigate(
                            `/${isUni() ? "university/pr" : "college"}/results/assessmentReview?studentId=${student.studentId._id
                            }&assessmentId=${student.assessmentId}&responseId=${student._id}`
                          );
                        }
                      }}
                    >
                      <h2 className="font-dmSans text-sm text-blued">
                        Assessment Review
                      </h2>
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex justify-center items-center h-96">
              <h2 className="font-dmSans text-lg text-gray-500">
                No students have appeared for this assessment
              </h2>
            </div>
          )}
        </>
      )}

      <Pagination
        currentPage={testDataResponse?.pagination?.currentPage || 1}
        onPageChange={(page) => { dispatch(getTestResultPage({ id: assessmentId, status: "pending", page: page })) }}
        totalPages={testDataResponse?.pagination?.totalPages || 1}

      />

    </div >
  );
};

export default Appeared;
