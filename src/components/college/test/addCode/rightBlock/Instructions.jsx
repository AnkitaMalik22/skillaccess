import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const TipComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div
        className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
        role="alert"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">Hint</p>
          <button onClick={toggleExpand} className="text-lg focus:outline-none">
            <FaCaretDown
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isExpanded && (
          <div>
            <p>
              To add inputs to test cases, use the format:
              <code>
                {" "}
                {
                  "{ input: yourInputValue, expectedOutput: yourExpectedOutputValue }"
                }
              </code>
              . Only integers and strings are allowed.
            </p>
            <p className="my-1">For example:</p>
            <div className="p-4 bg-white border rounded-md shadow-md">
              {/* Input example: if arr = [1, 2, 3, 4], write only [1, 2, 3, 4]. If str = "ssss", write only ssss */}
              <label
                htmlFor="example-input"
                className="block text-gray-700 font-bold mb-2"
              >
                Input:
              </label>
              <textarea
                id="example-input"
                className="border p-2 w-full"
                readOnly
                value="
                5
                1 2 3 4"
              />
              <p className="text-gray-600 text-sm mt-2">
                If the input is an array, enter it in this format: n= 5 arr =[1,
                2, 3, 4]
              </p>

              <textarea
                id="example-input-string"
                className="border p-2 w-full mt-4"
                readOnly
                value="Hello World!"
              />
              <p className="text-gray-600 text-sm mt-2">
                If the input is a string, enter it in this format: "Hello World"
              </p>

              {/* Expected output example: Only integer and string values */}
              <label
                htmlFor="example-output"
                className="block text-gray-700 font-bold mb-2 mt-4"
              >
                Expected Output:
              </label>
              <textarea
                id="example-output"
                className="border p-2 w-full"
                readOnly
                value="8"
              />
              <p className="text-gray-600 text-sm mt-2">
                Enter the expected output value. Only integers and strings are
                allowed.
              </p>

              {/* Checkbox example: Use this button to hide or show */}
              <label className="inline-flex items-center justify-end cursor-pointer pt-4">
                <span className="text-sm font-bold text-gray-900 mr-4">
                  Hide this testcase
                </span>
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  readOnly
                  checked={true}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <p className="text-gray-600 text-sm mt-2">
                Use this switch to hide or show the testcase.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipComponent;
