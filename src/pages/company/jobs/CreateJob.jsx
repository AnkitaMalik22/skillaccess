import React, { useState } from "react";
import * as z from "zod";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../../redux/company/jobs/jobSlice";
import toast from "react-hot-toast";

// Define the Zod schema for validation
const schema = z.object({
  JobTitle: z.string().nonempty("Job Title is required"),
  CompanyName: z.string().nonempty("Company Name is required"),
  JobLocation: z.string().nonempty("Job Location is required"),
  WorkplaceType: z.string().nonempty("Workplace Type is required"),
  CloseByDate: z.string().nonempty("Close By Date is required"),
  EmploymentType: z.string().nonempty("Employment Type is required"),
  SeniorityLevel: z.string().nonempty("Seniority Level is required"),
  ExperienceFrom: z
    .number({ invalid_type_error: "Must be a number" })
    .nonnegative("Experience From must be non-negative"),
  ExperienceTo: z
    .number({ invalid_type_error: "Must be a number" })
    .nonnegative("Experience To must be non-negative"),
  SalaryFrom: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Salary From must be positive"),
  SalaryTo: z
    .number({ invalid_type_error: "Must be a number" })
    .positive("Salary To must be positive"),
  RoleOverview: z.string().nonempty("Role Overview is required"),
  DutiesResponsibility: z
    .string()
    .nonempty("Duties and Responsibility is required"),
  tier: z.string().nonempty("Tier is required"),
  GraduationBatch: z.string().nonempty("Graduation Batch is required"),
});

// Define the form fields
const FORM_FIELDS = [
  { label: "Job Title", name: "JobTitle", type: "text" },
  { label: "Job Location", name: "JobLocation", type: "text" },
  {
    label: "Workplace Type",
    name: "WorkplaceType",
    type: "select",
    options: ["Remote", "On-site", "Hybrid"],
  },
  {
    label: "Employment Type",
    name: "EmploymentType",
    type: "select",
    options: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
  },
  {
    label: "Seniority Level",
    name: "SeniorityLevel",
    type: "select",
    options: ["Entry Level", "Mid Level", "Senior Level", "Manager", "Director"],
  },
];

const CreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: company } = useSelector((state) => state.companyAuth);

  const [formData, setFormData] = useState({
    JobTitle: "",
    CompanyName: "",
    JobLocation: "",
    WorkplaceType: "",
    CloseByDate: "",
    EmploymentType: "",
    SeniorityLevel: "",
    ExperienceFrom: "",
    ExperienceTo: "",
    SalaryFrom: "",
    SalaryTo: "",
    RoleOverview: "",
    DutiesResponsibility: "",
    tier: "",
    GraduationBatch: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Pre-validate numbers
      const validatedData = {
        ...formData,
        CompanyName: company?.basic?.companyName,
        ExperienceFrom: formData.ExperienceFrom ? Number(formData.ExperienceFrom) : undefined,
        ExperienceTo: formData.ExperienceTo ? Number(formData.ExperienceTo) : undefined,
        SalaryFrom: formData.SalaryFrom ? Number(formData.SalaryFrom) : undefined,
        SalaryTo: formData.SalaryTo ? Number(formData.SalaryTo) : undefined
      };
  
      // Validate using schema
      schema.parse(validatedData);
      
      // Clear errors if validation passes
      setErrors({});
  
      // Dispatch action
      await dispatch(
        createJob({
          companyId: company?._id,
          data: { ...validatedData, company: company?._id },
        })
      );
      toast.success("Job created successfully!");
      navigate("/company/pr/jobs");
    } catch (err) {
      console.log(err)
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(({ path, message }) => {
          fieldErrors[path[0]] = message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => navigate("/company/pr/jobs")}
        >
          <FiArrowLeft className="mr-2" size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Create Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {FORM_FIELDS.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}*
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
              />
            )}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="flex flex-col">
          <label className="font-medium mb-1">Role Overview</label>
          <textarea
            name="RoleOverview"
            value={formData.RoleOverview}
            onChange={handleChange}
            className={`border ${
              errors.RoleOverview ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.RoleOverview && (
            <p className="text-red-500 text-sm mt-1">{errors.RoleOverview}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Duties Responsibility</label>
          <textarea
            name="DutiesResponsibility"
            value={formData.DutiesResponsibility}
            onChange={handleChange}
            className={`border ${
              errors.DutiesResponsibility ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.DutiesResponsibility && (
            <p className="text-red-500 text-sm mt-1">
              {errors.DutiesResponsibility}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Tier</label>
          <select
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className={`border ${
              errors.tier ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          >
            <option value="">Select Tier</option>
            <option value="tier1">Tier 1</option>
            <option value="tier2">Tier 2</option>
            <option value="tier3">Tier 3</option>
          </select>
          {errors.tier && (
            <p className="text-red-500 text-sm mt-1">{errors.tier}</p>
          )}
        </div>

        {/* Add after Tier selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Close By Date */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Close By Date*</label>
            <input
              type="date"
              name="CloseByDate"
              value={formData.CloseByDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`border ${errors.CloseByDate ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.CloseByDate && (
              <p className="text-red-500 text-sm mt-1">{errors.CloseByDate}</p>
            )}
          </div>

          {/* Graduation Batch */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Graduation Batch*</label>
            <select
              name="GraduationBatch"
              value={formData.GraduationBatch}
              onChange={handleChange}
              className={`border ${errors.GraduationBatch ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            >
              <option value="">Select Batch</option>
              {[2020, 2021, 2022, 2023, 2024].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.GraduationBatch && (
              <p className="text-red-500 text-sm mt-1">{errors.GraduationBatch}</p>
            )}
          </div>
        </div>

        {/* Experience Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Experience From (Years)*</label>
            <input
              type="number"
              name="ExperienceFrom"
              value={formData.ExperienceFrom}
              onChange={handleChange}
              min="0"
              step="0.5"
              className={`border ${errors.ExperienceFrom ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.ExperienceFrom && (
              <p className="text-red-500 text-sm mt-1">{errors.ExperienceFrom}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Experience To (Years)*</label>
            <input
              type="number"
              name="ExperienceTo"
              value={formData.ExperienceTo}
              onChange={handleChange}
              min={formData.ExperienceFrom || 0}
              step="0.5"
              className={`border ${errors.ExperienceTo ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.ExperienceTo && (
              <p className="text-red-500 text-sm mt-1">{errors.ExperienceTo}</p>
            )}
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Salary From (LPA)*</label>
            <input
              type="number"
              name="SalaryFrom"
              value={formData.SalaryFrom}
              onChange={handleChange}
              min="1"
              step="0.5"
              className={`border ${errors.SalaryFrom ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.SalaryFrom && (
              <p className="text-red-500 text-sm mt-1">{errors.SalaryFrom}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Salary To (LPA)*</label>
            <input
              type="number"
              name="SalaryTo"
              value={formData.SalaryTo}
              onChange={handleChange}
              min={formData.SalaryFrom || 1}
              step="0.5"
              className={`border ${errors.SalaryTo ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.SalaryTo && (
              <p className="text-red-500 text-sm mt-1">{errors.SalaryTo}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-blued w-[50%] hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
