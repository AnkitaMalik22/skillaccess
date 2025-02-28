import React, { useEffect, useState } from "react";
import Signature from "./Signature";
import Initial from "./Initial";
import TestCases from "./TestCases";
import Verification from "./Verification";

const Code = ({
  toggle,
  setToggle,
  question,
  handleChanges,
  handleQuestionChange,
  setQuestion,
  handleEditorChange,
  editorValue,
}) => {
  const selectedLanguage = question.codeLanguage.toLowerCase();
  // //console.log(selectedLanguage);
  return (
    <div className="font-dmSans">
      <h2 className="font-bold mb-3 text-xl">
        Coding Language: {question.codeLanguage || "Java"}
      </h2>

      {/* toggler */}
      <div className="p-2 mt-4 rounded-md">
        <span className="grid grid-cols-3 text-lg mb-4">
          {/* <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(1)}
            >
              Function signature
            </h2>
            <div
              className={`w-full h-1 rounded-md ${
                toggle === 1 ? "bg-accent" : ""
              } `}
            ></div>
          </div> */}

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(1)}
            >
              Initial Code
            </h2>
            <div
              className={`w-full h-1 rounded-md ${
                toggle === 1 ? "bg-accent" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(2)}
            >
              Test Cases
            </h2>
            <div
              className={`w-full h-1 rounded-md ${
                toggle === 2 ? "bg-accent" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(3)}
            >
              Verification Code
            </h2>
            <div
              className={`w-full h-1 rounded-md ${
                toggle === 3 ? "bg-accent" : ""
              } `}
            ></div>
          </div>
        </span>

        {toggle === 1 ? (
          //   <Signature
          //     question={question}
          //     handleChanges={handleChanges}
          //     handleQuestionChange={handleQuestionChange}
          //     setQuestion={setQuestion}
          //   />
          // ) :
          <Initial
            // question={question} handleChanges={handleChanges}
            selectedLanguage={selectedLanguage}
            // editorValue={editorValue}
            // handleEditorChange={handleEditorChange}
            editorValue={editorValue.initialCode}
            handleEditorChange={(value) =>
              handleEditorChange(value, "defaultCode")
            }
            // codeLanguage={question.codeLanguage}
            question={question}
          />
        ) : toggle === 2 ? (
          // <Initial question={question} handleChanges={handleChanges} />
          <TestCases
            question={question}
            handleChanges={handleChanges}
            handleQuestionChange={handleQuestionChange}
            setQuestion={setQuestion}
          />
        ) : (
          // : toggle === 3 ? (
          //   <TestCases
          //     question={question}
          //     handleChanges={handleChanges}
          //     handleQuestionChange={handleQuestionChange}
          //     setQuestion={setQuestion}
          //   />
          // )
          <Verification
            selectedLanguage={selectedLanguage}
            editorValue={editorValue.solutionCode}
            question={question}
            handleEditorChange={(value) =>
              handleEditorChange(value, "solutionCode")
            }
            setQuestion={setQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default Code;
