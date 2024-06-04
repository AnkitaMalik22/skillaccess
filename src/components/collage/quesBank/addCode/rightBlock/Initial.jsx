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
    <div className="h-auto w-full bg-red-300">
      <Editor
        theme="vs-dark"
        height="20rem"
        defaultLanguage={selectedLanguage || "Java"}
        value={editorValue}
        onChange={(value) => handleEditorChange(value, "defaultCode")}
        className="h-[450px] mb-6 "
      />
    </div>
  );
};

export default Initial;
