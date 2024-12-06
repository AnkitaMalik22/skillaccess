import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { addQuestionToTopic } from "../../../redux/college/test/thunks/topic";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import PopUp from "../../../components/PopUps/PopUp";
import Loader from "../../../components/college/test/addVideo/Loader";
import { FiUpload } from "react-icons/fi";
import useTranslate from "../../../hooks/useTranslate";
import { FaArrowRightLong } from "react-icons/fa6";

const AddQuestionsSelect = () => {
  //useTranslate();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentTopic } = useSelector((state) => state.test);

  const [selectQuestionType, setSelectQuestionType] = useState("");
  const [visible, setVisible] = useState(false);
  const [excel, setExcel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [excelJSON, setExcelJSON] = useState([]);
  const upload = React.createRef(null);

  // const [currentTopic, setCurrentTopic] = useState({});

  //console.log(id);
  // useEffect(() => {
  //   dispatch(setTest({ questionType: selectQuestionType }));
  // }, [selectQuestionType]);

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
        // switch (currentTopic.Type) {
        // switch (type) {
        switch (selectQuestionType) {
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
                toast.error("invalid no. of fields");
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

                    //console.log(header);
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
                      header.v !== "Title" ||
                      header.v !== "QuestionLevel"
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
                        //console.log(row.v);
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
                !["Title", "Duration"].every((header) =>
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
                    toast.error("Wrong Question Type");
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
      } else {
        setVisible(false);
      }

      toast.success("Questions Uploaded Successfully");
    } catch (error) {
      toast.error("An error occurred while uploading questions");
      //console.log(error);
      window.location.reload(true);
    }
  };

  const NavHandler = () => {
    switch (selectQuestionType) {
      case "mcq":
        // navigate(`/college/test/addMcqToTopic/${id}?type=mcq&addType=topic`);
        // handleUpload("mcq");
        break;

      // case "code":
      //   // navigate(`/college/test/code/${id}?type=compiler&addType=topic`);
      //   handleUpload("code");
      //   break;

      // case "video":
      //   // navigate(`/college/test/video/${id}?type=video&addType=topic`);
      //   handleUpload("video");

      //   break;

      case "findAnswer":
        // navigate(`/college/test/find-ans/${id}?type=findAnswer&addType=topic`);
        // handleUpload("findAnswer");
        break;

      case "essay":
        // navigate(`/college/test/essay/${id}?type=essay&addType=topic`);
        // handleUpload("essay");
        break;

      default:
        toast.error("please select field");
        break;
    }
  };

  return (
    <div className="font-dmSans text-sm font-bold">
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
      <div className="flex  justify-between mb-2 mt-5">
        <div>
          <button className="flex items-center ml-2 rounded-lg  gap-2">
            <button
              className="bg-[#D9E1E7]  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-14"
              onClick={() => navigate(-1)}
            >
              <img src="../../../../images/icons/back.png" alt="" srcset="" />
            </button>

            <div className="">
              <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans  ">
                Add Questions
              </h2>
            </div>
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-accent py-[5px] px-3 rounded-2xl text-xs gap-2 text-white"
              onClick={() => navigate(`/company/pr/quesBank/topic`)}
            >
              View All
              <FaArrowRightLong className="self-center text-lg text-white ml-4" />
            </button>
          </div>
        </div>
      </div>

      {/* <HeaderSelect Q={selectQuestionType} /> */}

      <div className="w-11/12 mx-auto mt-20">
        {/* larger screens */}
        <div className="   my-2 rounded-lg tracking-wide justify-between  ">
          <h2 className="font-normal text-xs sm:text-sm text-gray-400  mt-8 tracking-wide ">
            Add up to 10 custom questions to your assessment (optional). You can
            use five question types: multiple-choice, essay and find answer.
          </h2>
        </div>

        <div className="  sm:mt-5 rounded-lg tracking-wide  w-full ">
          {/* mcq */}
          <div
            className={`w-full flex justify-between bg-gray-100 rounded-lg border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "mcq" && "border-blued "
            }`}
            onClick={() => setSelectQuestionType("mcq")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "mcq"}
                  className={`w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center `}
                  onClick={(e) => {
                    setSelectQuestionType("mcq");
                  }}
                />
              </div>

              <img
                src="../../../../images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">
                Multiple Questions
              </h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              One Correct Answer
            </h2>
            <div className=""></div>
            {/* <img
              src="../../../../images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-lg border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "essay" && "border-blued "
            }`}
            onClick={() => setSelectQuestionType("essay")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  checked={selectQuestionType === "essay"}
                  name="ques"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("essay")}
                />
              </div>
              <img
                src="../../../../images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Essay</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Open Text Answer
            </h2>
            <div className=""></div>
            {/* <img
              src="../../../../images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-lg border  h-20 py-4 px-8  my-2  ${
              selectQuestionType === "findAnswer" && "border-blued "
            }`}
            onClick={() => setSelectQuestionType("findAnswer")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "findAnswer"}
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("findAnswer")}
                />
              </div>
              <img
                src="../../../../images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Find Answer</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Read Phrase and Answer them
            </h2>
            <div className=""></div>
            {/* <img
              src="../../../../images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>
          {/*  */}
        </div>
      </div>

      <div className=" w-11/12 mx-auto flex justify-end mt-14">
        <div className="flex gap-4">
          {/* <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-xs gap-2 text-blued"
            onClick={NavHandler}
          >
            New Question
          </button> */}

          <button
            className="self-center justify-center flex bg-accent py-3  rounded-xl w-48 text-white  gap-2 "
            onClick={() => {
              selectQuestionType === ""
                ? toast.error("Please select a question type")
                : upload.current.click();
            }}
          >
            <input
              accept=".xlsx"
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

          {/* <button className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-xs gap-2 text-blued">
            Copy question from another assessment
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddQuestionsSelect;
