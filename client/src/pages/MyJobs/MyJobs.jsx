import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyJobs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  // Fetch the user's jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/my-jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setJobs(data.data);
        } else {
          toast.error('Failed to load jobs. Please try again later.');
        }
      } catch (error) {
        toast.error('Server error. Please try again later.');
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Handle job deletion
  const deleteJob = async (jobId) => {
    const confirmation = window.confirm('Are you sure you want to delete this job?');
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          toast.success('Job deleted successfully!');
        } else {
          toast.error('Failed to delete job. Try again.');
        }
      } catch (error) {
        toast.error('Server error. Please try again.');
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <div className="my-jobs-container">
      <h1>My Jobs</h1>
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <div className="job-card-actions">
                <Link to={`/edit-job/${job._id}`} className="edit-job-btn">Edit</Link>
                <button className="delete-job-btn" onClick={() => deleteJob(job._id)}>
                  Delete
                </button>
                <Link to={`/job/${job._id}/applicants`} className="view-applicants-btn">
                  View Applicants
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs applied yet. <Link to="/create-job">Apply Job</Link></p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyJobs;
