import React, { useEffect, useState } from "react";
import Signature from "./Signature";
import Initial from "./Initial";
import TestCases from "./TestCases";
import Verification from "./Verification";
import { toast } from "react-hot-toast";

const Code = ({
  toggle,
  setToggle,
  question,
  handleChanges,
  handleQuestionChange,
  setQuestion,
  handleEditorChange,
  setEditorValue,
  editorValue,
}) => {
  // useEffect(() => {
  //   const ques = JSON.parse(localStorage.getItem("qbQues"));

  //   console.log("runagain local", ques);

  //   setEditorValue(ques?.code[selectedLanguage]);
  // }, []);
  // const codeTemplates = {
  //   Java: {
  //     defaultCode: `import java.io.*;

  // public class Main {
  //   public static void main(String[] args) {
  //     // Insert your Java initial code here
  //   }
  // }`,
  //     solutionCode: `import java.io.*;

  // public class Main {
  //   public static void main(String[] args) {
  //     // Insert your Java solution code here
  //   }
  // }`,
  //   },
  //   Python: {
  //     defaultCode: `def main():
  //     # Insert your Python initial code here

  // if __name__ == "__main__":
  //     main()`,
  //     solutionCode: `def main():
  //     # Insert your Python solution code here

  // if __name__ == "__main__":
  //     main()`,
  //   },
  //   Cpp: {
  //     defaultCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Insert your C++ initial code here\n    return 0;\n}`,
  //     solutionCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Insert your C++ solution code here\n    return 0;\n}`,
  //   },
  //   C: {
  //     defaultCode: `#include <stdio.h>\n\nint main() {\n    // Insert your C initial code here\n    return 0;\n}`,
  //     solutionCode: `#include <stdio.h>\n\nint main() {\n    // Insert your C solution code here\n    return 0;\n}`,
  //   },
  // };

  // const [codeMap, setCodeMap] = useState({
  //   Java: codeTemplates.Java,
  //   Python: codeTemplates.Python,
  //   Cpp: codeTemplates.Cpp,
  //   C: codeTemplates.C,
  // });

  // const [editorValue, setEditorValue] = useState({
  //   initialCode: (codeMap[question.codeLanguage] || codeTemplates.Java)
  //     ?.defaultCode,
  //   solutionCode: (codeMap[question.codeLanguage] || codeTemplates.Java)
  //     ?.solutionCode,
  // });

  // useEffect(() => {
  //   const defaultValue = codeMap[question.codeLanguage] || codeTemplates.Java;
  //   setEditorValue({
  //     initialCode: defaultValue.defaultCode,
  //     solutionCode: defaultValue.solutionCode,
  //   });
  // }, [question.codeLanguage, codeMap]);

  // const handleEditorChange = (value, type) => {
  //   setEditorValue((prev) => ({ ...prev, [type]: value }));
  //   handleChanges({ target: { name: type, value } });

  //   setCodeMap((prevCodeMap) => ({
  //     ...prevCodeMap,
  //     [question.codeLanguage]: {
  //       ...prevCodeMap[question.codeLanguage],
  //       [type]: value,
  //     },
  //   }));
  // };

  // question.code = codeMap;
  const selectedLanguage = question.codeLanguage.toLowerCase();

  return (
    <div className="font-dmSans">
      <h2 className="font-bold mb-3 text-xl">
        Coding Language: {question.codeLanguage || "Java"}
      </h2>

      {/* toggler */}
      <div className="p-2 mt-4 rounded-lg">
        <span className="grid grid-cols-3 text-lg mb-4">
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

          <div>
            <h2
              className={` w-fit text-center pb-2 hover:cursor-pointer mx-auto `}
              onClick={() => setToggle(3)}
            >
              Verification Code
            </h2>
            <div
              className={`w-full h-1 rounded-lg ${
                toggle === 3 ? "bg-[#0052CC]" : ""
              } `}
            ></div>
          </div>
        </span>

        {toggle === 1 ? (
          //   <Signature
          //     question={question}
          //     handleChanges={handleChanges}
          //     handleQuestionChange={handleQuestionChange}
          //     setQuestion={setQuestion}
          //   />
          // ) :

          editorValue.defaultCode && (
            <>
              {" "}
              <Initial
                // question={question} handleChanges={handleChanges}
                selectedLanguage={selectedLanguage}
                // editorValue={editorValue}
                // handleEditorChange={handleEditorChange}
                editorValue={editorValue.defaultCode}
                setEditorValue={setEditorValue}
                handleEditorChange={(value) =>
                  handleEditorChange(value, "defaultCode")
                }
              />
            </>
          )
        ) : toggle === 2 ? (
          // <Initial question={question} handleChanges={handleChanges} />
          <TestCases
            question={question}
            handleChanges={handleChanges}
            handleQuestionChange={handleQuestionChange}
            setQuestion={setQuestion}
          />
        ) : (
          // : toggle === 3 ? (
          //   <TestCases
          //     question={question}
          //     handleChanges={handleChanges}
          //     handleQuestionChange={handleQuestionChange}
          //     setQuestion={setQuestion}
          //   />
          // )
          <Verification
            question={question}
            setQuestion={setQuestion}
            selectedLanguage={selectedLanguage}
            editorValue={editorValue?.solutionCode}
            setEditorValue={setEditorValue}
            handleEditorChange={(value) =>
              handleEditorChange(value, "solutionCode")
            }
          />
        )}
      </div>
      {/* <h2> Code : {editorValue?.initialCode}</h2> */}
    </div>
  );
};

export default Code;
