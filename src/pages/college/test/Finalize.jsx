import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import useTranslate from "../../../hooks/useTranslate";
import { getEntity } from "../../../util/isCompany";

const Finalize = () => {
  const navigate = useNavigate();
  const testDetails = JSON.parse(localStorage.getItem("testDetails"));
  const totalTime = localStorage.getItem("totalTime");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [testConfig, setTestConfig] = useState(null);

  useEffect(() => {
    // Get test details from localStorage
    const storedTest = localStorage.getItem('testDetails');
    if (storedTest) {
      const parsedTest = JSON.parse(storedTest);
      setTestConfig(parsedTest.config);
      console.log('Test Config:', parsedTest.config);
    }
  }, []);

  const handleSubmit = () => {
    navigate(
      `/${getEntity()}/test/invite?testId=${searchParams.get("testId")}`
    );
    
  };

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Header with Back and Invite Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="rounded-md p-2 bg-[#D9E1E7] hover:bg-gray-300 transition-colors"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="px-6 py-2 bg-blued text-white rounded-md hover:bg-[#043345] transition-colors flex items-center gap-2"
          onClick={handleSubmit}
        >
          <img src="/images/icons/student.png" alt="" className="w-5 h-5" />
          <span>Invite Students</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-full mx-auto space-y-6">
        {/* Basic Details */}
        <div className="bg-white border rounded-lg">
          <div className="px-8 py-6 border-b">
            <h2 className="text-2xl font-bold text-[#043345]">
              {testDetails?.name}
            </h2>
            <p className="mt-2 text-gray-600">
              {testDetails?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold text-[#043345]">{testDetails?.totalQuestions}</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500">Total Attempts</p>
              <p className="text-2xl font-bold text-[#043345]">{testDetails?.totalAttempts}</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500">Duration</p>
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium text-[#043345]">
                  From: {new Date(testDetails?.duration_from).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-base font-medium text-[#043345]">
                  To: {new Date(testDetails?.duration_to).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Configuration */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#043345] mb-4">Test Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f8f8f8] p-4 rounded-lg border">
              <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                <div>
                  <p className="font-medium text-[#043345]">Camera Required</p>
                  <p className="text-sm text-gray-500">{testConfig?.isCameraRequired ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#f8f8f8] p-4 rounded-lg border">
              <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                <div>
                  <p className="font-medium text-[#043345]">Tab Switches</p>
                  <p className="text-sm text-gray-500">{testConfig?.maxTabSwitches || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#043345] mb-4">Instructions</h3>
          <div className="space-y-4">
            {testDetails?.config?.instructions?.map((instruction, index) => (
              <div key={index} className="bg-[#f8f8f8] p-4 rounded-lg border">
                <h4 className="font-medium text-[#043345] mb-2">{instruction.title}</h4>
                <p className="text-gray-600">{instruction.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Additional Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Negative Marking</p>
              <p className="text-sm text-gray-500">
                {testDetails?.isNegativeMarking ? "Enabled" : "Disabled"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Category</p>
              <p className="text-sm text-gray-500">
                {testDetails?.categoryName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalize;
