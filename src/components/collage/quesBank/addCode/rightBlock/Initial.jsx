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
  if (selectedLanguage) {
    selectedLanguage = selectedLanguage.toLowerCase();
    selectedLanguage =
      selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
  }
  useEffect(() => {
    const ques = JSON.parse(localStorage.getItem("qbQues"));

    if (ques?.code?.[selectedLanguage]?.defaultCode) {
      setEditorValue(ques?.code[selectedLanguage]);
    }
  }, []);
  return (
    <div className="w-full">
      <Editor
        theme="vs-light"
        height="535px"
        defaultLanguage={selectedLanguage?.toLowerCase() || "java"}
        value={editorValue}
        onChange={(value) => handleEditorChange(value, "defaultCode")}
        className="border-2  border-gray-300"
      />
    </div>
  );
};

export default Initial;
