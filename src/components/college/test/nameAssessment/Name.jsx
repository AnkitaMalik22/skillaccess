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
} from "../../../../redux/college/test/testSlice";
import toast from "react-hot-toast";
import { isUni } from "../../../../util/isCompany";
import { getCategories } from "../../../../redux/category/categorySlice";

const Name = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const level = search.get("level");
  const { categories } = useSelector((state) => state.category);

  const {
    name,
    description,
    totalAttempts,
    assessments,
    totalQuestions,
    totalDuration,
    duration_from,
    duration_to,
    category,
    categoryName,
    hasAccessToAllBranches,
    hasAccessToAllDepartments,
    accessibleBranches,
    accessibleDepartments,
    isNegativeMarking,
  } = useSelector((state) => state.test);
  // const {} = useSelector((state) =>//console.log(state.test));
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
    category: category || "",
    categoryName: categoryName || "",
    hasAccessToAllBranches: hasAccessToAllBranches || false,
    hasAccessToAllDepartments: hasAccessToAllDepartments || false,
    accessibleBranches: accessibleBranches || [],
    accessibleDepartments: accessibleDepartments || [],
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
      category: category || "",
      categoryName: categoryName || "",
      hasAccessToAllBranches: hasAccessToAllBranches || false,
      hasAccessToAllDepartments: hasAccessToAllDepartments || false,
      accessibleBranches: accessibleBranches || [],
      accessibleDepartments: accessibleDepartments || [],
    });
  }, [dispatch]);

  // ------------------------------------------------------ TIMER ------------------------------------------------

  useEffect(() => {
    dispatch(setInTest(true));
    dispatch(getCategories());
  }, []);
  const [errors, setErrors] = useState({
    name: "",
    totalAttempts: "",
    totalQuestions: "",
    description: "",
    duration: "",
    category: "",

  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Handle checkboxes for all access
    if (
      name === "hasAccessToAllBranches" ||
      name === "hasAccessToAllDepartments"
    ) {
      setTestDetails((prev) => ({
        ...prev,
        [name]: checked,
        // Clear the specific access arrays when "all access" is checked
        ...(name === "hasAccessToAllBranches" && checked
          ? { accessibleBranches: [] }
          : {}),
        ...(name === "hasAccessToAllDepartments" && checked
          ? { accessibleDepartments: [] }
          : {}),
      }));
      return;
    }

    // Handle multi-select for branches and departments
    if (name === "accessibleBranches" || name === "accessibleDepartments") {
      const options = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setTestDetails((prev) => ({
        ...prev,
        [name]: options,
      }));
      return;
    }

    // Handle category selection
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat._id === value);
      setTestDetails({
        ...testDetails,
        category: selectedCategory?._id || "",
        categoryName: selectedCategory?.name || "",
      });
      return;
    }

    // Check if the selected time is before the current time and date
    const currentTime = new Date().toISOString().slice(0, 16); // Get current time and date
    if (
      (name === "duration_from" || name === "duration_to") &&
      new Date(value).toISOString().slice(0, 16) < currentTime
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
        [name]: "Please Enter a positive number.",
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
    let hasError = false;
  
    // Helper function to set error messages
    const setError = (field, message) => {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
      hasError = true;
    };
  
    // Validation for required fields
    if (!testDetails.name) setError("name", "Please Enter Name");
    if (!testDetails.totalAttempts) setError("totalAttempts", "Please Enter Total Attempts");
    if (!testDetails.totalQuestions) setError("totalQuestions", "Please Enter Total Questions");
    if (!testDetails.description) setError("description", "Please Enter Description");
    if (!testDetails.duration_from) setError("duration", "Please Enter Duration From");
    if (!testDetails.duration_to) setError("duration", "Please Enter Duration To");
    if (!testDetails.category) setError("category", "Please Select Category");
  
    // Validation for numeric ranges
    if (testDetails.totalAttempts < 1 || testDetails.totalAttempts > 10) {
      setError("totalAttempts", "Total Attempts must be between 1 and 10");
    }
    if (testDetails.totalQuestions < 1) {
      setError("totalQuestions", "Total Questions must be greater than 0");
    }
  
    // Duration validation
    if (testDetails.duration_from && testDetails.duration_to) {
      if (testDetails.duration_from >= testDetails.duration_to) {
        toast.error("Duration To must be greater than Duration From", {
          icon: "⚠️",
        });
        hasError = true;
      }
    }
  
    // Branches and departments validation
    // if (!testDetails.hasAccessToAllBranches && !testDetails.accessibleBranches.length) {
    //   toast.error("Please select branches", { icon: "⚠️" });
    //   hasError = true;
    // }
    // if (!testDetails.hasAccessToAllDepartments && !testDetails.accessibleDepartments.length) {
    //   toast.error("Please select departments", { icon: "⚠️" });
    //   hasError = true;
    // }
  
    // Duplicate name validation based on level
    const validateDuplicates = (assessmentsList) => {
      return assessmentsList.some((assessment) => assessment.name === testDetails.name);
    };
  
    if (level === "beginner" && validateDuplicates(assessments.beginner)) {
      toast.error("Duplicate name in beginner assessments");
      hasError = true;
    }
    if (level === "intermediate" && validateDuplicates(assessments.intermediate)) {
      toast.error("Duplicate name in intermediate assessments");
      hasError = true;
    }
    if (level === "advanced" && validateDuplicates(assessments.advanced)) {
      toast.error("Duplicate name in advanced assessments");
      hasError = true;
    }
  
    // If no errors, proceed with dispatch and navigation
    if (!hasError) {
      dispatch(setTestBasicDetails(testDetails));
      const basePath = isUni() ? "/university/pr/test/select" : "/college/test/select";
      navigate(`${basePath}${level === "adaptive" ? "Adaptive" : ""}?level=${level}`);
    }
  };
  

  // console.log(categories); //not printing

  // Add this state for collapse controls
  const [showBranchControls, setShowBranchControls] = useState(false);
  const [showDepartmentControls, setShowDepartmentControls] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <Header handleNext={handleSubmit} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-lg font-medium text-gray-600 mb-8">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video, code and find
          answer.
        </h2>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              className={`w-full rounded-lg bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200"
                } text-gray-800 text-lg p-4 focus:ring-2 focus:ring-blued focus:border-transparent transition duration-200`}
              placeholder="Name of the Assessment*"
              name="name"
              value={testDetails.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Attempts Input */}
          <div>
            <input
              type="tel"
              name="totalAttempts"
              className={`w-full rounded-lg bg-gray-50 border ${errors.totalAttempts ? "border-red-500" : "border-gray-200"
                } text-gray-800 text-lg p-4 focus:ring-2 focus:ring-blued focus:border-transparent transition duration-200`}
              placeholder="No. of Attempts*"
              value={testDetails.totalAttempts}
              onChange={handleChange}
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              required
            />
            {errors.totalAttempts && (
              <p className="mt-2 text-sm text-red-600">
                {errors.totalAttempts}
              </p>
            )}
          </div>

          {/* Questions Input */}
          <div>
            <input
              name="totalQuestions"
              type="tel"
              className={`w-full rounded-lg bg-gray-50 border ${errors.totalQuestions ? "border-red-500" : "border-gray-200"
                } text-gray-800 text-lg p-4 focus:ring-2 focus:ring-blued focus:border-transparent transition duration-200`}
              placeholder="No. of Questions*"
              value={testDetails.totalQuestions}
              onChange={handleChange}
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              required
            />
            {errors.totalQuestions && (
              <p className="mt-2 text-sm text-red-600">
                {errors.totalQuestions}
              </p>
            )}
          </div>

          {/* Duration Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <label className="block text-gray-500 text-sm mb-2">
                Duration From *
              </label>
              <input
                type="datetime-local"
                name="duration_from"
                min={new Date().toISOString().slice(0, 16)} // Disable past dates and times
                value={testDetails?.duration_from}
                onChange={handleChange}
                className="w-full bg-transparent border-none text-gray-800 focus:ring-2 focus:ring-blued"
                required
              />
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <label className="block text-gray-500 text-sm mb-2">
                Duration To *
              </label>
              <input
                type="datetime-local"
                name="duration_to"
                value={testDetails?.duration_to?.slice(0, 16)}
                onChange={handleChange}
                className="w-full bg-transparent border-none text-gray-800 focus:ring-2 focus:ring-blued"
                required
              />
            </div>
          </div>
          {errors.duration && (
            <p className="text-sm text-red-600">{errors.duration}</p>
          )}

          {/* Category Select */}
          <div>
            <select
              id="category"
              name="category"
              value={testDetails.category}
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-lg p-4 pr-10 appearance-none focus:ring-2 focus:ring-blued focus:border-transparent transition duration-200"
              required
            >
              <option value="">Select Category*</option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">{errors.category}</p>
          )}

          {/* Negative Marking Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="isNegativeMarking"
                checked={testDetails.isNegativeMarking}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-blued focus:ring-blued"
              />
              <span>Is there negative marking?</span>
            </label>
          </div>

          {testDetails.category && (
            <>
              {/* Department Access Controls */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setShowDepartmentControls(!showDepartmentControls)
                  }
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    Department Access
                  </h3>
                  <button type="button" className="text-gray-500">
                    {showDepartmentControls ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                </div>



                {showDepartmentControls && (
                  <div className="mt-4 space-y-4">
                    <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasAccessToAllDepartments"
                        checked={testDetails.hasAccessToAllDepartments}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-blued focus:ring-blued"
                      />
                      <span>Access to all departments</span>
                    </label>

                    {!testDetails.hasAccessToAllDepartments && (
                      <div className="space-y-2">
                        <select
                          multiple
                          name="accessibleDepartments"
                          value={testDetails.accessibleDepartments}
                          onChange={handleChange}
                          className="w-full rounded-lg bg-white border border-gray-200 text-gray-800 text-lg p-4 min-h-[120px]"
                        >
                          {categories
                            .find((cat) => cat._id === testDetails.category)
                            ?.departments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                        </select>

                        {/* Selected Departments Display */}
                        {testDetails?.accessibleDepartments?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-2">
                              Selected Departments:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {testDetails?.accessibleDepartments?.map(
                                (dept) => (
                                  <span
                                    key={dept}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                  >
                                    {dept}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTestDetails((prev) => ({
                                          ...prev,
                                          accessibleDepartments:
                                            prev.accessibleDepartments.filter(
                                              (d) => d !== dept
                                            ),
                                        }));
                                      }}
                                      className="ml-2 inline-flex items-center p-0.5 rounded-full hover:bg-green-200"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Year Access Controls */}
            </>
          )}

          {/* Description Textarea */}
          <div>
            <textarea
              className={`w-full h-40 rounded-lg bg-gray-50 border ${errors.description ? "border-red-500" : "border-gray-200"
                } text-gray-800 text-lg p-4 focus:ring-2 focus:ring-blued focus:border-transparent transition duration-200`}
              placeholder="Add Description*"
              name="description"
              value={testDetails.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Name;
