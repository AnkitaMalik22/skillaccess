import React from "react";
import Editor from "@monaco-editor/react";

const Initial = ({ selectedLanguage, handleEditorChange, editorValue }) => {
  console.log(selectedLanguage);
  return (
    <div className="w-full   ">
      <Editor
        theme="vs-light"
        height="535px"
        defaultLanguage={selectedLanguage}
        value={editorValue}
        onChange={(value) => handleEditorChange(value, "defaultCode")}
        className="border-2  border-gray-300"
      />
    </div>
  );
};

export default Initial;
