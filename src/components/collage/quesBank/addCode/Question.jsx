import React from "react";

const Question = ({ question, handleChanges, handleQuestionChange }) => {
  return (
    <>
      <h2 className="font-bold mb-4 text-xl text-[#3E3E3E]">Question</h2>

      <select
        name="codeLanguage"
        value={question.codeLanguage}
        onChange={handleChanges}
        id=""
        className="rounded-xl mb-4 bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E] w-full"
      >
        <option value="">Select Language</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="C++">C++</option>
        <option value="C">C</option>
      </select>
      <div className="flex w-full justify-between gap-4 mb-4">
        <select
          name="Duration"
          onChange={handleChanges}
          value={question.Duration}
          id=""
          className="w-3/5 rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E]"
        >
          <option value={0}>Time to answer the question</option>
          <option value={15}>15 minutes</option>
          <option value={30}>30 minute</option>
          <option value={60}>60 minutes</option>
          <option value={90}>90 minutes</option>
        </select>
        <select
          name="QuestionLevel"
          onChange={handleChanges}
          value={question.QuestionLevel}
          className="rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E] w-2/5"
        >
          <option value="">Level</option>

          <option value={"beginner"}>Beginner</option>
          <option value={"intermediate"}>Intermediate</option>
          <option value={"advanced"}>Advanced</option>
        </select>
      </div>
      <textarea
        className="rounded-xl bg-[#F8F8F9] focus:outline-none border-none select text-[#3E3E3E] resize-none w-full h-full placeholder:text-[#3E3E3E]"
        placeholder="Enter Question Here"
        name="codeQuestion"
        value={question.codeQuestion}
        onChange={handleChanges}
      ></textarea>
    </>
  );
};

export default Question;
