import React from "react";
import Editor from "@monaco-editor/react";

const Initial = ({
  selectedLanguage,
  handleEditorChange,
  editorValue,
  question,
}) => {
  return (
    <div className="w-full   ">
      <Editor
        height="60vh"
        value={editorValue}
        onChange={(value) => handleEditorChange(value, "defaultCode")}
        defaultLanguage={selectedLanguage}
        defaultValue={"//Enter code here"}
        // onChange={handleEditorChange}
        className="border-2  border-gray-300"
      />
    </div>
  );
};

export default Initial;
