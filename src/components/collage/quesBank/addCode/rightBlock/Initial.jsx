import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const Initial = ({
  question,
  handleChanges,
  selectedLanguage,
  handleEditorChange,
  setEditorValue,
  editorValue,
}) => {
  useEffect(() => {
    const ques = JSON.parse(localStorage.getItem("qbQues"));
    {
      setEditorValue(ques?.code[selectedLanguage]?.defaultCode);
    }
  }, []);
  return (
    <div className="w-full">
      <Editor
        theme="vs-light"
        height="535px"
        defaultLanguage={selectedLanguage || "Java"}
        value={editorValue}
        onChange={(value) => handleEditorChange(value, "defaultCode")}
        className="border-2  border-gray-300"
      />
    </div>
  );
};

export default Initial;
