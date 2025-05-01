import React, { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard/JobCard.jsx';
import './Home.css';
import axios from 'axios';

function Home() {
  const [jobs, setJobs] = useState([]);

   console.log(jobs);
   
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:5000/api/jobs/all-jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });      
      if(response.data.success)
        setJobs(response.data.data);
    };

    fetchJobs();
  }, []);


  return (
    <div>
      <h1>All Jobs</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Home;
