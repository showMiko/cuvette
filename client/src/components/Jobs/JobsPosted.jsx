import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from './Card';

const JobsPosted = ({userId}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/fetchJobs', { params: { userId: userId } });
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [userId]);

  return (
    <div className="space-y-4 ">
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <Card key={job._id} job={job} />
        ))
      )}
    </div>
  );
};

export default JobsPosted