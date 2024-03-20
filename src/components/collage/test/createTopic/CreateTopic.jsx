import React, { useState } from "react";
import Header from "./Header";
import { createTopic } from "../../../../redux/collage/test/testSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateTopic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [topic, setTopic] = useState({
    Heading: "",
    Description: "",
    Time: null,
    TotalQuestions: null,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    setTopic((prev) => {
      const copy = { ...prev };
      copy[name] = e.target.value;
      return copy;
    });
  };

  const handleNext = () => {
    dispatch(createTopic(topic)).then((res) => {
      setTopic({
        Heading: "",
        Description: "",
        Time: null,
        TotalQuestions: null,
      });
      // console.log(res);
      if (res.payload._id) {
        navigate(`/collage/test/typeOfQuestions/${res.payload._id}`);
      } else {
        window.alert("invalid or duplicate values");
      }
    });
  };
  return (
    <div className="pt-8 w-11/12 mx-auto font-dmSans">
      <Header next={handleNext} />

      <div className="  w-full mx-auto h-[90vh] my-2 rounded-lg  justify-between  ">
        <h2 className="w-full font-medium  text-gray-400 sm:h-10 py-2 sm:mt-12  mt-4 rounded-lg mb-10 sm:mb-1 text-lg">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video ,code and find answer.
        </h2>

        <input
          onChange={changeHandler}
          name="Heading"
          value={topic.Heading}
          type="text"
          className="w-full bg-gray-100 h-16 px-6 text-lg font-bold py-2 mt-12 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border-none placeholder-gray-400"
          placeholder="Name of the Topic"
        />

        {/* <input
          onChange={changeHandler}
          name="TotalQuestions"
          value={topic.TotalQuestions}
          type="text"
          className="w-full bg-gray-100 h-16 px-6 text-lg font-bold py-8 mt-4 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border-none placeholder-gray-400"
          placeholder="No. of Questions"
        />
        <input
          onChange={changeHandler}
          name="Time"
          value={topic.Time}
          type="text"
          className="w-full bg-gray-100 h-16 px-6 text-lg font-bold py-8 mt-4 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border-none placeholder-gray-400"
          placeholder="Set Duration"
        /> */}
        <textarea
          onChange={changeHandler}
          name="Description"
          value={topic.Description}
          className="w-full bg-gray-100 h-48 px-6 text-lg font-bold py-8 mt-4 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 resize-none border-none placeholder-gray-400"
          placeholder="Add Description"
        />
      </div>
    </div>
  );
};

export default CreateTopic;
