import React from "react";
import Editor from "@monaco-editor/react";

const Verification = ({
  question,
  selectedLanguage,
  handleEditorChange,
  editorValue,
}) => {
  return (
    <div className="h-auto w-full bg-red-300">
      <Editor
        theme="vs-dark"
        height="20rem"
        defaultLanguage={selectedLanguage}
        value={question.code[selectedLanguage].solutionCode || editorValue}
        onChange={(value) => handleEditorChange(value, "solutionCode")}
        className="h-[450px] mb-6 "
      />
    </div>
  );
};

export default Verification;
