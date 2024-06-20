import React, { useState } from "react";
import Header from "../../../components/collage/test/createTopic/Header";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createTopic } from "../../../redux/collage/test/thunks/topic";
import useTranslate from "../../../hooks/useTranslate";

const CreateTopic = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  const [topic, setTopic] = useState({
    Heading: "",
    Description: "",
    Time: null,
    TotalQuestions: null,
  });
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDescEmpty, setIsDescEmpty] = useState(false);
  const [headingLimitExceeded, setHeadingLimitExceeded] = useState(false);
  const [descLimitExceeded, setDescLimitExceeded] = useState(false);
  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "Heading" && value.length > 30) {
      setHeadingLimitExceeded(true);
      return; // Stop updating state if character limit is exceeded
    } else {
      setHeadingLimitExceeded(false);
    }
    if (name === "Description" && value.length > 70) {
      setDescLimitExceeded(true);
      return;
    } else {
      setDescLimitExceeded(false);
    }
    // const name = e.target.name;
    setTopic((prev) => {
      const copy = { ...prev };
      copy[name] = e.target.value;
      return copy;
    });
  };

  const handleNext = () => {
    if (!topic.Heading.trim()) {
      setIsNameEmpty(true);
      // toast.error("Please enter a name for the topic.");
      return;
    } else {
      setIsNameEmpty(false);
    }

    if (!topic.Description.trim()) {
      setIsDescEmpty(true);
      // toast.error("Please enter a description for the topic.");
      return;
    } else {
      setIsDescEmpty(false);
    }

    dispatch(createTopic(topic)).then((res) => {
      if (res.payload._id) {
        navigate(
          `/collage/test/typeOfQuestions/${res.payload._id}?level=${level}`
        );
      } else {
        toast.error("Invalid or duplicate values");
        return;
      }
      setTopic({
        Heading: "",
        Description: "",
        Time: null,
        TotalQuestions: null,
      });
    });
  };

  return (
    <div>
      <Header next={handleNext} />

      <div className="  w-full mx-auto h-[90vh] my-2 rounded-lg  justify-between  ">
        <h2 className="w-full font-medium  text-gray-400 sm:h-10 py-2 sm:mt-12  mt-4 rounded-lg mb-10 sm:mb-1 text-lg">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video ,code and find
          answer.
        </h2>

        <input
          onChange={changeHandler}
          name="Heading"
          value={topic.Heading}
          type="text"
          className={`w-full bg-gray-100 h-16 px-6 text-lg font-bold py-2 mt-12 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border placeholder-gray-400 ${
            isNameEmpty ? "border-red-500" : "border-none"
          }`}
          placeholder="Name of the Topic"
        />
        {isNameEmpty && (
          <p className="text-red-500 ml-4 ">Please fill in the name.</p>
        )}
        {headingLimitExceeded && (
          <p className="text-red-500 ml-4">
            Character limit exceeded (30 characters max).
          </p>
        )}

        <textarea
          onChange={changeHandler}
          name="Description"
          value={topic.Description}
          className={`w-full bg-gray-100 h-48 px-6 text-lg font-bold py-8 mt-4 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 resize-none border placeholder-gray-400 ${
            isDescEmpty ? "border-red-500" : "border-none"
          }`}
          placeholder="Add Description"
        />
        {isDescEmpty && (
          <p className="text-red-500 ml-4">Please fill in the description.</p>
        )}
        {descLimitExceeded && (
          <p className="text-red-500 ml-4">
            Character limit exceeded (70 characters max).
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateTopic;
