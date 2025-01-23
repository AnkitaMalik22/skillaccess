"use client"

import { useState } from "react"
import axios from "axios"
import { getHeaders } from "../../../util/isCompany"

export default function CollegeRegistrationForm({ data }) {
    const [step, setStep] = useState(1);
    const parsedData = JSON.parse(JSON.stringify(data));
    const [formData, setFormData] = useState(
        {
            accreditations: parsedData?.accreditation || [],
            collegeType: parsedData?.collegeType || "",
            coursesOffered: parsedData?.coursesOffered || [],
            topCompanies: parsedData?.topCompanies || [],
            mous: parsedData?.mous || [],
            industryTieUps: parsedData?.industryTieUps || [],
            campusArea: parsedData?.campusArea || "", // Infrastructure field
            laboratoryDetails: parsedData?.laboratoryDetails || "", // Infrastructure field
            hostelFacility: parsedData?.hostelFacility || "", // Infrastructure field
            bankingDetails: {
                panCard: parsedData?.bankingDetails?.panCard || "",
                bankName: parsedData?.bankingDetails?.bankName || "",
                accountNumber: parsedData?.bankingDetails?.accountNumber || "",
                ifscCode: parsedData?.bankingDetails?.ifscCode || "",
            },
            placementOfficer: parsedData?.placementOfficer || {},
            placementStatistics: parsedData?.placementStatistics || {},
            studentStrength: parsedData?.studentStrength || {},
            genderRatio: parsedData?.genderRatio || {},
            infrastructure: parsedData?.infrastructure || {},
            additionalInfo: parsedData?.additionalInfo || {},
        }
    );


    const totalSteps = 6
    const stepTitles = [
        "Recognition & Accreditation",
        "Courses Offered",
        "Placement Information",
        "Student Data",
        "Infrastructure",
        "Additional Information",
    ]

    const addAccreditation = () => {
        setFormData((prev) => {

            return {
                ...prev,

                accreditations: [
                    ...prev.accreditations,
                    { body: "", grade: "", validityPeriod: "", accreditationCertificate: null },
                ],
            }
        })
    }

    const removeAccreditation = (index) => {
        setFormData((prev) => ({
            ...prev,
            accreditations: prev.accreditations.filter((_, i) => i !== index),
        }))
    }

    const updateAccreditation = (index, field, value) => {
        setFormData((prev) => {
            const newAccreditations = [...prev.accreditations]
            newAccreditations[index][field] = value
            return { ...prev, accreditations: newAccreditations }
        })
    }

    const addCourse = () => {
        setFormData((prev) => ({
            ...prev,
            coursesOffered: [...prev.coursesOffered, { program: "", specializations: [], intakeCapacity: 0 }],
        }))
    }

    const removeCourse = (index) => {
        setFormData((prev) => ({
            ...prev,
            coursesOffered: prev.coursesOffered.filter((_, i) => i !== index),
        }))
    }

    const addCompany = () => {
        setFormData((prev) => ({
            ...prev,
            topCompanies: [...prev.topCompanies, ""],
        }))
    }

    const removeCompany = (index) => {
        setFormData((prev) => ({
            ...prev,
            topCompanies: prev.topCompanies.filter((_, i) => i !== index),
        }))
    }

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, totalSteps))
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (step < totalSteps) {
            nextStep()
            return
        }

        try {
            // Create FormData object
            const formDataToSend = new FormData()

            // Append all form data
            Object.keys(formData ?? {}).forEach((key) => {
                if (key === "accreditations") {
                    // Handle accreditation certificates
                    formData.accreditations?.forEach((acc, index) => {
                        if (acc.accreditationCertificate) {
                            formDataToSend.append(`accreditationCertificate_${index}`, acc.accreditationCertificate)
                        }
                    })
                    formDataToSend.append("accreditations", JSON.stringify(formData.accreditations))
                } else {
                    formDataToSend.append(key, JSON.stringify(formData[key]))
                }
            })

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL ?? ""}/api/college/update/details`,
                formDataToSend,
                getHeaders("multipart/form-data"),
            )

            if (response?.data?.success) {
                alert("College details updated successfully!")
            }
        } catch (error) {
            console.error("Error updating college:", error)
            alert("Error updating college details")
        }
    }

    const ProgressBar = () => (
        <div className="mb-8">
            <div className="flex justify-between mb-2">
                {stepTitles?.map((title, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center text-sm ${step > index + 1 ? "text-blued" : step === index + 1 ? "text-gray-900" : "text-gray-400"
                            }`}
                    >
                        {title}
                    </div>
                ))}
            </div>
            <div className="h-2 flex rounded-full bg-gray-200">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`flex-1 ${step > index + 1 ? "bg-blued" : step === index + 1 ? "bg-blued" : "bg-gray-200"
                            } ${index === 0 ? "rounded-l-full" : ""} ${index === totalSteps - 1 ? "rounded-r-full" : ""}`}
                    />
                ))}
            </div>
        </div>
    )

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">College Type</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        value={formData.collegeType}
                                        onChange={(e) => setFormData({ ...formData, collegeType: e.target.value })}
                                        className="max-w-lg block w-full shadow-sm focus:ring-accent focus:border-accent sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Government">Government</option>
                                        <option value="Private">Private</option>
                                        <option value="Autonomous">Autonomous</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Accreditations</h4>
                                <div className="mt-4 space-y-4">
                                    {formData.accreditations?.map((accreditation, index) => (
                                        <div key={index} className="border rounded-lg p-4 space-y-4">
                                            <select
                                                value={accreditation.body}
                                                onChange={(e) => updateAccreditation(index, "body", e.target.value)}
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option value="">Select Accreditation Body</option>
                                                <option value="NAAC">NAAC</option>
                                                <option value="UGC">UGC</option>
                                                <option value="AICTE">AICTE</option>
                                                <option value="Other">Other</option>
                                            </select>

                                            <select
                                                value={accreditation.grade}
                                                onChange={(e) => updateAccreditation(index, "grade", e.target.value)}
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option value="">Select Grade</option>
                                                <option value="A++">A++</option>
                                                <option value="A+">A+</option>
                                                <option value="A">A</option>
                                                <option value="B++">B++</option>
                                                <option value="B+">B+</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="Unaccredited">Unaccredited</option>
                                            </select>

                                            <input
                                                type="date"
                                                value={accreditation.validityPeriod}
                                                onChange={(e) => updateAccreditation(index, "validityPeriod", e.target.value)}
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                            />

                                            <input
                                                type="file"
                                                onChange={(e) => updateAccreditation(index, "accreditationCertificate", e.target.files[0])}
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeAccreditation?.(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addAccreditation}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blued bg-accent bg-opacity-50 hover:bg-indigo-200"
                                    >
                                        Add Accreditation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">Courses Offered</h4>
                            <div className="mt-4 space-y-4">
                                {formData.coursesOffered?.map((course, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4">
                                        <input
                                            type="text"
                                            value={course.program}
                                            onChange={(e) => {
                                                const newCourses = [...formData.coursesOffered]
                                                newCourses[index].program = e.target.value
                                                setFormData({ ...formData, coursesOffered: newCourses })
                                            }}
                                            placeholder="Program name"
                                            className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                        />

                                        <div className="space-y-2">
                                            {course.specializations?.map((spec, specIndex) => (
                                                <div key={specIndex} className="flex items-center space-x-2">
                                                    <span className="flex-grow">{spec}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newCourses = [...formData.coursesOffered]
                                                            newCourses[index].specializations = course.specializations.filter(
                                                                (_, i) => i !== specIndex,
                                                            )
                                                            setFormData({ ...formData, coursesOffered: newCourses })
                                                        }}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder="Add specialization"
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault()
                                                        const newCourses = [...formData.coursesOffered]
                                                        newCourses[index].specializations.push(e.target.value)
                                                        setFormData({ ...formData, coursesOffered: newCourses })
                                                        e.target.value = ""
                                                    }
                                                }}
                                            />
                                        </div>

                                        <input
                                            type="number"
                                            value={course.intakeCapacity}
                                            onChange={(e) => {
                                                const newCourses = [...formData.coursesOffered]
                                                newCourses[index].intakeCapacity = Number.parseInt(e.target.value)
                                                setFormData({ ...formData, coursesOffered: newCourses })
                                            }}
                                            placeholder="Intake capacity"
                                            className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeCourse?.(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remove Course
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addCourse}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blued bg-accent bg-opacity-50 hover:bg-indigo-200"
                                >
                                    Add Course
                                </button>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Placement Officer Details
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.placementOfficer?.name ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementOfficer: {
                                                    ...formData.placementOfficer,
                                                    name: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.placementOfficer?.email ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementOfficer: {
                                                    ...formData.placementOfficer,
                                                    email: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.placementOfficer?.phone ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementOfficer: {
                                                    ...formData.placementOfficer,
                                                    phone: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Placement Statistics</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2 space-y-2">
                                    <input
                                        type="number"
                                        placeholder="Average Placement Percentage"
                                        value={formData.placementStatistics?.average ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementStatistics: {
                                                    ...formData.placementStatistics,
                                                    average: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Highest Package (INR)"
                                        value={formData.placementStatistics?.highest ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementStatistics: {
                                                    ...formData.placementStatistics,
                                                    highest: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Average Package (INR)"
                                        value={formData.placementStatistics?.averagePackage ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                placementStatistics: {
                                                    ...formData.placementStatistics,
                                                    averagePackage: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Top Companies</h4>
                                <div className="mt-4 space-y-2">
                                    {formData.topCompanies?.map((company, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={company}
                                                onChange={(e) => {
                                                    const newCompanies = [...formData.topCompanies]
                                                    newCompanies[index] = e.target.value
                                                    setFormData({ ...formData, topCompanies: newCompanies })
                                                }}
                                                className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Company name"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeCompany?.(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addCompany}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blued bg-accent bg-opacity-50 hover:bg-indigo-200"
                                    >
                                        Add Company
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Student Strength</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2 space-y-2">
                                    <input
                                        type="number"
                                        placeholder="Total Student Strength"
                                        value={formData.studentStrength?.total ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                studentStrength: {
                                                    ...formData.studentStrength,
                                                    total: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Final Year Student Strength"
                                        value={formData.studentStrength?.finalYear ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                studentStrength: {
                                                    ...formData.studentStrength,
                                                    finalYear: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Gender Ratio</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="number"
                                            placeholder="Male %"
                                            value={formData.genderRatio?.male ?? ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    genderRatio: {
                                                        ...formData.genderRatio,
                                                        male: e.target.value,
                                                    },
                                                })
                                            }
                                            className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Female %"
                                            value={formData.genderRatio?.female ?? ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    genderRatio: {
                                                        ...formData.genderRatio,
                                                        female: e.target.value,
                                                    },
                                                })
                                            }
                                            className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="space-y-6 sm:space-y-5">
                            {/* Campus Area */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Campus Area (in acres)
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="number"
                                        placeholder="Enter area in acres"
                                        value={formData.infrastructure?.campusArea ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    campusArea: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Laboratory Details */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Laboratory Details</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={4}
                                        placeholder="Describe laboratory facilities and equipment"
                                        value={formData.infrastructure?.laboratoryDetails ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    laboratoryDetails: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Hostel Facility */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Hostel Facility</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        value={formData.infrastructure?.hostelFacility ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    hostelFacility: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>

                            {/* Library Facilities */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Library Facilities</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        placeholder="Describe library facilities"
                                        value={formData.infrastructure?.libraryFacilities ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    libraryFacilities: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Sports Facilities */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Sports Facilities</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        placeholder="Describe sports facilities"
                                        value={formData.infrastructure?.sportsFacilities ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    sportsFacilities: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Transport Facilities */}
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Transport Facilities</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={3}
                                        placeholder="Describe transport facilities (e.g., buses)"
                                        value={formData.infrastructure?.transportFacilities ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                infrastructure: {
                                                    ...formData.infrastructure,
                                                    transportFacilities: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 6:
                return (
                    <div className="space-y-6">
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">MOUs with Companies</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={4}
                                        placeholder="Details of Memorandums of Understanding with companies"
                                        value={formData.additionalInfo?.mous ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                additionalInfo: {
                                                    ...formData.additionalInfo,
                                                    mous: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Industry Tie-Ups</label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea
                                        rows={4}
                                        placeholder="Details of partnerships with industries"
                                        value={formData.additionalInfo?.industryTieUps ?? ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                additionalInfo: {
                                                    ...formData.additionalInfo,
                                                    industryTieUps: e.target.value,
                                                },
                                            })
                                        }
                                        className="block w-full shadow-sm focus:ring-accent focus:border-accent sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <ProgressBar />

                    <div className="bg-white shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 space-y-6 sm:p-6">{renderStep()}</div>

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <div className="flex justify-between">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Previous
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blued hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                                >
                                    {step === totalSteps ? "Submit" : "Next"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

