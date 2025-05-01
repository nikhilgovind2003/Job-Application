import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateJob.css'; // Assuming you will create the CSS for styling

function CreateJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        toast.success('Job created successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });
        setTimeout(() => navigate('/my-jobs'), 2000); // Navigate to "My Jobs" page after success
      } else {
        toast.error('Job creation failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Server error. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="create-job-container">
      <h1>Create a New Job</h1>
      <form onSubmit={handleSubmit} className="create-job-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'input-error' : ''}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <p className="error-text">{errors.location}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className={errors.salary ? 'input-error' : ''}
          />
          {errors.salary && <p className="error-text">{errors.salary}</p>}
        </div>

        <div className="form-group">
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <button type="submit" className="submit-button">Create Job</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default CreateJob;
