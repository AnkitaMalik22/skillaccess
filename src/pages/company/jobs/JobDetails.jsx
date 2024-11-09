import React, { useState, useEffect } from 'react';

const JobDetailsPage = ({ job }) => {
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    // Check if the job prop has an id property before fetching tests
    if (job && job.id) {
      // Fetch tests for the job
      const fetchTests = async () => {
        try {
          const response = await fetch(`/api/jobs/${job.id}/tests`);
          const data = await response.json();
          setTests(data);
        } catch (error) {
          console.error('Error fetching tests:', error);
        }
      };
      fetchTests();
    }
  }, [job]);

  const handleTestSelect = (testId) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((id) => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const navigateToApplyPage = () => {
    window.location.href = `/apply?job=${encodeURIComponent(JSON.stringify(job))}&selectedTests=${encodeURIComponent(JSON.stringify(selectedTests))}`;
  };

  // Check if the job prop is defined before rendering the component
  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-gray-500">{job.company.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">{job.location}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-bold mb-4">Job Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Employment Type</p>
            <p>{job.employmentType}</p>
          </div>
          <div>
            <p className="text-gray-500">Seniority Level</p>
            <p>{job.seniorityLevel}</p>
          </div>
          <div>
            <p className="text-gray-500">Experience</p>
            <p>
              {job.experienceFrom} - {job.experienceTo} years
            </p>
          </div>
          <div>
            <p className="text-gray-500">Salary</p>
            <p>
              ${job.salaryFrom} - ${job.salaryTo}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-bold mb-4">Required Tests</h3>
        <div className="grid grid-cols-2 gap-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className={`bg-gray-100 rounded-lg p-4 cursor-pointer ${
                selectedTests.includes(test.id)
                  ? 'border-2 border-blue-500'
                  : ''
              }`}
              onClick={() => handleTestSelect(test.id)}
            >
              <h4 className="text-lg font-bold">{test.name}</h4>
              <p className="text-gray-500">{test.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={navigateToApplyPage}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;