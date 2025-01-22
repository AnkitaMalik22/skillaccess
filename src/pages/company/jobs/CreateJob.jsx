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
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert string values to numbers where applicable for validation
    const validatedData = {
      ...formData,
      CompanyName: company?.basic?.companyName,
      ExperienceFrom: Number(formData.ExperienceFrom),
      ExperienceTo: Number(formData.ExperienceTo),
      SalaryFrom: Number(formData.SalaryFrom),
      SalaryTo: Number(formData.SalaryTo),
    };
    try {
      schema.parse(validatedData);
      setErrors({});
      console.log(company);
      await dispatch(
        createJob({
          companyId: company?._id,
          data: { ...validatedData, company: company?._id },
        })
      );

      console.log("Form submitted:", validatedData);
    } catch (err) {
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
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="mr-2" size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Create Job</h1>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Job Title", name: "JobTitle" },
          // { label: 'Company Name', name: 'CompanyName' },
          { label: "Job Location", name: "JobLocation" },
          {
            label: "Workplace Type",
            name: "WorkplaceType",
            type: "select",
            options: ["Remote", "On-site", "Hybrid"],
          },
          { label: "Close By Date", name: "CloseByDate", type: "date" },
          { label: "Employment Type", name: "EmploymentType" },
          { label: "Seniority Level", name: "SeniorityLevel" },
          { label: "Experience From", name: "ExperienceFrom", type: "number" },
          { label: "Experience To", name: "ExperienceTo", type: "number" },
          { label: "Salary From", name: "SalaryFrom", type: "number" },
          { label: "Salary To", name: "SalaryTo", type: "number" },
          { label: "Graduation Batch", name: "GraduationBatch" },
        ].map(({ label, name, type = "text", options = [] }) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium mb-1">{label}</label>
            {type === "select" ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`border ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`border ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
              />
            )}
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
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
            } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
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
            } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
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
            } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
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
        <div className="flex flex-col items-center">
          <button
            onClick={handleSubmit}
            className="bg-blued w-[50%] hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md transition duration-200 "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
