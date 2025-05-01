import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './EditJob.css';

const EditJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setJobData(response.data);
      } catch (err) {
        setError('Failed to fetch job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!jobData.title) errors.title = 'Job title is required';
    if (!jobData.company) errors.company = 'Company name is required';
    if (!jobData.location) errors.location = 'Location is required';
    if (!jobData.salary) errors.salary = 'Salary is required';
    if (!jobData.description) errors.description = 'Description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return toast.error('Please fill out all required fields');
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/jobs/${jobId}`, jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        toast.success('Job details updated successfully!');
        navigate(`/my-jobs`);
      } else {
        setError('Failed to update job details.');
        toast.error('Failed to update job details.');
      }
    } catch (err) {
      setError('Error updating job details.');
      toast.error('Error updating job details.');
    }
  };

  if (loading) return <p>Loading job details...</p>;

  return (
    <div className="edit-job-container">
      <h2>Edit Job</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
          />
          {formErrors.title && <p className="error-text">{formErrors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
          />
          {formErrors.company && <p className="error-text">{formErrors.company}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
          />
          {formErrors.location && <p className="error-text">{formErrors.location}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
          {formErrors.salary && <p className="error-text">{formErrors.salary}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.description && <p className="error-text">{formErrors.description}</p>}
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditJob;
