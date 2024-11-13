import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateJob, getJobDetails } from '../../../redux/company/jobs/jobSlice';
import toast from 'react-hot-toast';

// Define the Zod schema for validation
const schema = z.object({
  JobTitle: z.string().nonempty('Job Title is required'),
  CompanyName: z.string().nonempty('Company Name is required'),
  JobLocation: z.string().nonempty('Job Location is required'),
  WorkplaceType: z.string().nonempty('Workplace Type is required'),
  CloseByDate: z.string().nonempty('Close By Date is required'),
  EmploymentType: z.string().nonempty('Employment Type is required'),
  SeniorityLevel: z.string().nonempty('Seniority Level is required'),
  ExperienceFrom: z
    .number({ invalid_type_error: 'Must be a number' })
    .positive('Experience From must be positive'),
  ExperienceTo: z
    .number({ invalid_type_error: 'Must be a number' })
    .positive('Experience To must be positive'),
  SalaryFrom: z
    .number({ invalid_type_error: 'Must be a number' })
    .positive('Salary From must be positive'),
  SalaryTo: z
    .number({ invalid_type_error: 'Must be a number' })
    .positive('Salary To must be positive'),
  RoleOverview: z.string().nonempty('Role Overview is required'),
  DutiesResponsibility: z.string().nonempty('Duties and Responsibility is required'),
  tier: z.string().nonempty('Tier is required'),
});

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: company } = useSelector((state) => state.companyAuth);
  const {jobDetails } = useSelector((state) => state.job);

  const [formData, setFormData] = useState({
    JobTitle: '',
    CompanyName: '',
    JobLocation: '',
    WorkplaceType: '',
    CloseByDate: '',
    EmploymentType: '',
    SeniorityLevel: '',
    ExperienceFrom: '',
    ExperienceTo: '',
    SalaryFrom: '',
    SalaryTo: '',
    RoleOverview: '',
    DutiesResponsibility: '',
    tier: '',
  });

  const [errors, setErrors] = useState({});

  // Load job details when the component mounts
  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobDetails) {
      setFormData({
        JobTitle: jobDetails.JobTitle,
        CompanyName: jobDetails.CompanyName || company?.basic?.companyName,
        JobLocation: jobDetails.JobLocation,
        WorkplaceType: jobDetails.WorkplaceType,
        CloseByDate: jobDetails.CloseByDate,
        EmploymentType: jobDetails.EmploymentType,
        SeniorityLevel: jobDetails.SeniorityLevel,
        ExperienceFrom: jobDetails.ExperienceFrom,
        ExperienceTo: jobDetails.ExperienceTo,
        SalaryFrom: jobDetails.SalaryFrom,
        SalaryTo: jobDetails.SalaryTo,
        RoleOverview: jobDetails.RoleOverview,
        DutiesResponsibility: jobDetails.DutiesResponsibility,
        tier: jobDetails.tier,
      });
    }
  }, [jobDetails, company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await dispatch(updateJob({ jobId, data: validatedData }));
     
      navigate(`/company/pr/jobs/${jobId}`);
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="mr-2" size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Edit Job</h1>
        <button
          onClick={handleSubmit}
          className="bg-blued hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Job Title', name: 'JobTitle' },
          { label: 'Job Location', name: 'JobLocation' },
          { label: 'Workplace Type', name: 'WorkplaceType' },
          { label: 'Close By Date', name: 'CloseByDate', type: 'date' },
          { label: 'Employment Type', name: 'EmploymentType' },
          { label: 'Seniority Level', name: 'SeniorityLevel' },
          { label: 'Experience From', name: 'ExperienceFrom', type: 'number' },
          { label: 'Experience To', name: 'ExperienceTo', type: 'number' },
          { label: 'Salary From', name: 'SalaryFrom', type: 'number' },
          { label: 'Salary To', name: 'SalaryTo', type: 'number' },
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`border ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="flex flex-col">
          <label className="font-medium mb-1">Role Overview</label>
          <textarea
            name="RoleOverview"
            value={formData.RoleOverview}
            onChange={handleChange}
            className={`border ${
              errors.RoleOverview ? 'border-red-500' : 'border-gray-300'
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
          />
          {errors.RoleOverview && <p className="text-red-500 text-sm mt-1">{errors.RoleOverview}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Duties Responsibility</label>
          <textarea
            name="DutiesResponsibility"
            value={formData.DutiesResponsibility}
            onChange={handleChange}
            className={`border ${
              errors.DutiesResponsibility ? 'border-red-500' : 'border-gray-300'
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
          />
          {errors.DutiesResponsibility && (
            <p className="text-red-500 text-sm mt-1">{errors.DutiesResponsibility}</p>
          )}
        </div>

        {/* <div className="flex flex-col">
          <label className="font-medium mb-1">Tier</label>
          <select
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className={`border ${
              errors.tier ? 'border-red-500' : 'border-gray-300'
            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blued`}
          >
            <option value="">Select Tier</option>
            <option value="tier1">Tier 1</option>
            <option value="tier2">Tier 2</option>
            <option value="tier3">Tier 3</option>
          </select>
          {errors.tier && <p className="text-red-500 text-sm mt-1">{errors.tier}</p>}
        </div> */}
      </form>
    </div>
  );
};

export default EditJob;
