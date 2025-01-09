import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  setTestBasicDetails,
  setInTest,
} from "../redux/college/test/testSlice";
import { getCategories } from "../redux/category/categorySlice";
import { isUni } from "../util/isCompany";

export const useTestForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const level = search.get("level");

  const { categories } = useSelector((state) => state.category);
  const testState = useSelector((state) => state.test);

  const [testDetails, setTestDetails] = useState({
    level,
    name: testState.name || "",
    description: testState.description || "",
    totalAttempts: testState.totalAttempts || "",
    totalQuestions: testState.totalQuestions || null,
    totalDuration: testState.totalDuration || null,
    duration_from: testState.duration_from || "",
    duration_to: testState.duration_to || "",
    isNegativeMarking: testState.isNegativeMarking || false,
    category: testState.category || "",
    categoryName: testState.categoryName || "",
    hasAccessToAllDepartments: testState.hasAccessToAllDepartments || false,
    accessibleDepartments: testState.accessibleDepartments || [],
  });

  const [errors, setErrors] = useState({
    name: "",
    totalAttempts: "",
    totalQuestions: "",
    description: "",
    duration: "",
    category: "",
  });

  useEffect(() => {
    dispatch(setInTest(true));
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setTestDetails((prevDetails) => ({
      ...prevDetails,
      ...testState,
      level,
    }));
  }, [testState, level]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    if (type === "checkbox") {
      setTestDetails((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "category") {
      if (categories && categories.length > 0) {
        // Check if categories exist and is not empty
        const selectedCategory = categories.find((cat) => cat._id === value);
        setTestDetails((prev) => ({
          ...prev,
          category: selectedCategory?._id || "",
          categoryName: selectedCategory?.name || "",
        }));
      } else {
        // Handle case where categories are undefined or empty
        console.error("Categories are not available.");
      }
      return;
    }

    if (name === "accessibleDepartments") {
      const options = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setTestDetails((prev) => ({ ...prev, [name]: options }));
      return;
    }

    // Check if the selected time is before the current time and date
    if (name === "duration_from" || name === "duration_to") {
      const currentTime = new Date().toISOString().slice(0, 16);
      if (new Date(value).toISOString().slice(0, 16) < currentTime) {
        toast.error(
          "Please choose a date and time that is either the current moment or a future date and time."
        );
        return;
      }
    }

    // Check if the entered value is negative
    if (
      (name === "totalAttempts" || name === "totalQuestions") &&
      parseFloat(value) < 0
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Please enter a positive number.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (!testDetails.name) {
      newErrors.name = "Please Enter Name";
      hasError = true;
    }
    if (!testDetails.totalAttempts) {
      newErrors.totalAttempts = "Please Enter Total Attempts";
      hasError = true;
    } else if (
      parseInt(testDetails.totalAttempts) < 1 ||
      parseInt(testDetails.totalAttempts) > 10
    ) {
      newErrors.totalAttempts = "Total Attempts must be between 1 and 10";
      hasError = true;
    }
    if (!testDetails.totalQuestions) {
      newErrors.totalQuestions = "Please Enter Total Questions";
      hasError = true;
    } else if (parseInt(testDetails.totalQuestions) < 1) {
      newErrors.totalQuestions = "Total Questions must be greater than 0";
      hasError = true;
    }
    if (!testDetails.description) {
      newErrors.description = "Please Enter Description";
      hasError = true;
    }
    if (!testDetails.duration_from) {
      newErrors.duration = "Please Enter Duration From";
      hasError = true;
    }
    if (!testDetails.duration_to) {
      newErrors.duration = "Please Enter Duration To";
      hasError = true;
    }
    if (!testDetails.category) {
      newErrors.category = "Please Select Category";
      hasError = true;
    }

    if (testDetails.duration_from && testDetails.duration_to) {
      if (
        new Date(testDetails.duration_from) >= new Date(testDetails.duration_to)
      ) {
        toast.error("Duration To must be greater than Duration From", {
          icon: "⚠️",
        });
        hasError = true;
      }
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(setTestBasicDetails(testDetails));
      const basePath = isUni()
        ? "/university/pr/test/select"
        : "/college/test/select";
      navigate(
        `${basePath}${level === "adaptive" ? "Adaptive" : ""}?level=${level}`
      );
    }
  };

  return {
    testDetails,
    errors,
    handleChange,
    handleSubmit,
    categories,
  };
};
