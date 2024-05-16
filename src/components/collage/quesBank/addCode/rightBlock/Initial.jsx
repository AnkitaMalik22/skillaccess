import React from "react";
import Editor from "@monaco-editor/react";

const Initial = ({ question, handleChanges }) => {
  function handleEditorChange(value, event) {
    // here is the current value
    handleChanges({ target: { name: "code", value } });
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <code className="h-56 w-full bg-red-300">
      <Editor
        theme="vs-dark"
        height="20rem"
        defaultLanguage="javascript"
        defaultValue="export function undefined( undefined ) {
            // Insert your code here 
        }"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        name="code"
        value={question.code}
      />
    </code>
  );
};

export default Initial;
