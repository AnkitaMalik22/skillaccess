import React, { useState } from "react";
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
}) => {
  return (
    <>
      <h2 className="font-bold mb-4 text-xl text-[#3E3E3E]">
        Coding Language: {question.codeLanguage || "please select a language"}{" "}
      </h2>

      {/* toggler */}
      <div className="">
        <div className="grid grid-cols-4 text-lg mb-4">
          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(1)}
            >
              Function signature
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 1 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(2)}
            >
              Initial Code
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 2 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(3)}
            >
              Test Cases
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 3 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(4)}
            >
              Verification Code
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 4 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>
        </div>

        {toggle === 1 ? (
          <Signature
            question={question}
            handleChanges={handleChanges}
            handleQuestionChange={handleQuestionChange}
            setQuestion={setQuestion}
          />
        ) : toggle === 2 ? (
          <Initial question={question} handleChanges={handleChanges} />
        ) : toggle === 3 ? (
          <TestCases
            question={question}
            handleChanges={handleChanges}
            handleQuestionChange={handleQuestionChange}
            setQuestion={setQuestion}
          />
        ) : (
          <Verification question={question} handleChanges={handleChanges} />
        )}
      </div>
    </>
  );
};

export default Code;
