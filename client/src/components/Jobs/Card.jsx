import React from 'react';
import { FaCalendar,FaUser } from 'react-icons/fa';

const Card = ({ job }) => {
  const trimmedDescription =
    job.jobDescription.length > 100 ? `${job.jobDescription.substring(0, 100)}...` : job.jobDescription;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); 
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-xl mt-10 mx-auto max-w-xs md:max-w-sm lg:max-w-md">
      <h2 className="text-2xl md:text-3xl mb-4 font-semibold">{job.jobTitle}</h2>
      <hr className="my-2" />
      <p className="text-sm md:text-base">{trimmedDescription}</p>
      <div className="flex flex-row justify-between mt-4">
        <div className="font-bold flex justify-center items-center gap-1"><FaUser color='gray'/><div className='text-gray-500'>{job.experienceLevel}</div></div>
        <div className="font-bold flex justify-center items-center gap-1"><FaCalendar color='gray'/><div className='text-gray-500'>{formatDate(job.endDate)}</div></div>
      </div>
      <hr className="my-2" />
      <div className="flex space-x-2">
        {job.candidates.map((email) => (
          <div key={email} className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {email.charAt(0).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
