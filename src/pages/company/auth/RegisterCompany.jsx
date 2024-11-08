import React, { useState } from 'react';
import { IoCloudUploadOutline,IoAlert } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { uploadPicture, RegisterCompany, selectRegisterState } from '../../../redux/company/auth/companyAuthSlice';
import Loader from '../../../components/loaders/Loader';

const currentYear = new Date().getFullYear();





// Zod Schemas
const step1Schema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format'),
  website: z.string().url('Invalid website URL'),
  type: z.enum(['corporate', 'startup', 'enterprise'], {
    errorMap: () => ({ message: 'Please select a company type' })
  }),
  industry: z.enum(['technology', 'healthcare', 'finance', 'education'], {
    errorMap: () => ({ message: 'Please select an industry' })
  }),
  description: z.string().min(1, 'Description is required'),
});

const step2Schema = z.object({
  locationName: z.string().min(10, 'Location name is required'),
  address: z.string().min(10, 'Address is required'),
  town: z.string().min(3, 'Town is required'),
  country: z.string().min(3, 'Country is required'),
  postalCode: z.string().regex(/^[A-Za-z0-9\s-]{3,10}$/, 'Invalid postal code format'),
});


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const step3Schema = z.object({
  linkedIn: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  yearFounded: z.string()
    .refine((val) => !val || (Number(val) >= 1800 && Number(val) <= currentYear), {
      message: `Year must be between 1800 and ${currentYear}`,
    })
    .optional()
    .or(z.literal('')),
  mission: z.string().optional().or(z.literal('')),
  baseLocation: z.string().optional().or(z.literal('')),
  isMultinational: z.boolean(),
  executiveName: z.string().optional().or(z.literal('')),
  executiveDesignation: z.string().optional().or(z.literal('')),
  logo: z.any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  cover: z.any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

export default function RegisterCompanyPage() {

  const [logoFile, setLogoFile] = useState();
  const [coverFile, setCoverFile] = useState();
  const [logoPreview, setLogoPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1
    companyName: '',
    password: '',
    email: '',
    phone: '',
    website: '',
    type: '',
    industry: '',
    description: '',
    // Step 2
    locationName: '',
    address: '',
    town: '',
    country: '',
    postalCode: '',
    // Step 3
    linkedIn: '',
    yearFounded: '',
    mission: '',
    baseLocation: '',
    isMultinational: false,
    executiveName: '',
    executiveDesignation: '',
    logo: '',
    cover: '',
    publicIdLogo: "",
    publicIdCover: "",
  });
  const register = useSelector(selectRegisterState);
  const dispatch = useDispatch();

  const validateStep = (currentStep) => {
    try {
      let validationResult;
      switch (currentStep) {
        case 1:
          validationResult = step1Schema.parse({
            companyName: formData.companyName,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            type: formData.type,
            industry: formData.industry,
            description: formData.description,
          });
          break;
        case 2:
          validationResult = step2Schema.parse({
            locationName: formData.locationName,
            address: formData.address,
            town: formData.town,
            country: formData.country,
            postalCode: formData.postalCode,
          });
          break;
        case 3:
          validationResult = step3Schema.parse({
            linkedIn: formData.linkedIn,
            yearFounded: formData.yearFounded,
            mission: formData.mission,
            baseLocation: formData.baseLocation,
            isMultinational: formData.isMultinational,
            executiveName: formData.executiveName,
            executiveDesignation: formData.executiveDesignation,
          });
          break;
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  {/* Add this handler function */ }
  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoPreview(reader.result);
          setLogoFile(file)
        } else {
          setCoverFile(file)
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) {
      return;
    }

    console.log(step);
    if (logoPreview) {

      try {

        const logo = await dispatch(uploadPicture({ type: "logo", image: logoFile })).unwrap();
        setFormData((prev) => ({ ...prev, logo: logo.data.secure_url, publicIdLogo: logo.data.public_id }));

      } catch (error) {

        //TODO : ERROR HANDLING
        console.log(error);
      }

    }

    if (coverPreview) {

      try {
        console.log("he2")
        const cover = await dispatch(uploadPicture({ type: "cover", image: logoFile })).unwrap();
        setFormData((prev) => ({ ...prev, logo: cover.data.secure_url, publicIdLogo: cover.data.public_id }));

      } catch (error) {
        //TODO : ERROR HANDLING
        console.log(error);
      }
    }
    const resultAction = await dispatch(RegisterCompany(formData));

    if (RegisterCompany.fulfilled.match(resultAction)) {

      // setFormData({
      //   // Step 1
      //   companyName: '',
      //   password: '',
      //   email: '',
      //   phone: '',
      //   website: '',
      //   type: '',
      //   industry: '',
      //   description: '',
      //   // Step 2
      //   locationName: '',
      //   address: '',
      //   town: '',
      //   country: '',
      //   postalCode: '',
      //   // Step 3
      //   linkedIn: '',
      //   yearFounded: '',
      //   mission: '',
      //   baseLocation: '',
      //   isMultinational: false,
      //   executiveName: '',
      //   executiveDesignation: '',
      //   logo: '', 
      //   cover: '',
      //   publicIdLogo: "",
      //   publicIdCover: "",
      // })
      // console.log(resultAction);
      // console.log("registered successfully")
    } else if (RegisterCompany.rejected.match(resultAction)) {
      // console.log(resultAction);
    } else {

    }
  };

  const renderInput = (name, label, type = 'text', required = false) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors[name] ? 'border-red-500' : ''
          }`}
        required={required}
      />
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-8">
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= number ? 'bg-accent text-white' : 'bg-gray-200'
                    }`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => {
            console.log(step);
            handleSubmit(e);
          }}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                {renderInput('companyName', 'Company Name', 'text', true)}
                {renderInput('password', 'Password', 'password', true)}
                {renderInput('email', 'Email', 'email', true)}
                {renderInput('phone', 'Phone', 'tel', true)}
                {renderInput('website', 'Website', 'url', true)}

                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.type ? 'border-red-500' : ''
                      }`}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="corporate">Corporate</option>
                    <option value="startup">Startup</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                  {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.industry ? 'border-red-500' : ''
                      }`}
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                  </select>
                  {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''
                      }`}
                    required
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                {renderInput('locationName', 'Location Name', 'text', true)}
                {renderInput('address', 'Address', 'text', true)}
                {renderInput('town', 'Town', 'text', true)}
                {renderInput('country', 'Country', 'text', true)}
                {renderInput('postalCode', 'Postal Code', 'text', true)}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">

                {/* Image Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Company Logo
                    </label>
                    <div className="mt-1 flex flex-col items-center space-y-4">
                      {logoPreview ? (
                        <div className="relative w-40 h-40">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setLogoPreview('');
                              setLogoFile('');
                              setFormData((prev) => ({ ...prev, logo: null }));
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg">
                          <IoCloudUploadOutline />
                          <p className="mt-2 text-sm text-gray-500">Click to upload logo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'logo')}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo"
                        className="cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Select Logo
                      </label>
                      {errors.logo && (
                        <p className="text-sm text-red-500">{errors.logo}</p>
                      )}
                    </div>
                  </div>

                  {/* Cover Photo Upload */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Photo
                    </label>
                    <div className="mt-1 flex flex-col items-center space-y-4">
                      {coverPreview ? (
                        <div className="relative w-full h-40">
                          <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCoverPreview('');
                              setCoverFile('');
                              setFormData((prev) => ({ ...prev, cover: null }));
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2"
                          >

                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg">
                          <IoCloudUploadOutline />
                          <p className="mt-2 text-sm text-gray-500">Click to upload cover photo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="cover"
                        name="cover"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'cover')}
                        className="hidden"
                      />
                      <label
                        htmlFor="cover"
                        className="cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Select Cover Photo
                      </label>
                      {errors.cover && (
                        <p className="text-sm text-red-500">{errors.cover}</p>
                      )}
                    </div>
                  </div>
                </div>

                {renderInput('linkedIn', 'LinkedIn Profile', 'url')}
                {renderInput('yearFounded', 'Year Founded', 'number')}
                <div className="mb-4">
                  <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
                    Your Mission
                  </label>
                  <textarea
                    id="mission"
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    rows={4}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.mission ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.mission && <p className="mt-1 text-sm text-red-500">{errors.mission}</p>}
                </div>
                {renderInput('baseLocation', 'Base Location')}
                {renderInput('executiveName', 'Executive Name')}
                {renderInput('executiveDesignation', 'Executive Designation')}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isMultinational"
                    name="isMultinational"
                    checked={formData.isMultinational}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="isMultinational" className="text-sm text-gray-700">
                    Is this a multinational company?
                  </label>
                </div>

              {  register?.error && <div
      role="alert"
      aria-live="assertive"
      className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-r-md shadow-md"
    >
      <div className="flex items-center">
        <IoAlert className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
        <span className="text-red-700 font-medium">Error</span>
      </div>
      <p className="text-red-600 mt-2">{register.error}</p>
    </div>}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setStep(1)}
              >
                Cancel
              </button>
              {step < 3 &&
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-md bg-accent text-white hover:bg-indigo-700"
                >
                  Next
                </button>}
              {step === 3 && (

                !register.loading ?
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-accent text-white hover:bg-indigo-700"
                  >
                    {"Submit"}
                  </button> : <><Loader /></>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}