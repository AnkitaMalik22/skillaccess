import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import PopUp from "../../../PopUps/PopUp";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../addVideo/Loader";
import toast, { Toaster } from "react-hot-toast";
import { addQuestionToTopic } from "../../../../redux/collage/test/thunks/topic";

const Header = ({
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
    setVisible(true);
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
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        setExcel(e.target.result);
      };
    } else {
      toast.error("invalid file type");
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
                  setLoading(false);
                  toast.error(header + " is incorrect");
                  return;
                }
              });

              if (count !== 8) {
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

                    console.log(header);
                    if (header.v === "option") {
                      if (row) {
                        let OpArr = jsonData[rowNum].Options || [];
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          Options: [...OpArr, row.v],
                        };
                      } else {
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
            } catch (error) {}

            setExcelJSON(jsonData.slice(1));

            if (error === false) {
              await dispatch(
                addQuestionToTopic({
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

                  toast.error(header + " is incorrect");
                  return;
                }
              });
              // if (
              //   !["Title", "Duration", "question"].every((header) =>
              //     headers.includes(header)
              //   )
              // ) {
              //   toast.error("Missing/Incorrect header(s)");
              //   setLoading(false);
              //   return;
              // }
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
                        console.log(row.v);
                        jsonData[rowNum] = {
                          ...jsonData[rowNum],
                          [header.v]: row.v,
                          section: currentTopic._id,

                          id: Date.now() + currentTopic._id,
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
              }
            } catch (error) {
              window.location.reload(true);
            }

            setExcelJSON(jsonData.slice(1));

            if (error === false) {
              await dispatch(
                addQuestionToTopic({
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
              addQuestionToTopic({
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
        navigate(`/collage/test/select?level=${searchParams.get("level")}`);
      } else {
        setVisible(false);
      }
    } catch (error) {
      window.location.reload(true);
    }
  };

  const handleNav = () => {
    if (type === "section") {
      if (level === "adaptive") {
        if (currentQuestionCount > totalQuestions * 2) {
          return toast.error("too many questions");
        }
      } else {
        if (currentQuestionCount > totalQuestions) {
          return toast.error("too many questions");
        }
      }
      {
        navigate(
          `/collage/test/${
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
          `/collage/test/AddMcqToTopic/${sectionId}?type=mcq&addType=topic&level=adaptive`
        );
      } else {
        navigate(`/collage/test/typeOfQuestions/${sectionId}?level=${level}`);
      }
    }
  };
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

      <div>
        <button className="flex self-center  rounded-lg  gap-2">
          <button
            onClick={() => {
              type === "section" &&
                navigate(`/collage/test/questions?level=${level}`);
              type === "topic" &&
                (level === "adaptive"
                  ? navigate(`/collage/test/selectAdaptive?level=${level}`)
                  : navigate(`/collage/test/select?level=${level}`));
              type === "assessment" && navigate(-1);
            }}
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
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
                <button
                  className="self-center justify-center flex bg-blue-700 py-3  rounded-xl w-48 text-white  gap-2 "
                  onClick={() => {
                    upload.current.click();
                  }}
                >
                  <input
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
              )}

            <button className="bg-[#F8F8F9] self-center  rounded-lg  w-10 sm:h-11 sm:w-14">
              <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
