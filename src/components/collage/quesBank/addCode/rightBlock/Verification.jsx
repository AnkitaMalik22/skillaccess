import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Switch } from "@headlessui/react";
import SlideUpDown from "./TestCaseSlide";
import LoaderIcon from "../../addVideo/Loader";

const Verification = ({
  selectedLanguage,
  handleEditorChange,
  editorValue,
  question,
  setQuestion,
}) => {
  const [testCaseExpand, setTestCaseExpand] = useState(false);

  const [userTheme, setUserTheme] = useState("light");
  const [runClicked, setRunClicked] = useState(false);
  const [runLoading, setRunLoading] = useState(false);

  const handleExpand = () => {
    setTestCaseExpand(!testCaseExpand);
  };

  useEffect(() => {
    if (!testCaseExpand && runClicked) {
      setTestCaseExpand(true);
    }
  }, [testCaseExpand, runClicked]);

  return (
    <div className="w-full   ">
      <div className="w-full flex items-center justify-between  mb-2">
        {/* testcases expand btn */}

        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">
            {testCaseExpand ? "Test Cases" : "Initial Code"}
          </h3>
          <Switch
            checked={testCaseExpand}
            onChange={handleExpand}
            className={`self-center ${
              testCaseExpand
                ? "bg-white border-2 border-blued"
                : " border-2 border-gray-400"
            } relative inline-flex h-6 w-12 pr-2 items-center rounded-full`}
          >
            <span
              className={`${
                testCaseExpand
                  ? "translate-x-6 bg-blue-600"
                  : "translate-x-1 bg-gray-400 "
              } inline-block h-4 w-4 transform rounded-full  transition`}
            />
          </Switch>
        </div>
        <button
          className={`  py-2 px-4 rounded-xl flex 
                ${
                  "vs-dark"
                    ? "bg-gray-200 "
                    : "bg-[#00875A] border border-gray-200 text-gray-200"
                }`}
          onClick={() => setRunClicked(true)}
          // onClick={runLoading ? null : compile}
          // onClick={compile}
        >
          {runLoading ? (
            <>
              Running... <LoaderIcon className="ml-4 animate-spin" />{" "}
            </>
          ) : (
            "Run"
          )}
        </button>
      </div>
      {!testCaseExpand ? (
        <div className="w-full">
          <Editor
            theme="vs-light"
            height="57.3vh"
            defaultLanguage={selectedLanguage}
            value={
              question?.code?.[selectedLanguage]?.solutionCode || editorValue
            }
            onChange={(value) => handleEditorChange(value, "solutionCode")}
            className="border-2  border-gray-300"
          />
        </div>
      ) : (
        <SlideUpDown
          answer={question}
          testcase={question?.testcase}
          className="w-full"
          userTheme={userTheme}
          question={question}
          setQuestion={setQuestion}
          userCode={editorValue}
          userLang={selectedLanguage}
          runClicked={runClicked}
          setRunClicked={setRunClicked}
          runLoading={runLoading}
          setRunLoading={setRunLoading}
        />
      )}
    </div>
  );
};

export default Verification;
