import React from "react";
import Editor from "@monaco-editor/react";

const Verification = ({
  question,
  selectedLanguage,
  handleEditorChange,
  editorValue,
}) => {
  return (
    <div className="w-full">
      <Editor
        theme="vs-light"
        height="535px"
        defaultLanguage={selectedLanguage}
        value={question?.code[selectedLanguage]?.solutionCode || editorValue}
        onChange={(value) => handleEditorChange(value, "solutionCode")}
        className="border-2  border-gray-300"
      />
    </div>
  );
};

export default Verification;
