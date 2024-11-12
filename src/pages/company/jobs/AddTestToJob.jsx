import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTests } from '../../../redux/company/test/thunks/test';
import { getJobDetails } from '../../../redux/company/jobs/jobSlice';
import { useParams } from 'react-router-dom';
import { addTestToJob } from '../../../redux/company/test/thunks/job';
import { FiArrowLeft } from 'react-icons/fi';

const AddTestToJob = () => {
    const navigate = useNavigate();
  const [selectedTestId, setSelectedTestId] = useState(null);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { jobDetails } = useSelector((state) => state.job);
  
  const beginner = useSelector((state) => state.companyTest.assessments.beginner);
  const intermediate = useSelector((state) => state.companyTest.assessments.intermediate);
  const advanced = useSelector((state) => state.companyTest.assessments.advanced);
  const adaptive = useSelector((state) => state.companyTest.assessments.adaptive);

  useEffect(() => {
    dispatch(getAllTests());
    dispatch(getJobDetails(jobId));
  }, [dispatch, jobId]);

  const handleSelectTest = (id) => {
    if (selectedTestId === id) {
      setSelectedTestId(null);
    } else {
        setSelectedTestId(id);
    }
  };

  const handleSave = () => {
    dispatch(addTestToJob({ jobId, testId: selectedTestId }));
  };

  const renderTestList = (title, tests) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div
            key={test._id}
            className={`p-4 border rounded-lg cursor-pointer shadow-md transition duration-200 hover:shadow-lg ${
              selectedTestId === test._id ? 'bg-blue-50 border-blued' : 'bg-white border-gray-300'
            }`}
            onClick={() => handleSelectTest(test._id)}
          >
            <h4 className="text-md font-medium">{test.name}</h4>
            <p className="text-sm text-gray-600">{test.description || 'No description available'}</p>
          </div>
        ))}
        {
            tests.length === 0 && <NotFound/>
        }
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
            <FiArrowLeft className="mr-2" size={20} />
            <span>Back</span>
        </button>

        <h2 className="text-xl font-semibold text-gray-700">{jobDetails?.JobTitle}</h2>
        <button
          className="bg-blued text-white font-semibold py-2 px-6 rounded-lg hover:bg-secondary transition duration-200"
          onClick={handleSave}
          disabled={!selectedTestId}
        >
          Save
        </button>
      </div>

      <h3 className="text-gray-600 mb-4">Select a test to add to the job</h3>
      
      {renderTestList('Beginner', beginner)}
      {renderTestList('Intermediate', intermediate)}
      {renderTestList('Advanced', advanced)}
      {renderTestList('Adaptive', adaptive)}
    </div>
  );
};

export default AddTestToJob;


const NotFound = () => {
    return (
        <div>
            <h1>Not Available Yet</h1>
        </div>
    );
}
