import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import JobsPosted from "../components/Jobs/JobsPosted"
const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    candidates: [],
    endDate: '',
  });
  const [candidateInput, setCandidateInput] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCandidateInputChange = (e) => {
    setCandidateInput(e.target.value);
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    const email = candidateInput.trim();


    if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setFormData((prevData) => ({
        ...prevData,
        candidates: [...prevData.candidates, email],
      }));
      setCandidateInput(''); 
    }
  };

  const handleRemoveCandidate = (emailToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      candidates: prevData.candidates.filter((email) => email !== emailToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        console.log('Job created successfully:', data);
        handleCancel(); 
      } else {
        console.error('Failed to create job:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      jobTitle: '',
      jobDescription: '',
      experienceLevel: '',
      candidates: [],
      endDate: '',
    });
    setCandidateInput('');
  };

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8 mb-10"  >
      {!showForm && (
        <>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
          >
          Create Interview
        </button>
        {user && <div className="w-[100%] flex"><JobsPosted userId={user.userId}/></div> }
        
        </>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 p-6 w-full max-w-3xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-full sm:w-48 text-gray-700 text-xl font-semibold mb-2 sm:mb-0 text-right pr-4">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
              className="flex-1 w-full sm:w-auto px-4 py-2 border rounded"
              placeholder="Enter Job Title"
            />
          </div>

          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-full sm:w-48 text-gray-700 text-xl font-semibold mb-2 sm:mb-0 text-right pr-4">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              required
              value={formData.jobDescription}
              onChange={handleChange}
              className="flex-1 w-full sm:w-auto px-4 py-2 border rounded h-32"
              placeholder="Enter Job Description"
            />
          </div>

          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-full sm:w-48 text-gray-700 text-xl font-semibold mb-2 sm:mb-0 text-right pr-4">
              Experience Level
            </label>
            <input
              type="text"
              name="experienceLevel"
              required
              value={formData.experienceLevel}
              onChange={handleChange}
              className="flex-1 w-full sm:w-auto px-4 py-2 border rounded"
              placeholder="Select Experience Level"
            />
          </div>

          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-full sm:w-48 text-gray-700 text-xl font-semibold mb-2 sm:mb-0 text-right pr-4">
              Add Candidate
            </label>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="email"
                value={candidateInput}
                onChange={handleCandidateInputChange}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter Candidate Email"
              />
              <button
                type="button"
                onClick={handleAddCandidate}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              >
                Add Candidate
              </button>
              <div className="mt-4">
                {formData.candidates.map((email, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(email)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="w-full sm:w-48 text-gray-700 text-xl font-semibold mb-2 sm:mb-0 text-right pr-4">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
              className="flex-1 w-full sm:w-auto px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading} 
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
          {loading && <p className="text-center text-blue-500">Loading...</p>}
        </form>
      )}
    </div>
  );
};

export default HomePage;
