import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Progress } from "./Progress";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTests,
  setTest,
  setTestBasicDetails,
} from "../../../../redux/collage/test/testSlice";
import toast from "react-hot-toast";

const Name = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();

  const level = search.get("level");

  const {
    name,
    description,
    totalAttempts,
    assessments,
    totalQuestions,
    totalDuration,
    duration_from,
    duration_to,
    isNegativeMarking,
  } = useSelector((state) => state.test);
  // const {} = useSelector((state) =>console.log(state.test));
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState({
    level: level,
    name: name || "",
    description: description || "",
    totalAttempts: totalAttempts || "",
    totalQuestions: totalQuestions || null,
    totalDuration: totalDuration || null,
    duration_from: duration_from || "", // New fields for duration
    duration_to: duration_to || "",
    isNegativeMarking: isNegativeMarking || false,
  });

  useEffect(() => {
    setTestDetails({
      level: level,
      name: name || "",
      description: description || "",
      totalAttempts: totalAttempts || "",
      totalQuestions: totalQuestions || null,
      totalDuration: totalDuration || null,
      duration_from: duration_from || "", // New fields for duration
      duration_to: duration_to || "",
      isNegativeMarking: isNegativeMarking || false,
    });
    // why getting 0 here
    // console.log(name, description, totalAttempts);
  }, [dispatch]);

  const [errors, setErrors] = useState({
    name: "",
    totalAttempts: "",
    totalQuestions: "",
    description: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // Check if the selected time is before the current time and date
    const currentTime = new Date().toISOString().slice(0, 16); // Get current time and date
    if (
      (name === "duration_from" || name === "duration_to") &&
      value < currentTime
    ) {
      toast.error(
        "Please choose a date and time that is either the current moment or a future date and time."
      );
      return; // Prevent updating state if the selected time is before the current time and date
    }

    // Check if the entered value is negative
    if (
      (name === "totalAttempts" || name === "totalQuestions") &&
      parseFloat(value) < 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a positive number.",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error message if the value is valid
      }));

      if (name === "duration_from" || name === "duration_to") {
        // const date = new Date(value);
        // const utcDate = new Date(
        //   date.getTime() + date.getTimezoneOffset() * 60000
        // );
        // const formattedDate = utcDate.toISOString().slice(0, 16);
        // console.log(date, utcDate, value);

        setTestDetails({
          ...testDetails,
          [name]: value,
        });
      } else {
        setTestDetails({
          ...testDetails,
          [name]: name === "isNegativeMarking" ? checked : value,
        });
      }
    }
  };

  const handleSubmit = () => {
    let flag = false;
    if (
      testDetails.name === "" ||
      testDetails.totalAttempts === "" ||
      testDetails.totalQuestions === null ||
      testDetails.description === "" ||
      testDetails.duration_from === "" ||
      testDetails.duration_to === ""
    ) {
      toast.error("Please Add All Fields", {
        icon: "⚠️",
      });
      flag = true;
    }

    if (testDetails.name === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Please Enter Name" }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    if (testDetails.totalAttempts === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalAttempts: "Please Enter Total Attempts",
      }));
      flag = true;
    } else if (
      testDetails.totalAttempts < 1 ||
      testDetails.totalAttempts > 10
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalAttempts: "Total Attempts must be between 1 and 10",
      }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, totalAttempts: "" }));
    }

    if (testDetails.totalQuestions === null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalQuestions: "Please Enter Total Questions",
      }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, totalQuestions: "" }));
    }

    if (testDetails.description === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Please Enter Description",
      }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }

    if (testDetails.duration_from === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "Please Enter Duration From",
      }));
    } else if (testDetails.duration_to === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "Please Enter Duration To",
      }));
    } else if (testDetails.duration_from >= testDetails.duration_to) {
      toast.error("Duration To must be greater than Duration From", {
        icon: "⚠️", // You can use any Unicode character or an image URL here
      });
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, duration: "" }));
    }
    if (testDetails.totalQuestions < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalQuestions: "Total Questions must be greater than 0",
      }));
      flag = true;
    }

    if (assessments.adaptive.length > 0) {
      assessments.adaptive.forEach((assessment) => {
        if (assessment.name === testDetails.name) {
          flag = "true";
          toast.error("Duplicate name");
        }
      });
    }
    if (!flag) {
      dispatch(setTestBasicDetails(testDetails));
      navigate("/collage/test/selectAdaptive?level=adaptive");
    }
  };

  return (
    <div>
      <Header handleNext={handleSubmit} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      {/* larger screens */}
      <div className="bg-white min-h-[90vh] mx-auto">
        <h2 className="w-full text-lg font-medium text-[#7D7D7D] mt-10 mb-5">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video, code and find
          answer.
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className={` w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="Name of the Assessment*"
            name="name"
            value={testDetails.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-red-500 py-2 ml-4">{errors.name}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="tel"
            name="totalAttempts"
            className={` w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="No. of Attempts*"
            value={testDetails.totalAttempts}
            onChange={handleChange}
            pattern="[0-9]*"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          {errors.totalAttempts && (
            <span className="text-red-500 py-2 ml-4">
              {errors.totalAttempts}
            </span>
          )}
        </div>
        <div className="mb-4">
          <input
            name="totalQuestions"
            type="tel"
            className={`mb-4 w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="No. of Questions*"
            value={testDetails.totalQuestions}
            onChange={handleChange}
            pattern="[0-9]*"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          {errors.totalQuestions && (
            <span className="text-red-500 py-2 ml-4">
              {errors.totalQuestions}
            </span>
          )}
        </div>
        {/* <input
          name="totalDuration"
          type="number"
          className="w-full bg-gray-100 h-16 px-6 text-lg font-bold py-8 mt-4 rounded-lg focus:outline-0 focus:ring-blued focus:ring-1 border-none placeholder-gray-400"
          placeholder="Total Duration in minutes"
          value={testDetails.totalDuration}
          onChange={handleChange}
        /> */}
        <div className="mb-4">
          <div className="flex justify-between items-center w-full gap-4 ">
            {/* Duration From */}
            <div className="  w-1/2 h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4">
              <label className="text-gray-400">Duration From *</label>
              <input
                type="datetime-local"
                name="duration_from"
                value={testDetails?.duration_from?.slice(0, 16)}
                onChange={handleChange}
                className={`border-none bg-gray-100 p-0 ml-10 ${
                  errors.duration ? "border-red-500" : ""
                }`}
                required
                fullWidth
              />
            </div>

            {/* Duration To */}
            <div className="  w-1/2 h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4">
              <label className="text-gray-400">Duration To *</label>
              <input
                type="datetime-local"
                name="duration_to"
                value={testDetails?.duration_to?.slice(0, 16)}
                onChange={handleChange}
                className={`border-none bg-gray-100 p-0 ml-10 ${
                  errors.duration ? "border-red-500" : ""
                }`}
                required
                fullWidth
              />
            </div>
          </div>
          {errors.duration && (
            <span className="text-red-500 ml-4 pt-2">{errors.duration}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-lg mb-4">
          <label
            htmlFor="isNegativeMarking"
            className="flex items-center gap-3 text-gray-400"
          >
            <input
              id="isNegativeMarking"
              type="checkbox"
              name="isNegativeMarking"
              checked={testDetails.isNegativeMarking}
              onChange={handleChange}
              className=""
            />{" "}
            Is there negative marking?
          </label>
        </div>
        <textarea
          className={`w-full h-40 rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
            errors.name ? "border-red-500" : "border-none"
          }`}
          placeholder="Add Description*"
          name="description"
          value={testDetails.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="text-red-500 py-2 ml-4">{errors.description}</span>
        )}
      </div>
    </div>
  );
};

export default Name;
