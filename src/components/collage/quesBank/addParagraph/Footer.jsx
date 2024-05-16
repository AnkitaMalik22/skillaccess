import React from "react";

import { FaChevronLeft, FaPlus } from "react-icons/fa";

const Footer = ({ setQues, question, handleSave }) => {
  function Add() {
    setQues({
      ...question,
      questions: [...question.questions, { question: "" }],
    });
  }

  // React.useEffect(() => {
  //   console.log(question);
  // }, [question]);

  return (
    <div className="pt-20">
      <div className="absolute bottom-10  left-8">
        {" "}
        <div className=" flex">
          <button
            className="self-center justify-center flex bg-[#8F92A1] bg-opacity-10  py-3 px-4 rounded-xl text-sm font-bold gap-2 "
            onClick={() => Add()}
          >
            Add More
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 flex right-8 gap-2">
        {" "}
        <div className=" flex gap-2">
          <button className="self-center justify-center flex bg-gray-200 p-2 rounded-lg text-sm font-bold gap-2 w-32">
            <FaChevronLeft className="self-center" /> Prev
          </button>
        </div>
        <div className=" flex">
          <button className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 ">
            <FaPlus className="self-center" onClick={() => handleSave()} /> Add
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
