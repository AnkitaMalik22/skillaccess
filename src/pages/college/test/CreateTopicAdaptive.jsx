import React, { useState } from "react";
import Header from "../../../components/college/test/createTopic/Header";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createTopic } from "../../../redux/college/test/thunks/topic";
import useTranslate from "../../../hooks/useTranslate";
import { getEntity, isUni } from "../../../util/isCompany";

const CreateTopicAdaptive = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [topic, setTopic] = useState({
    Heading: "",
    Description: "",
    Time: null,
    TotalQuestions: null,
  });
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDescEmpty, setIsDescEmpty] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
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
        //navigate(`/college/test/typeOfQuestions/${res.payload._id}`);
        navigate(
          `/${getEntity()}/test/addMcqToTopic/${res.payload._id
          }?type=mcq&addType=topic&level=adaptive`
        );
      } else {
        // toast.error("Invalid or duplicate name.");
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
    <>
      <Header next={handleNext} />

      <div className="  w-full mx-auto h-[90vh] rounded-md  justify-between  ">
        <h2 className="w-full font-medium  text-[#3E3E3E] rounded-md mb-5 text-base">
          Add questions to your assessment (optional). You can use five question
          types: multiple-choice, essay, video ,code and find answer.
        </h2>

        <input
          onChange={changeHandler}
          name="Heading"
          value={topic.Heading}
          type="text"
          className={`w-full bg-gray-100 mb-5 text-base font-bold p-2 rounded-md focus:outline-0 focus:ring-blued focus:ring-1 border placeholder-gray-400 ${isNameEmpty ? "border-red-500" : "border-none"
            }`}
          placeholder="Name of the Topic"
        />
        {isNameEmpty && (
          <p className="text-red-500 ml-4 ">Please fill in the name.</p>
        )}

        <textarea
          onChange={changeHandler}
          name="Description"
          value={topic.Description}
          rows={5}
          className={`w-full bg-gray-100 text-base text-[#3E3E3E] font-bold p-2 rounded-md focus:outline-0 focus:ring-blued focus:ring-1 resize-none border placeholder-gray-400 ${isDescEmpty ? "border-red-500" : "border-none"
            }`}
          placeholder="Add Description"
        />
        {isDescEmpty && (
          <p className="text-red-500 ml-4">Please fill in the description.</p>
        )}
      </div>
    </>
  );
};

export default CreateTopicAdaptive;
