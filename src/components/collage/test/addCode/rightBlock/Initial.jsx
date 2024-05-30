import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const Initial = ({
  question,
  handleChanges,
  selectedLanguage,
  handleEditorChange,
  editorValue,
}) => {
  //   const codeTemplates = {
  //     Java: `import java.io.*;

  //     public class Main {
  //       public static void main(String[] args) {
  //         // Insert your code here
  //       }
  //     }`,
  //     Python: `def main():
  //     # Insert your code here

  // if __name__ == "__main__":
  //     main()`,
  //     Cpp: `#include <bits/stdc++.h>
  //            using namespace std;

  // int main() {
  //     // Insert your code here
  //     return 0;
  // }`,
  //     C: `#include <stdio.h>

  // int main() {
  //     // Insert your code here
  //     return 0;
  // }`,
  //   };

  //   const [codeMap, setCodeMap] = useState({
  //     Java: codeTemplates.Java,
  //     Python: codeTemplates.Python,
  //     Cpp: codeTemplates.Cpp,
  //     C: codeTemplates.C,
  //   });

  //   const [editorValue, setEditorValue] = useState(codeTemplates.Java);

  //   useEffect(() => {
  //     const defaultValue = codeMap[question.codeLanguage] || codeTemplates.Java;
  //     setEditorValue(defaultValue);
  //   }, [question.codeLanguage, codeMap]);

  //   const handleEditorChange = (value) => {
  //     setEditorValue(value);
  //     handleChanges({ target: { name: "code", value } });

  //     setCodeMap((prevCodeMap) => ({
  //       ...prevCodeMap,
  //       [question.codeLanguage]: value,
  //     }));
  //   };

  //   const selectedLanguage = question.codeLanguage.toLowerCase();

  return (
    <div className="h-auto w-full bg-red-300">
      <Editor
        theme="vs-dark"
        height="20rem"
        defaultLanguage={selectedLanguage}
        value={editorValue}
        onChange={handleEditorChange}
        className="h-[450px] mb-6 pt-4"
      />
    </div>
  );
};

export default Initial;
