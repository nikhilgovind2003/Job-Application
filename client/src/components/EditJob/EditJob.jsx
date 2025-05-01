import React, { useState, useEffect } from 'react';
import './EditJob.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleJob, updateJob } from '../../redux/slices/job/jobSlice'; // Import actions
import { useNavigate, useParams } from 'react-router-dom';

const JobEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {jobId} = useParams()
  console.log(jobId)

  // Access the job data from the Redux store
  const { job, status, error } = useSelector((state) => state.job);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});

  // Fetch the job from the API if jobId is passed
  useEffect(() => {
    if (jobId) {
      dispatch(getSingleJob(jobId)); // Fetch job from Redux
    }
  }, [dispatch, jobId]);

  // Update form data when job data is retrieved from Redux
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        company: job.company || '',
        location: job.location || '',
        salary: job.salary || ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Job title is required.';
    if (!formData.description) newErrors.description = 'Job description is required.';
    if (!formData.company) newErrors.company = 'Company name is required.';
    if (!formData.location) newErrors.location = 'Location is required.';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Salary must be a positive number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Dispatch the updateJob action to update the job
      await dispatch(updateJob({ jobId, jobData: formData }));
      alert('Job updated successfully');
      navigate('/my-jobs');
    } catch (error) {
      alert('Error updating job: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      company: '',
      location: '',
      salary: ''
    });
    navigate("/my-jobs");
  };

  return (
    <div className="job-edit-popup">
      <div className="job-edit-header">
        <h2>Edit Job Details</h2>
        <button className="job-edit-close-btn" aria-label="Close">&times;</button>
      </div>

      <form onSubmit={handleSubmit} className="job-edit-form">
        <div className="job-edit-group">
          <label htmlFor="title">Job Title</label>
          <input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
          {errors.title && <div className="job-edit-error">{errors.title}</div>}
        </div>

        <div className="job-edit-group">
          <label htmlFor="description">Job Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows={4} 
          />
          {errors.description && <div className="job-edit-error">{errors.description}</div>}
        </div>

        <div className="job-edit-row">
          <div className="job-edit-group">
            <label htmlFor="company">Company Name</label>
            <input 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              required 
            />
            {errors.company && <div className="job-edit-error">{errors.company}</div>}
          </div>

          <div className="job-edit-group">
            <label htmlFor="location">Location</label>
            <input 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
            {errors.location && <div className="job-edit-error">{errors.location}</div>}
          </div>
        </div>

        <div className="job-edit-group">
          <label htmlFor="salary">Salary</label>
          <input 
            id="salary" 
            type="number" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
            min="0" 
          />
          {errors.salary && <div className="job-edit-error">{errors.salary}</div>}
        </div>

        <div className="job-edit-actions">
          <button 
            type="button" 
            onClick={handleCancel} 
            className="job-edit-cancel"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="job-edit-save"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobEditForm;
