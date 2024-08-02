import React, { useState } from "react";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useRef } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import PopUp from "../../../../PopUps/PopUp";
import { FiUpload } from "react-icons/fi";
import Loader from "../../addVideo/Loader";
const TestCases = ({
  question,
  handleChanges,
  handleQuestionChange,
  setQuestion,
}) => {
  // testcase: [{ input: "", expectedexpectedOutput: ""}],
  const [excel, setExcel] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const upload = useRef(null);
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

  const handleTestcaseUpload = async () => {
    if (excel) {
      setLoading(true);
      try {
        const workbook = XLSX.read(excel, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = jsonData[0];
        const testCasess = [];

        if (
          headers.length !== 3 ||
          headers[0] !== "input" ||
          headers[1] !== "expectedOutput" ||
          headers[2] !== "isHidden"
        ) {
          toast.error("Invalid file format");
          return;
        }

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];

          if (row[0] === "") {
            toast.error(`input  is Required at Row ${i}`);
            setLoading(false);
            return;
          } else if (row[1] === "") {
            toast.error(`expectedOutput is Required at Row ${i} `);
            setLoading(false);
            return;
          } else if (row[2] === "") {
            toast.error(`isHidden is Required at Row ${i} ${row[2]}`);
            setLoading(false);
            return;
          } else {
            testCasess.push({
              input: row[0],
              expectedOutput: row[1],
              isHidden: row[2],
            });
            setQuestion((prev) => ({
              ...prev,
              testcase: [
                ...prev.testcase,
                {
                  input: row[0],
                  expectedOutput: row[1],
                  isHidden: row[2],
                },
              ],
            }));
          }
        }

        // //console.log(students);

        setLoading(false);
        setVisible(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while processing the file");
      }
    } else {
      toast.error("No file selected");
    }
  };
  const [testCases, setTestCases] = useState([
    {
      input: [1, 2, 3, 5, [1, 2, 3, 4, 5]],
      expectedOutput: [4],
      isHidden: true,
    },
    { input: [6, "hello"], expectedOutput: [9], isHidden: true },
  ]);

  const [expandedTestCases, setExpandedTestCases] = useState([]);

  const handleCheckboxChange = (index) => {
    let testCaseCopy = question.testcase;
    testCaseCopy[index] = {
      ...question.testcase[index],
      isHidden: !question.testcase[index].isHidden,
    };

    setQuestion((prev) => ({
      ...prev,

      testcase: testCaseCopy,
    }));
  };

  const deleteHandler = (index) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
    setExpandedTestCases((prev) => prev.filter((_, i) => i !== index));
    setQuestion((prev) => ({
      ...prev,
      testcase: prev.testcase.filter((_, i) => i !== index),
    }));
  };

  const addTestCase = () => {
    const newTestCase = { input: [1], expectedOutput: [1], isHidden: true };
    setTestCases((prev) => [...prev, newTestCase]);
    setExpandedTestCases((prev) => [...prev, true]);

    setQuestion((prev) => ({
      ...prev,
      testcase: [
        ...prev.testcase,
        { input: [], expectedOutput: [], isHidden: true },
      ],
    }));
  };

  const handleInputChange = (index, value) => {
    setTestCases((prev) => {
      const updatedTestCases = [...prev];
      updatedTestCases[index].input = JSON.parse(value);
      return updatedTestCases;
    });
  };

  const handleOutputChange = (index, value) => {
    setTestCases((prev) => {
      const updatedTestCases = [...prev];
      updatedTestCases[index].expectedOutput = JSON.parse(value);
      return updatedTestCases;
    });
  };

  const toggleTestCase = (index) => {
    setExpandedTestCases((prev) => {
      const updatedExpandedTestCases = [...prev];
      updatedExpandedTestCases[index] = !updatedExpandedTestCases[index];
      return updatedExpandedTestCases;
    });
  };
  // //console.log(question?.testcase);
  return (
    <div className="h-[535px] overflow-y-auto w-full ">
      {visible && (
        <PopUp
          visible={visible}
          handleSave={handleTestcaseUpload}
          handleOverlay={() => {
            upload.current.value = "";
            setVisible(false);
          }}
        />
      )}

      {question?.testcase?.map((testCase, index) => (
        <section
          key={index}
          className="mb-4 relative border border-gray-300 rounded-xl py-1 "
        >
          <div className="flex w-full justify-between rounded-t-lg pl-4 py-2 text-left text-sm font-medium focus:outline-none ">
            <div>
              <p className="text-sm font-bold">Test Case {index + 1}</p>
            </div>
            <div className="flex gap-2 self-center">
              <FaXmark
                className="h-6 w-6 self-center"
                onClick={() => deleteHandler(index)}
              />

              <button
                className="flex gap-2 w-10/12 self-center"
                onClick={() => toggleTestCase(index)}
              >
                <FaCaretDown
                  className={`h-6 w-6 transform ${
                    expandedTestCases[index] ? "rotate-180" : ""
                  }`}
                />
                <h2></h2>{" "}
              </button>
            </div>
          </div>

          {expandedTestCases[index] && (
            <div className="p-4">
              <label htmlFor={`input-${index}`}>Input:</label>
              <textarea
                type="text"
                id={`input-${index}`}
                className="border p-1 w-full h-[100px]"
                // value={testCase.input.map((item) => (Array.isArray(item) ? `[${item.join(",")}]` : item)).join(", ")}
                // onChange={(e) => handleInputChange(index, e.target.value)}
                name="input"
                value={question.testcase[index].input}
                // onChange={(e) => handleQuestionChange(e, index)}
                disabled={true}
              />

              <label htmlFor={`output-${index}`}>expectedOutput:</label>
              <textarea
                type="text"
                id={`output-${index}`}
                className="border p-1 w-full"
                name="expectedOutput"
                value={question.testcase[index].expectedOutput}
                disabled={true}
                // onChange={(e) => handleQuestionChange(e, index)}
                // value={testCase.expectedOutput.map((item) => (Array.isArray(item) ? `[${item.join(",")}]` : item)).join(", ")}
                // onChange={(e) => handleOutputChange(index, e.target.value)}
              />

              <label className="inline-flex w-full items-center justify-end cursor-pointer pt-4">
                <span className="  text-sm font-bold text-gray-900 dark:text-gray-300 mr-4">
                  Hide this testcase
                </span>
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer "
                  checked={testCase.isHidden}
                  disabled={true}
                  // onChange={() => handleCheckboxChange(index)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}
        </section>
      ))}

      {/* <div className="w-full flex justify-between mx-4 ">
        <button
          className="  bg-[#0052CC] text-white rounded-lg px-5 py-3 flex gap-2"
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
          {loading ? <Loader /> : <FiUpload className="self-center text-lg" />}{" "}
          Upload Testcases
        </button>
        <button
          className="  bg-[#0052CC] text-white rounded-lg px-5 py-3 flex gap-2 "
          onClick={addTestCase}
        >
          <FaPlus className="self-center" /> Add Test Case
        </button>{" "}
      </div> */}
    </div>
  );
};

export default TestCases;
