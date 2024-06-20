import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createTopic } from "../../../redux/collage/test/thunks/topic";
import useTranslate from "../../../hooks/useTranslate";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

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
        navigate(`/collage/quesBank/typeOfQuestions/${res.payload._id}`);
        toast.success("Topic Created Successfully");
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
      <div className="flex w-full mx-auto justify-between mb-2 mt-5">
        <div>
          <button className="flex self-center ml-2 rounded-lg  gap-2">
            <button onClick={() => navigate(-1)} className="mt-2 mr-3">
              <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
            </button>

            <div className="flex h-full self-center">
              <h2 className="sm:text-xl  text-left font-bold self-center text-3xl mt-2 font-dmSans ">
                Create Topic
              </h2>
            </div>
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl mx-2   h-12 flex my-2 ">
          <div className=" flex">
            <button
              className="self-center justify-center flex bg-[#0052CC] py-3 px-4 rounded-2xl text-xs gap-2 text-white"
              onClick={handleNext}
            >
              Next Step{" "}
              <FaArrowRightLong className="self-center text-lg text-white ml-4" />
            </button>
          </div>
        </div>
      </div>

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
            Character limit exceeded (50 characters max).
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
            Character limit exceeded (50 characters max).
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateTopic;
