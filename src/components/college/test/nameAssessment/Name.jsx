import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../CommonHeader";
import { Progress } from "./Progress";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../../../../components/InputField";
import {
  getAllTests,
  setInTest,
  setTest,
  setTestBasicDetails,
} from "../../../../redux/college/test/testSlice";
import toast from "react-hot-toast";
import isCompany, { getEntity, isUni } from "../../../../util/isCompany";
import { getCategories } from "../../../../redux/category/categorySlice";

const Name = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const level = search.get("level");
  const { categories } = useSelector((state) => state.category);
  const entity = isUni() ? "university/pr" : isCompany() ? "company/pr" : "college";

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
    config
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
    config: {
      instructions: [],
      isCameraRequired: true,
      maxTabSwitches: 1,
    },
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const [collapsedInstructions, setCollapsedInstructions] = useState({});

  const toggleInstruction = (index) => {
    setCollapsedInstructions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      config: config || {
        instructions: [],
        totalTime: "",
        isCameraRequired: true,
        maxTabSwitches: 1,
        // maxAudioLimitExceedCount: 0,
      },
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
    totalTime: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Handle nested config fields
    if (name.startsWith("config.")) {
      const configField = name.split(".")[1];
      setTestDetails((prev) => ({
        ...prev,
        config: {
          ...prev.config,
          [configField]: type === "checkbox" ? checked : value,
        },
      }));
      return;
    }

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
    if (!testDetails.totalAttempts)
      setError("totalAttempts", "Please Enter Total Attempts");
    if (!testDetails.totalQuestions)
      setError("totalQuestions", "Please Enter Total Questions");
    if (!testDetails.description)
      setError("description", "Please Enter Description");
    if (!testDetails.duration_from)
      setError("duration", "Please Enter Duration From");
    if (!testDetails.duration_to)
      setError("duration", "Please Enter Duration To");
    if (!testDetails.category) setError("category", "Please Select Category");
    if (!testDetails.config?.instructions?.length) {
      setError("instructions", "Please add at least one instruction");
      return;
    }

    const hasEmptyInstructions = testDetails.config.instructions.some(
      instruction => !instruction.title || !instruction.description
    );

    if (hasEmptyInstructions) {
      setError("instructions", "All instruction fields are required");
      return;
    }

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
      return assessmentsList.some(
        (assessment) => assessment.name === testDetails.name
      );
    };

    if (level === "beginner" && validateDuplicates(assessments.beginner)) {
      toast.error("Duplicate name in beginner assessments");
      hasError = true;
    }
    if (
      level === "intermediate" &&
      validateDuplicates(assessments.intermediate)
    ) {
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
      const basePath = `/${entity}/test/select`
      navigate(
        `${basePath}${level === "adaptive" ? "Adaptive" : ""}?level=${level}`
      );
    }
  };

  // console.log(categories); //not printing

  // Add this state for collapse controls
  const [showBranchControls, setShowBranchControls] = useState(false);
  const [showDepartmentControls, setShowDepartmentControls] = useState(false);

  const addInstruction = () => {
    setTestDetails(prev => ({
      ...prev,
      config: {
        ...prev.config,
        instructions: [
          ...(prev.config?.instructions || []),
          { title: '', description: '' }
        ]
      }
    }));
  };

  const removeInstruction = (indexToRemove) => {
    setTestDetails(prev => ({
      ...prev,
      config: {
        ...prev.config,
        instructions: prev.config.instructions.filter((_, index) => index !== indexToRemove)
      }
    }));
  };

  const updateInstruction = (index, field, value) => {
    setTestDetails(prev => ({
      ...prev,
      config: {
        ...prev.config,
        instructions: prev.config.instructions.map((instruction, i) => 
          i === index ? { ...instruction, [field]: value } : instruction
        )
      }
    }));
  };

  // Add state for configuration collapse
  const [showConfig, setShowConfig] = useState(true);

  return (
    <div className="bg-white min-h-screen">
      <Header handleNext={handleSubmit} backPath={`/${getEntity()}/test`} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className=" mx-auto py-8">
        <h2 className="text-base font-medium text-gray-600 mb-8">
          Add up to 10 custom questions to your assessment (optional). You can
          use five question types: multiple-choice, essay, video, code and find
          answer.
        </h2>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <InputField
              type="text"
              className={`${errors.totalAttempts ? "border-red-500" : ""} `}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputField
                type="tel"
                name="totalAttempts"
                value={testDetails.totalAttempts}
                onChange={handleChange}
                placeholder="No. of Attempts*"
                className={` ${errors.totalAttempts ? "border-red-500" : ""} `}
                pattern="[0-9]*"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Ensures only numbers
                }}
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
              <InputField
                name="totalQuestions"
                type="tel"
                className={`${errors.totalQuestions ? "border-red-500" : ""} `}
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
          </div>

          {/* Duration Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" rounded-md border border-gray-200 p-4">
              <label className="block text-gray-500 text-base mb-1">
                Duration From *
              </label>
              <input
                type="datetime-local"
                name="duration_from"
                min={new Date().toISOString().slice(0, 16)} // Disable past dates and times
                value={testDetails?.duration_from}
                onChange={handleChange}
                className="p-0 w-full bg-transparent border-none text-gray-800 focus:ring-2 focus:ring-blued"
                required
              />
            </div>

            <div className="rounded-md border border-gray-200 p-4">
              <label className="block text-gray-500 text-base mb-1">
                Duration To *
              </label>
              <input
                type="datetime-local"
                name="duration_to"
                value={testDetails?.duration_to?.slice(0, 16)}
                onChange={handleChange}
                className="p-0 w-full bg-transparent border-none text-gray-800 focus:ring-2 focus:ring-blued"
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
              className=" border-gray-300 focus:outline-none focus:ring-1 focus:ring-blued w-full text-base text-[#4B5563] py-3 px-5 rounded-md shadow-sm focus:shadow-md hover:shadow-md"
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
    {testDetails.category && (
            <>
              {/* Department Access Controls */}
              <div className="border rounded-md p-4 ">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setShowDepartmentControls(!showDepartmentControls)
                  }
                >
                  <h3 className="text-base font-medium text-gray-700">
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
                          className="w-full rounded-md bg-white border border-gray-200 text-gray-800 text-base p-4 min-h-[120px]"
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

          {/* Configuration Section */}
          <div className="space-y-6 border rounded-md p-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowConfig(!showConfig)}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">Test Configuration</h3>
              </div>
              <svg
                className={`w-6 h-6 transform transition-transform ${showConfig ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className={`space-y-6 transition-all duration-300 ${
              showConfig ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Camera Required */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">Camera Access</label>
                        <p className="text-xs text-gray-500">Require camera during test</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="config.isCameraRequired"
                        checked={testDetails.config?.isCameraRequired}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blued"></div>
                    </label>
                  </div>
                </div>

                {/* Tab Switches */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Tab Switches</label>
                      <p className="text-xs text-gray-500">Maximum allowed tab switches</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="config.maxTabSwitches"
                    value={testDetails.config?.maxTabSwitches}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blued focus:ring-blued sm:text-sm"
                    placeholder="Enter number of switches"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 border rounded-md p-6 mt-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <h3 className="text-lg font-medium text-gray-900">Instructions*</h3>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addInstruction();
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blued hover:bg-blue-50 rounded-md"
                >
                  + Add New Instruction
                </button>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    showInstructions ? 'rotate-180' : ''
                  }`}
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
              </div>
            </div>

            {errors.instructions && (
              <p className="text-sm text-red-600">{errors.instructions}</p>
            )}

            <div className={`space-y-4 transition-all duration-300 ${
              showInstructions ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              {(!testDetails.config?.instructions || testDetails.config.instructions.length === 0) && (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No instructions added yet. Click the button above to add one.</p>
                </div>
              )}

              {testDetails.config?.instructions?.map((instruction, index) => (
                <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleInstruction(index)}
                  >
                    <h4 className="font-medium text-gray-700">
                      Instruction #{index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeInstruction(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <svg
                        className={`w-5 h-5 transform transition-transform ${
                          collapsedInstructions[index] ? '' : 'rotate-180'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    collapsedInstructions[index] ? 'h-0' : 'p-4 border-t'
                  }`}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title*
                        </label>
                        <input
                          type="text"
                          value={instruction.title || ''}
                          onChange={(e) => updateInstruction(index, 'title', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blued"
                          placeholder="Enter instruction title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description*
                        </label>
                        <textarea
                          value={instruction.description || ''}
                          onChange={(e) => updateInstruction(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blued"
                          rows={3}
                          placeholder="Enter instruction description"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          {/* Description Textarea */}
          <div>
            <textarea
              className={` ${errors.description ? "border-red-500" : "border-gray-200"
                } border-gray-300 focus:outline-none focus:ring-1 focus:ring-blued w-full text-base text-[#4B5563] py-3 px-5 rounded-md shadow-sm focus:shadow-md hover:shadow-md transition-all duration-300`}
              placeholder="Add Description*"
              name="description"
              value={testDetails.description}
              onChange={handleChange}
              required
              rows={5}
              style={{ resize: "none" }}
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


// config: {
//   instructions:
//     [
//       {
//         title: String,
//         description: String
//       }
//     ]
//   ,
//   totalTime: Number,
//   isCameraRequired: {
//     type: Boolean,
//     default: true,
//   },
//   maxTabSwitches: {
//     type: Number,
//     default: 3
//   },
//   maxAudioLimitExceedCount: {
//     type: Number,
//     default: 3
//   }
// }
