import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createTopic } from "../../../redux/college/test/thunks/topic";
import { getCategories } from "../../../redux/category/categorySlice";
import { FaArrowRightLong } from "react-icons/fa6";
import {  FaChevronLeft, FaTimes } from "react-icons/fa";
import { isUni } from "../../../util/isCompany";

const CreateTopic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");

  const [topic, setTopic] = useState({
    Heading: "",
    Description: "",
    Time: null,
    TotalQuestions: null,
    category: "",
    categoryName: "",
    accessibleDepartments: [],
    hasAccessToAllDepartments: false,
    hasAccessToAllCategories: false,
  });

  const { categories } = useSelector((state) => state.category);
  const [errors, setErrors] = useState({
    heading: false,
    description: false,
    headingLimit: false,
    descLimit: false,
  });

  const validateField = (name, value) => {
    if (name === "Heading") {
      if (value.length > 30) {
        setErrors(prev => ({ ...prev, headingLimit: true }));
        return false;
      }
      setErrors(prev => ({ ...prev, headingLimit: false, heading: !value.trim() }));
    }
    if (name === "Description") {
      if (value.length > 70) {
        setErrors(prev => ({ ...prev, descLimit: true }));
        return false;
      }
      setErrors(prev => ({ ...prev, descLimit: false, description: !value.trim() }));
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "hasAccessToAllDepartments") {
        setTopic(prev => ({
          ...prev,
          hasAccessToAllDepartments: checked,
          accessibleDepartments: checked ? [] : prev.accessibleDepartments
        }));
        return;
      }
    }

    if (name === "category") {
      const selectedCategory = categories.find(cat => cat._id === value);
      setTopic(prev => ({
        ...prev,
        category: selectedCategory?._id || "",
        categoryName: selectedCategory?.name || "",
        accessibleDepartments: [], // Reset departments when category changes
        hasAccessToAllDepartments: false
      }));
      return;
    }

    if (validateField(name, value)) {
      setTopic(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDepartmentSelect = (deptId) => {
    setTopic(prev => ({
      ...prev,
      accessibleDepartments: prev.accessibleDepartments.includes(deptId)
        ? prev.accessibleDepartments.filter(id => id !== deptId)
        : [...prev.accessibleDepartments, deptId]
    }));
  };

  const handleNext = () => {
    if (!topic.Heading.trim() || !topic.Description.trim()) {
      setErrors({
        heading: !topic.Heading.trim(),
        description: !topic.Description.trim(),
        headingLimit: false,
        descLimit: false
      });
      return;
    }

    dispatch(createTopic(topic)).then((res) => {
      if (res.payload._id) {
        navigate(
          isUni()
            ? `/university/pr/quesBank/typeOfQuestions/${res.payload._id}`
            : `/college/quesBank/typeOfQuestions/${res.payload._id}`
        );
        toast.success("Topic Created Successfully");
      } else {
        toast.error("Invalid or duplicate values");
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const selectedCategory = categories.find(cat => cat._id === topic.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FaChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        
        <h2 className="text-2xl font-bold">Create Topic</h2>
        
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-blued text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next Step
          <FaArrowRightLong className="h-4 w-4" />
        </button>
      </div>

      {/* Main Form */}
      <div className="space-y-6">
        <p className="text-gray-600">
          Add up to 10 custom questions to your assessment (optional).
        </p>

        {/* Topic Name Input */}
        <div>
          <input
            name="Heading"
            value={topic.Heading}
            onChange={handleChange}
            placeholder="Enter the name of the Topic"
            className={`w-full p-3 rounded-lg bg-gray-50 border ${
              errors.heading ? 'border-red-500' : 'border-gray-200'
            } focus:ring-2 focus:ring-blued focus:border-transparent`}
          />
          {errors.heading && (
            <p className="mt-1 text-sm text-red-500">Please fill in the name.</p>
          )}
          {errors.headingLimit && (
            <p className="mt-1 text-sm text-red-500">Maximum 30 characters allowed.</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <textarea
            name="Description"
            value={topic.Description}
            onChange={handleChange}
            placeholder="Add Description"
            rows={4}
            className={`w-full p-3 rounded-lg bg-gray-50 border ${
              errors.description ? 'border-red-500' : 'border-gray-200'
            } focus:ring-2 focus:ring-blued focus:border-transparent`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">Please fill in the description.</p>
          )}
          {errors.descLimit && (
            <p className="mt-1 text-sm text-red-500">Maximum 70 characters allowed.</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <select
            name="category"
            value={topic.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blued focus:border-transparent"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Department Controls */}
        {topic.category && (
          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="hasAccessToAllDepartments"
                checked={topic.hasAccessToAllDepartments}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-blued focus:ring-blued"
              />
              <span className="text-gray-700">Access to all departments</span>
            </label>

            {!topic.hasAccessToAllDepartments && selectedCategory?.departments && (
              <div className="space-y-3">
                <p className="font-medium text-gray-700">Select Departments:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCategory.departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => handleDepartmentSelect(dept)}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        topic.accessibleDepartments.includes(dept)
                          ? 'bg-blue-100 text-blued'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                  {
                    selectedCategory.departments.length === 0 && (
                      <p className="text-gray-600">No departments found</p>
                    )
                  }
                </div>

                {topic.accessibleDepartments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Selected Departments:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.accessibleDepartments.map((deptName) => {
                        const dept = selectedCategory.departments.find(d => d === deptName);
                        return (
                          <span
                            key={dept}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blued"
                          >
                            {dept}
                            <button
                              onClick={() => handleDepartmentSelect(dept)}
                              className="p-1 hover:bg-blue-200 rounded-full"
                            >
                              <FaTimes className="h-3 w-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTopic;