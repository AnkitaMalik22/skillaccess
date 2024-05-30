import React, { useEffect, useState } from "react";
import Signature from "./Signature";
import Initial from "./Initial";
import TestCases from "./TestCases";
import Verification from "./Verification";

const Code = ({
  toggle,
  setToggle,
  question,
  handleChanges,
  handleQuestionChange,
  setQuestion,
}) => {
  const codeTemplates = {
    Java: `import java.io.*;

    public class Main {
      public static void main(String[] args) {
        // Insert your code here
      }
    }`,
    Python: `def main():
    # Insert your code here

if __name__ == "__main__":
    main()`,
    Cpp: `#include <bits/stdc++.h>
           using namespace std;

int main() {
    // Insert your code here
    return 0;
}`,
    C: `#include <stdio.h>

int main() {
    // Insert your code here
    return 0;
}`,
  };

  const [editorValue, setEditorValue] = useState(
    codeTemplates || codeTemplates.Java
  );
  console.log(editorValue);
  const [codeMap, setCodeMap] = useState({
    Java: codeTemplates.Java,
    Python: codeTemplates.Python,
    Cpp: codeTemplates.Cpp,
    C: codeTemplates.C,
  });
  console.log(codeMap);
  useEffect(() => {
    const defaultValue = codeMap[question.codeLanguage] || codeTemplates.Java;
    setEditorValue(defaultValue);
  }, [question.codeLanguage, codeMap]);

  const handleEditorChange = (value) => {
    setEditorValue(value);
    handleChanges({ target: { name: "code", value } });

    setCodeMap((prevCodeMap) => ({
      ...prevCodeMap,
      [question.codeLanguage]: value,
    }));
  };
  question.code = codeMap;
  const selectedLanguage = question.codeLanguage.toLowerCase();
  return (
    <div className="font-dmSans">
      <h2 className="font-bold mb-3 text-xl">
        Coding Language: {question.codeLanguage || "Java"}
      </h2>

      {/* toggler */}
      <div className="p-2 mt-4 rounded-lg">
        <span className="grid grid-cols-2 text-lg mb-4">
          {/* <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(1)}
            >
              Function signature
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 1 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div> */}

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(1)}
            >
              Initial Code
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 1 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(2)}
            >
              Test Cases
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 2 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>
          {/* 
          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(4)}
            >
              Verification Code
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 4 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div> */}
        </span>

        {
          toggle === 1 ? (
            //   <Signature
            //     question={question}
            //     handleChanges={handleChanges}
            //     handleQuestionChange={handleQuestionChange}
            //     setQuestion={setQuestion}
            //   />
            // ) :
            <Initial
              // question={question} handleChanges={handleChanges}
              selectedLanguage={selectedLanguage}
              editorValue={editorValue}
              handleEditorChange={handleEditorChange}
            />
          ) : (
            //  toggle === 2 ?
            // <Initial question={question} handleChanges={handleChanges} />
            <TestCases
              question={question}
              handleChanges={handleChanges}
              handleQuestionChange={handleQuestionChange}
              setQuestion={setQuestion}
            />
          )
          // : toggle === 3 ? (
          //   <TestCases
          //     question={question}
          //     handleChanges={handleChanges}
          //     handleQuestionChange={handleQuestionChange}
          //     setQuestion={setQuestion}
          //   />
          // ) : (
          //   <Verification question={question} handleChanges={handleChanges} />
          // )
        }
      </div>
    </div>
  );
};

export default Code;
