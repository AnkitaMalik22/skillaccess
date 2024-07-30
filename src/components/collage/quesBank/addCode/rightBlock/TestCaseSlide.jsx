import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";

const SlideUpDown = ({
  divRef,
  isOpen,
  userTheme,
  userCode,
  userLang,
  runClicked,
  setRunClicked,
  runLoading,
  setRunLoading,
  setQuestion,
  question,
}) => {
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [outputStatus, setOutputStatus] = useState("");
  const [hideTestCase, setHideTestCase] = useState(false);

  const handleChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const addTestCase = () => {
    try {
      let newQuestion = { ...question };
      newQuestion.testcase.push({
        input: userInput,
        expectedOutput: userOutput,
        isHidden: hideTestCase,
      });
      setQuestion(newQuestion);
      console.log(question);
      setUserInput("");
      setUserOutput("");
      setHideTestCase(false);
      setOutputStatus("");
      toast.success("Test case added successfully");
    } catch (error) {
      console.log("Error adding test case", error);
      toast.error("Error adding test case");
    }
  };

  function compileUserInput() {
    setRunLoading(true);

    return axios
      .post(
        `${process.env.REACT_APP_COMPILER_ROUTE}`,
        {
          code: userCode,
          language: userLang == "python" ? "py" : userLang,
          input: `${userInput}`,
          // input : `1\n${userInput}\n`,
        },
        {
          timeout: 20000,
        }
      )
      .then((res) => {
        if (!res.data.output) {
          setUserOutput("Error Executing code");
          setOutputStatus("Failed");
        } else {
          setUserOutput(res.data.output);
          setOutputStatus("Passed");
        }
        setRunLoading(false);
        setRunClicked(false);
      })
      .catch((err) => {
        setOutputStatus("Failed");
        setRunLoading(false);
        console.log("Error", err);
        setUserOutput("Error Executing code");
      });
  }

  useEffect(() => {
    if (runClicked) {
      compileUserInput();
      setRunClicked(false);
    }
  }, [runClicked]);

  return (
    <div className="w-full">
      <div
        ref={divRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          userTheme === "vs-dark" ? "bg-[#1e1e1e]" : "bg-slate-100"
        } p-4 h-[30rem]`}
      >
        <div className="p-4 gap-2">
          <div className="p-4">
            <label htmlFor={`input`}>Input:</label>
            <textarea
              type="text"
              id={`input`}
              className={`border p-1 w-full ${
                outputStatus !== ""
                  ? outputStatus === "Passed"
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }`}
              name="input"
              value={userInput}
              onChange={(e) => handleChangeInput(e)}
            />

            <label htmlFor={`output`}>Expected Output:</label>
            <textarea
              type="text"
              id={`output`}
              className={`border p-1 w-full ${
                outputStatus !== ""
                  ? outputStatus === "Passed"
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }`}
              disabled={true}
              name="expectedOutput"
              value={userOutput}
            />

            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Hide this testcase</h3>
                <Switch
                  checked={hideTestCase}
                  onChange={() => setHideTestCase(!hideTestCase)}
                  className={`self-center ${
                    hideTestCase
                      ? "bg-white border-2 border-blue-600"
                      : " border-2 border-gray-400"
                  } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
                >
                  <span
                    className={`${
                      hideTestCase
                        ? "translate-x-6 bg-blue-600"
                        : "translate-x-1 bg-gray-400 "
                    } inline-block h-4 w-4 transform rounded-full  transition`}
                  />
                </Switch>
              </div>
              <button
                className={`${
                  outputStatus === "Passed" ? "bg-green-500" : "bg-slate-500"
                } text-white rounded-lg px-5 py-3 flex gap-2`}
                onClick={() => {
                  outputStatus === "Passed"
                    ? addTestCase()
                    : compileUserInput();
                }}
              >
                <FaPlus className="self-center" /> Add Test Case
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 max-w-2xl mx-auto">
          <div
            className={`border-l-4  p-4 mb-4
             ${
               outputStatus !== ""
                 ? outputStatus === "Passed"
                   ? "bg-green-200 border-green-500 text-green-700"
                   : "bg-red-200 border-red-500 text-red-700"
                 : ""
             }`}
            role="message"
          >
            <div className="flex justify-between items-center flex-col">
              <h3 className="font-bold">Message</h3>
              <p className="text-md  focus:outline-none">
                {outputStatus !== ""
                  ? outputStatus === "Passed"
                    ? "Test case passed!"
                    : "Test case failed!"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideUpDown;
