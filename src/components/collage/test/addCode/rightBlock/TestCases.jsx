// import { Disclosure, Transition } from "@headlessui/react";
// import React, { useState } from "react";
// import { FaCaretDown, FaPlus } from "react-icons/fa";
// import { FaXmark } from "react-icons/fa6";

// const TestCases = () => {
//   const [par, setPar] = useState([1, 2]);
//   const [par2, setPar2] = useState([5, 6]);

//   function deleteHandler(k) {
//     setPar((prev) => {
//       let copy = prev;
//       copy.splice(k, 1);
//       return [...copy];
//     });
//   }

//   function Add() {
//     setPar((prev) => {
//       console.log([...prev, 1]);
//       return [...prev, 1];
//     });
//   }

//   function Add2() {
//     setPar2((prev) => {
//       console.log([...prev, 1]);
//       return [...prev, 1];
//     });
//   }

//   function deleteHandler2(k) {
//     setPar2((prev) => {
//       let copy = prev;
//       copy.splice(k, 1);
//       return [...copy];
//     });
//   }

//   return (
//     <>
//       <div className="bg-[#F8F8F9] mt-4 px-6 p-6 rounded-lg">
//         {par.map((el, i) => (
//           <section className="">
//             <div>
//               {" "}
//               <Disclosure>
//                 {({ open }) => (
//                   <div className="mb-4 relative border border-gray-300 rounded-xl py-1 z-0">
//                     <div className="flex w-full justify-between rounded-t-lg  pl-4 py-2 text-left text-sm font-medium   focus:outline-none  ">
//                       <div>
//                         <p className="text-sm font-bold">Strings</p>
//                       </div>
//                       <div className="flex gap-2 self-center">
//                         <FaXmark
//                           className=" h-6 w-6 self-center"
//                           onClick={() => deleteHandler(i)}
//                         />

//                         <Disclosure.Button className="flex gap-2 w-10/12 self-center">
//                           <FaCaretDown
//                             className={`${open ? "rotate-180" : ""} h-6 w-6  `}
//                           />
//                           <h2></h2>{" "}
//                         </Disclosure.Button>
//                       </div>
//                     </div>

//                     <Transition
//                       enter="transition duration-300 "
//                       enterFrom="transform scale-95 ease-in "
//                       enterTo="transform scale-100   duration-700 "
//                       leave="transition duration-300 ease-out"
//                       leaveFrom="transform scale-100  "
//                       leaveTo="transform scale-95"
//                     >
//                       <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  w-full text-sm text-gray-500  ">
//                         <div className="w-full bg-green-400  bg-opacity-100">
//                           nt perferendis labore non itaque dolores quidem
//                           mollitia eveniet architecto quisquam, incidunt est.
//                         </div>
//                       </Disclosure.Panel>
//                     </Transition>
//                   </div>
//                 )}
//               </Disclosure>
//             </div>
//           </section>
//         ))}

//         <div className="w-full relative h-12">
//           <button className="absolute right-0 bg-blued text-white rounded-lg px-5 flex gap-2 py-2">
//             <FaPlus className="self-center " onClick={() => Add()} /> Add
//           </button>{" "}
//         </div>
//       </div>

//       <div className="bg-[#F8F8F9] mt-4 px-6 p-6 rounded-lg">
//         {par2.map((el, i) => (
//           <section className="">
//             <div>
//               {" "}
//               <Disclosure>
//                 {({ open }) => (
//                   <div className="mb-4 relative border border-gray-300 rounded-xl py-1">
//                     <div className="flex w-full justify-between rounded-t-lg  pl-4 py-2 text-left text-sm font-medium   focus:outline-none  ">
//                       <div>
//                         <p className="text-sm font-bold">Strings</p>
//                       </div>
//                       <div className="flex gap-2 self-center">
//                         <FaXmark
//                           className=" h-6 w-6 self-center"
//                           onClick={() => deleteHandler2(i)}
//                         />

//                         <Disclosure.Button className="flex gap-2 w-10/12 self-center">
//                           <FaCaretDown
//                             className={`${open ? "rotate-180" : ""} h-6 w-6  `}
//                           />
//                           <h2></h2>{" "}
//                         </Disclosure.Button>
//                       </div>
//                     </div>

//                     <Transition
//                       enter="transition duration-300 "
//                       enterFrom="transform scale-95 ease-in opacity-0"
//                       enterTo="transform scale-100   duration-700 opacity-100"
//                       leave="transition duration-300 ease-out"
//                       leaveFrom="transform scale-100  opacity-100"
//                       leaveTo="transform scale-95 opacity-0"
//                     >
//                       <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  w-full text-sm text-gray-500 ">
//                         <div className="w-full h-10 bg-blued z-20"></div>
//                       </Disclosure.Panel>
//                     </Transition>
//                   </div>
//                 )}
//               </Disclosure>
//             </div>
//           </section>
//         ))}

//         <div className="w-full relative h-12">
//           <button className="absolute right-0 bg-blued text-white rounded-lg px-5 flex gap-2 py-2">
//             <FaPlus className="self-center " onClick={() => Add2()} /> Add
//           </button>{" "}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestCases;

import React, { useState } from "react";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const TestCases = ({
  question,
  handleChanges,
  handleQuestionChange,
  setQuestion,
}) => {
  // testcase: [{ input: "", expectedexpectedOutput: ""}],
  const [testCases, setTestCases] = useState([
    { input: [1, 2, 3, 5, [1, 2, 3, 4, 5]], expectedOutput: [4] },
    { input: [6, "hello"], expectedOutput: [9] },
  ]);

  const [expandedTestCases, setExpandedTestCases] = useState([]);

  function deleteHandler(index) {
    setTestCases((prev) => {
      let copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });

    setExpandedTestCases((prev) => {
      let copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }

  function addTestCase() {
    setTestCases((prev) => [...prev, { input: [1], expectedOutput: [1] }]);

    setExpandedTestCases((prev) => [...prev, false]);

    setQuestion({
      ...question,
      testcase: [...question.testcase, { input: [], expectedOutput: [] }],
    });
  }

  function handleInputChange(index, value) {
    setTestCases((prev) => {
      let copy = [...prev];

      // Parse the input value to check if it's an array
      try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
          copy[index].input = parsedValue;
        } else {
          copy[index].input = [parsedValue];
        }
      } catch (error) {
        // Handle parsing error, set as a single element array
        copy[index].input = [value];
      }

      return copy;
    });
  }

  function handleOutputChange(index, value) {
    setTestCases((prev) => {
      let copy = [...prev];

      // Parse the output value to check if it's an array
      try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
          copy[index].expectedOutput = parsedValue;
        } else {
          copy[index].expectedOutput = [parsedValue];
        }
      } catch (error) {
        // Handle parsing error, set as a single element array
        copy[index].expectedOutput = [value];
      }

      return copy;
    });
  }

  function toggleTestCase(index) {
    setExpandedTestCases((prev) => {
      let copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  }

  return (
    <div>
      {/* {testCases.map((testCase, index) => (
        <section key={index} className="mb-4 relative border border-gray-300 rounded-xl py-1">
          <div className="flex w-full justify-between rounded-t-lg pl-4 py-2 text-left text-sm font-medium focus:outline-none">
            <div>
              <p className="text-sm font-bold">Test Case {index + 1}</p>
            </div>
            <div className="flex gap-2 self-center">
              <FaXmark className="h-6 w-6 self-center" onClick={() => deleteHandler(index)} />

              <button className="flex gap-2 w-10/12 self-center" onClick={() => toggleTestCase(index)}>
                <FaCaretDown className={`h-6 w-6 transform ${expandedTestCases[index] ? "rotate-180" : ""}`} />
                <h2></h2>{" "}
              </button>
            </div>
          </div> */}
      {question?.testcase?.map((testCase, index) => (
        <section
          key={index}
          className="mb-4 relative border border-gray-300 rounded-xl py-1"
        >
          <div className="flex w-full justify-between rounded-t-lg pl-4 py-2 text-left text-sm font-medium focus:outline-none">
            <div>
              <p className="text-sm font-bold">Test Case {index + 1}</p>
            </div>
            <div className="flex gap-2 self-center">
              <FaXmark
                className="h-6 w-6 self-center"
                onClick={() => deleteHandler(index)}
              />

              <button
                className="flex gap-2 w-10/12 self-center"
                onClick={() => toggleTestCase(index)}
              >
                <FaCaretDown
                  className={`h-6 w-6 transform ${
                    expandedTestCases[index] ? "rotate-180" : ""
                  }`}
                />
                <h2></h2>{" "}
              </button>
            </div>
          </div>

          {expandedTestCases[index] && (
            <div className="p-4">
              <label htmlFor={`input-${index}`}>Input:</label>
              <input
                type="text"
                id={`input-${index}`}
                className="border p-1 w-full"
                // value={testCase.input.map((item) => (Array.isArray(item) ? `[${item.join(",")}]` : item)).join(", ")}
                // onChange={(e) => handleInputChange(index, e.target.value)}
                name="input"
                value={question.testcase[index].input}
                onChange={(e) => handleQuestionChange(e, index)}
              />

              <label htmlFor={`output-${index}`}>expectedOutput:</label>
              <input
                type="text"
                id={`output-${index}`}
                className="border p-1 w-full"
                name="expectedOutput"
                value={question.testcase[index].expectedOutput}
                onChange={(e) => handleQuestionChange(e, index)}
                // value={testCase.expectedOutput.map((item) => (Array.isArray(item) ? `[${item.join(",")}]` : item)).join(", ")}
                // onChange={(e) => handleOutputChange(index, e.target.value)}
              />
            </div>
          )}
        </section>
      ))}

      <div className="w-full relative h-12">
        <button
          className="absolute right-0 bg-blued hover:bg-[#0052CC] text-white rounded-lg px-5 flex gap-2 py-2"
          onClick={addTestCase}
        >
          <FaPlus className="self-center" /> Add Test Case
        </button>{" "}
      </div>
    </div>
  );
};

export default TestCases;
