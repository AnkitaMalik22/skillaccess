import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaDownload } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";

import { useDispatch, useSelector } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

import PopUp from "../PopUps/PopUp";
import Loader from "../loaders/Loader";
import { addQuestionToTopicCompany } from "../../redux/company/test/thunks/topic";

const ReviewHeader = ({
  name,
  type,
  sectionId,
  qt,
  topicId,
  view,
  visible,
  setVisible,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [excel, setExcel] = useState("");
  const [excelJSON, setExcelJSON] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const ques = searchParams.get("question");
  const level = searchParams.get("level");

  const { currentTopic, currentQuestionCount, totalQuestions } = useSelector(
    (state) => state.test
  );
  const handleFile = (e) => {
    const types = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
      "application/vnd.ms-excel.template.macroEnabled.12",
      "application/vnd.ms-excel.addin.macroEnabled.12",
      "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    ];
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setVisible(true);
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        setExcel(e.target.result);
      };
    } else {
      toast.error("Invalid file type only excel file accepted");
    }
  };
  const upload = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      if (excel !== "" && excel !== undefined) {
        setLoading(true);

        const workbook = XLSX.read(excel, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // const data = XLSX.utils.sheet_to_json(worksheet);
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        let count = 0;
        let rowCount = 0;
        let jsonData = [];
        let headers = [];
        switch (currentTopic.Type) {
          case "mcq":
            try {
              for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: range.s.r,
                  c: colNum,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  headers.push(cell.v);
                  count++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }
              for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: rowNum,
                  c: 0,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  rowCount++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }

              headers.forEach((header) => {
                if (
                  ![
                    "Title",
                    "Duration",
                    "option",
                    "AnswerIndex",
                    "QuestionLevel",
                  ].includes(header)
                ) {
                  setError(true);
                  setLoading(false);
                  toast.error(header + " is incorrect");
                  return;
                }
              });

              if (count !== 8) {
                setError(true);
                setLoading(false);
                toast.error("invalid no. of fields", count);
                return;
              }
              for (let colNum = range.s.c; colNum <= count; colNum++) {
                for (let rowNum = range.s.r + 1; rowNum <= rowCount; rowNum++) {
                  const row =
                    worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

                  let header =
                    worksheet[XLSX.utils.encode_cell({ r: 0, c: colNum })];

                  if (header) {
                    if (
                      header.v !== "option" &&
                      header.v !== "AnswerIndex" &&
                      header.v !== "Duration" &&
                      header.v !== "Title" &&
                      header.v !== "QuestionLevel"
                    ) {
                      toast.error("Invalid Headers");
                      setLoading(false);
                      setError(true);
                      return;
                    }

                    // //console.log(header);
                    if (header.v === "option") {
                      if (row) {
                        let OpArr = jsonData[rowNum].Options || [];
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          Options: [...OpArr, row.v],
                        };
                      } else {
                        setError(true);
                        toast.error(
                          "Invalid value! row:" + (rowNum + 1) + "col:" + colNum
                        );
                        setLoading(false);
                        return;
                      }
                    } else if (
                      header.v === "AnswerIndex" ||
                      header.v === "Duration" ||
                      header.v === "Title" ||
                      header.v === "QuestionLevel"
                    ) {
                      if (header.v === "AnswerIndex") {
                        if (row) {
                          if (row.v > 3 && typeof row.v !== "number") {
                            setError(true);
                            toast.error(
                              "Invalid value" + (rowNum + 1) + "col:" + colNum
                            );
                            setLoading(false);
                            return;
                          } else {
                            jsonData[rowNum] = {
                              ...jsonData[rowNum],
                              [header.v]: row.v,
                              section: currentTopic._id,

                              id: Date.now() + currentTopic._id,
                            };
                          }
                        } else {
                          setError(true);
                          toast.error(
                            "Invalid value! row:" +
                              (rowNum + 1) +
                              "col:" +
                              colNum
                          );
                          setLoading(false);
                          return;
                        }
                      }

                      if (header.v === "Duration") {
                        if (row) {
                          if (typeof row.v !== "number") {
                            setError(true);
                            toast.error(
                              "Invalid value" + (rowNum + 1) + "col:" + colNum
                            );
                            setLoading(false);
                            return;
                          } else {
                            jsonData[rowNum] = {
                              ...jsonData[rowNum],
                              [header.v]: row.v,
                              section: currentTopic._id,

                              id: Date.now() + currentTopic._id,
                            };
                          }
                        } else {
                          setError(true);
                          toast.error(
                            "Invalid value! row:" +
                              (rowNum + 1) +
                              "col:" +
                              colNum
                          );
                          setLoading(false);
                          return;
                        }
                      }
                      if (row) {
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          [header.v]: row.v,
                          section: currentTopic._id,

                          id: Date.now() + currentTopic._id,
                        };
                      } else {
                        setError(true);
                        toast.error(
                          "Invalid value! row:" + (rowNum + 1) + "col:" + colNum
                        );
                        setLoading(false);
                        return;
                      }
                    }
                  }
                }
              }
            } catch (error) {
              setError(true);
            }

            setExcelJSON(jsonData.slice(1));

            if (error === false) {
              await dispatch(
                addQuestionToTopicCompany({
                  data: jsonData.slice(1),
                  type: "mcq",
                  isMultiple: true,
                  id: currentTopic._id,
                })
              );
              setLoading(false);
              // navigate(-1);
            } else {
              setLoading(false);
              setError(true);
              toast.error("unknown error, reloading page");
              setTimeout(() => {
                window.location.reload(true);
              }, 3000);
            }
            break;

          case "findAnswer":
            try {
              for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: rowNum,
                  c: 0,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  rowCount++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }

              for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: range.s.r,
                  c: colNum,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  headers.push(cell.v);
                  count++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }

              if (count > 6) {
                setLoading(false);
                setError(true);
                toast.error("invalid no. of fields");
                return;
              }
              headers.forEach((header) => {
                if (
                  !["Title", "Duration", "question", "QuestionLevel"].includes(
                    header
                  )
                ) {
                  setLoading(false);
                  setError(true);
                  toast.error(header + " is incorrect");
                  return;
                }
              });
              if (
                !["Title", "Duration", "question", "QuestionLevel"].every(
                  (header) => headers.includes(header)
                )
              ) {
                toast.error(
                  'Header must contain "Title", "Duration", "question","QuestionLevel"'
                );
                setLoading(false);
                return;
              }
              for (let colNum = range.s.c; colNum <= count; colNum++) {
                for (let rowNum = range.s.r + 1; rowNum <= rowCount; rowNum++) {
                  const row =
                    worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

                  let header =
                    worksheet[XLSX.utils.encode_cell({ r: 0, c: colNum })];

                  if (header) {
                    if (
                      header.v !== "question" &&
                      header.v !== "Duration" &&
                      header.v !== "Title" &&
                      header.v !== "QuestionLevel"
                    ) {
                      setLoading(false);
                      setError(true);
                      return;
                    }

                    if (header.v === "question") {
                      let OpArr = jsonData[rowNum].questions || [];
                      if (row) {
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          questions: [...OpArr, { question: row.v }],
                        };
                      }
                    } else if (
                      header.v === "Duration" ||
                      header.v === "Title" ||
                      header.v === "QuestionLevel"
                    ) {
                      if (header.v === "Duration") {
                        if (row) {
                          if (typeof row.v !== "number") {
                            setError(true);
                            toast.error(
                              "Invalid value row:" +
                                (rowNum + 1) +
                                "col:" +
                                (colNum + 1) +
                                "-->" +
                                row.v
                            );
                            setLoading(false);
                            return;
                          } else {
                            jsonData[rowNum] = {
                              ...jsonData[rowNum],
                              [header.v]: row.v,
                              section: currentTopic._id,

                              id: Date.now() + currentTopic._id,
                            };
                          }
                        } else {
                          setError(true);
                          toast.error(
                            "Invalid value! row:" +
                              (rowNum + 1) +
                              "col:" +
                              colNum
                          );
                          setLoading(false);
                          return;
                        }
                      }
                      if (row) {
                        // //console.log(row.v);
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          [header.v]: row.v,
                          section: currentTopic._id,

                          id: Date.now() + currentTopic._id,
                        };
                      } else {
                        setError(true);
                        toast.error(
                          "Invalid Value! row:" + (rowNum + 1) + "col:" + colNum
                        );
                        setLoading(false);
                        return;
                      }
                    }
                  }
                }
              }
            } catch (error) {
              window.location.reload(true);
              setError(true);
            }

            setExcelJSON(jsonData.slice(1));

            if (error === false) {
              await dispatch(
                addQuestionToTopicCompany({
                  data: jsonData.slice(1),
                  type: "findAnswer",
                  isMultiple: true,
                  id: currentTopic._id,
                })
              );
              setLoading(false);
              // navigate(-1);
            }
            break;

          case "essay":
            try {
              for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: range.s.r,
                  c: colNum,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  headers.push(cell.v);
                  count++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }
              for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
                const cellAddress = XLSX.utils.encode_cell({
                  r: rowNum,
                  c: 0,
                });
                const cell = worksheet[cellAddress];
                if (cell && cell.v) {
                  // Check if the cell is not empty
                  rowCount++;
                } else {
                  // Break the loop if an empty cell is encountered
                  break;
                }
              }

              if (
                !["Title", "Duration", "QuestionLevel"].every((header) =>
                  headers.includes(header)
                )
              ) {
                toast.error("Missing/Incorrect header(s)");
                setLoading(false);
                return;
              }
              for (let colNum = range.s.c; colNum <= count; colNum++) {
                for (let rowNum = range.s.r + 1; rowNum <= rowCount; rowNum++) {
                  const row =
                    worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

                  let header =
                    worksheet[XLSX.utils.encode_cell({ r: 0, c: colNum })];

                  if (
                    header.v !== "Duration" &&
                    header.v !== "Title" &&
                    header.v !== "QuestionLevel"
                  ) {
                    setLoading(false);
                    toast.error("invalid header");
                    return;
                  } else {
                    if (row) {
                      jsonData[rowNum] = {
                        ...jsonData[rowNum],
                        [header.v]: row.v,
                        id: Date.now() + currentTopic._id,
                        section: currentTopic._id,
                      };
                    } else {
                      toast.error(
                        "Invalid Value! row:" + (rowNum + 1) + "col:" + colNum
                      );
                      setLoading(false);
                      return;
                    }
                  }
                }
              }
            } catch (error) {}

            setExcelJSON(jsonData.slice(1));
            await dispatch(
              addQuestionToTopicCompany({
                data: jsonData.slice(1),
                type: "essay",
                isMultiple: true,
                id: currentTopic._id,
              })
            );
            setLoading(false);
            // navigate(-1);
            break;

          default:
            break;
        }

        setVisible(false);
        toast.success("questions added successfully");
        level === "adaptive"
          ? navigate(`/company/pr/test/selectAdaptive?level=${level}`)
          : navigate(`/company/pr/test/select?level=${level}`);
        // navigate(`/company/pr/test/select?level=${searchParams.get("level")}`);
      } else {
        setVisible(false);
      }
    } catch (error) {
      window.location.reload(true);
    }
  };
  // //console.log(type);
  const handleNav = () => {
    if (type === "section") {
      if (level === "adaptive") {
        if (currentQuestionCount > totalQuestions * 2) {
          return toast.error(
            `Number of questions must be less than or equal to ${
              totalQuestions / 2
            }`
          );
        }
      } else {
        if (currentQuestionCount > totalQuestions) {
          return toast.error(
            `Number of questions must be less than or equal to ${totalQuestions}`
          );
        }
      }
      {
        navigate(
          `/company/pr/test/${
            qt === "mcq"
              ? "addMcq"
              : qt === "findAnswer"
              ? "find-ans"
              : qt === "compiler"
              ? "code"
              : qt === "essay"
              ? "essay"
              : qt === "video"
              ? "video"
              : "addMcq"
          }/${id}?addType=test&topicId=${topicId}&level=${level}`
        );
      }
    } else {
      if (level === "adaptive") {
        navigate(
          `/company/pr/test/AddMcqToTopic/${sectionId}?type=mcq&addType=topic&level=adaptive`
        );
      } else {
        navigate(
          `/company/pr/test/typeOfQuestions/${sectionId}?level=${level}`
        );
      }
    }
  };

  const imageUrl = `/download/${
    ques === "mcq"
      ? "Mcq.xlsx"
      : ques === "findAnswer"
      ? "findAnswer.xlsx"
      : "essay.xlsx"
  }`;
  const imageName = `${
    ques === "mcq"
      ? "Mcq.xlsx"
      : ques === "findAnswer"
      ? "findAnswer.xlsx"
      : "essay.xlsx"
  }`; // Replace with your desired image name

  return (
    <div className="flex  justify-between items-center mb-5">
      {visible && (
        <PopUp
          visible={visible}
          handleSave={handleUpload}
          handleOverlay={() => {
            upload.current.value = "";
            setVisible(false);
          }}
        />
      )}

      <img src={imageUrl} alt="" srcset="" className="hidden" />

      <div>
        <button className="flex self-center  rounded-md  gap-2">
          <button
            onClick={() => {
              type === "section" &&
                navigate(`/company/pr/test/questions?level=${level}`);
              type === "topic" &&
                (level === "adaptive"
                  ? navigate(`/company/pr/test/selectAdaptive?level=${level}`)
                  : navigate(`/company/pr/test/select?level=${level}`));
              type === "assessment" && navigate(-1);
            }}
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-md h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="flex self-center">
            <h2 className="text-3xl  text-left font-bold font-dmSans self-center capitalize">
              {name ? name : "Create Assessment"}
            </h2>
          </div>
        </button>
      </div>

      <div className="rounded-xl mx-2   h-12 flex my-2 ">
        {type !== "assessment" && view !== "false" && (
          <div className=" flex gap-2">
            <button
              className="self-center justify-center flex bg-[#F8F8F9] py-3  rounded-xl w-32  gap-2 "
              onClick={handleNav}
            >
              <FiPlus className="self-center text-lg " /> Add
            </button>

            {type === "topic" &&
              currentTopic.Type !== "compiler" &&
              currentTopic.Type !== "video" && (
                <>
                  <button
                    className="self-center justify-center flex bg-accent py-3  rounded-xl w-48 text-white  gap-2 "
                    onClick={() => {
                      upload.current.click();
                    }}
                  >
                    <input
                      accept=".xlsx "
                      type="file"
                      ref={upload}
                      className="hidden"
                      onChange={handleFile}
                    />
                    {loading ? (
                      <Loader />
                    ) : (
                      <FiUpload className="self-center text-lg " />
                    )}{" "}
                    Upload Questions
                  </button>
                  <a
                    className="flex items-center gap-2"
                    href={imageUrl}
                    download={imageName}
                  >
                    Sample File <FaDownload className="self-center" />
                  </a>
                </>
              )}

            {/* <button className="bg-[#F8F8F9] self-center  rounded-md  w-10 sm:h-11 sm:w-14">
              <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewHeader;
