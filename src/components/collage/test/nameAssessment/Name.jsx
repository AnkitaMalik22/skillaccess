import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Progress } from "./Progress";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTests,
  setInTest,
  setTest,
  setTestBasicDetails,
} from "../../../../redux/collage/test/testSlice";
import toast from "react-hot-toast";

const Name = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();

  const level = search.get("level");
  console.log(level);

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
  }, [dispatch]);

  // ------------------------------------------------------ TIMER ------------------------------------------------

  useEffect(() => {
    dispatch(setInTest(true));
  }, []);
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
        "Please select a time and date after the current time and date."
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
      setTestDetails({
        ...testDetails,
        [name]: name === "isNegativeMarking" ? checked : value,
      });
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
      setErrors((prevErrors) => ({ ...prevErrors, name: "Please enter Name" }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    if (testDetails.totalAttempts === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalAttempts: "Please enter Total Attempts",
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
        totalQuestions: "Please enter Total Questions",
      }));
      flag = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, totalQuestions: "" }));
    }

    if (testDetails.description === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Please enter Description",
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

    if (assessments.beginner.length > 0 && level === "beginner") {
      assessments.beginner.forEach((assessment) => {
        if (assessment.name === testDetails.name) {
          flag = "true";
          toast.error("Duplicate name");
        }
      });
    }
    if (assessments.intermediate.length > 0 && level === "intermediate") {
      assessments.intermediate.forEach((assessment) => {
        if (assessment.name === testDetails.name) {
          flag = "true";
          toast.error("Duplicate name");
        }
      });
    }
    if (assessments.advanced.length > 0 && level === "advanced") {
      assessments.advanced.forEach((assessment) => {
        if (assessment.name === testDetails.name) {
          flag = "true";
          toast.error("Duplicate name");
        }
      });
    }
    if (!flag) {
      dispatch(setTestBasicDetails(testDetails));
      navigate(`/collage/test/select?level=${level}`);
    }
  };

  return (
    <div>
      <Header handleNext={handleSubmit} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      {/* larger screens */}
      <div className="  bg-white min-h-[90vh] mx-auto  ">
        <h2 className="w-full text-lg font-medium text-[#7D7D7D] mt-10 mb-5">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video, code and find
          answer.
        </h2>

        <form>
          <input
            type="text"
            className={`mb-4 w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="Name of the Assessment"
            name="name"
            value={testDetails.name}
            onChange={handleChange}
            required
          />
          {errors.name && (
            <span className="text-red-500 pt-2">{errors.name}</span>
          )}
          <input
            type="tel"
            name="totalAttempts"
            className={`mb-4 w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="No. of Attempts"
            value={testDetails.totalAttempts}
            onChange={handleChange}
            required
          />
          {errors.totalAttempts && (
            <span className="text-red-500 py-2">{errors.totalAttempts}</span>
          )}
          <input
            name="totalQuestions"
            type="tel"
            className={`mb-4 w-full h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4 ${
              errors.name ? "border-red-500" : "border-none"
            }`}
            placeholder="No. of Questions"
            value={testDetails.totalQuestions}
            onChange={handleChange}
            required
          />
          {errors.totalQuestions && (
            <span className="text-red-500 pt-2">{errors.totalQuestions}</span>
          )}

          <div className="flex justify-between items-center w-full gap-4  ">
            {/* Duration From */}
            <div className=" mb-4 w-1/2 h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4">
              <label className="text-gray-400">Duration From *</label>
              <input
                type="datetime-local"
                name="duration_from"
                value={testDetails?.duration_from?.slice(0, 16)}
                onChange={handleChange}
                className={`border-none cursor-pointer bg-gray-100 p-0 ml-10 ${
                  errors.duration ? "border-red-500" : ""
                }`}
                required
                fullWidth
              />
            </div>

            {/* Duration To */}
            <div className=" mb-4 w-1/2 h-full rounded-xl bg-[#F8F8F9] border-none text-[#3E3E3E] text-lg placeholder:text-[#3E3E3E] p-4">
              <label className="text-gray-400">Duration To *</label>
              <input
                type="datetime-local"
                name="duration_to"
                value={testDetails?.duration_to?.slice(0, 16)}
                onChange={handleChange}
                className={`border-none cursor-pointer bg-gray-100 p-0 ml-10 ${
                  errors.duration ? "border-red-500" : ""
                }`}
                required
                fullWidth
              />
            </div>
          </div>
          {errors.duration && (
            <span className="text-red-500 pt-2">{errors.duration}</span>
          )}
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
            placeholder="Add Description"
            name="description"
            value={testDetails.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <span className="text-red-500 pt-2">{errors.description}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Name;
