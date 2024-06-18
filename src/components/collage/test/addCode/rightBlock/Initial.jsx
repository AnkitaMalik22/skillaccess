import React from "react";
import Editor from "@monaco-editor/react";


const Initial = ({ selectedLanguage, handleEditorChange, editorValue,question }) => {
 
  return (
    <div className="w-full   ">
 
          <Editor
            height="50vh"
            value={editorValue}
            onChange={(value) => handleEditorChange(value, "defaultCode")}
            defaultLanguage={selectedLanguage}
            defaultValue={editorValue}
            // onChange={handleEditorChange}
          />
        </div>
     

  );
};

export default Initial;
