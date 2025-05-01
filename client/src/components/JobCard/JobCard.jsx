import React, { useState } from 'react';
import './JobCard.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {

  const [showApply, setShowApply] = useState(false);
  const navigate = useNavigate()
  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-company">Company: {job.company}</p>
      <p className="job-location">Location: {job.location}</p>
      <p className="job-salary">Salary: {job.salary}</p>
      <p className="job-description">{job.description}</p>
      <button className="apply-button" onClick={()=> navigate(`${job._id}`)} >Apply Now</button>

     
    </div>
  );
};

export default JobCard;
