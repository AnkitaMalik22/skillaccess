import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function AssignTests() {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/company/tests`);
        setTests(response.data);
      } catch (error) {
        toast.error('Failed to fetch tests');
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleTestSelection = (testId) => {
    setSelectedTests(prev => {
      const isSelected = prev.some(test => test.testId === testId);
      if (isSelected) {
        return prev.filter(test => test.testId !== testId);
      }
      return [...prev, { testId }];
    });
  };

  const handleBack = () => {
    navigate(`/company/pr/campus-drive/${driveId}/invite`);
  };

  const handleSubmit = async () => {
    if (selectedTests.length === 0) {
      toast.error('Please select at least one test');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/company/campus-drive/${driveId}/tests`,
        { tests: selectedTests }
      );
      toast.success('Tests assigned successfully');
      navigate('/company/pr/dashboard');
    } catch (error) {
      toast.error('Failed to assign tests');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 3: Assign Tests</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800">Available Tests</h3>
            <div className="max-h-60 overflow-y-auto">
              {tests.map((test) => (
                <div key={test._id} className="mb-3 flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={selectedTests.some(
                      (selected) => selected.testId === test._id
                    )}
                    onChange={() => handleTestSelection(test._id)}
                  />
                  <span className="ml-2">{test.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="btn btn-secondary bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary bg-blued hover:bg-lightBlue"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Assigning Tests...' : 'Finish'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}