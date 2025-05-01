import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard.jsx";
import "./Home.css";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get("http://localhost:5000/api/jobs/all-jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setJobs(response.data.data); // Update state with fetched jobs
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home-container">
      <h1>All Jobs</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} showApplyButton={true} /> 
        ))}
      </div>
    </div>
  );
}

export default Home;
