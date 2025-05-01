import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ApplyJob.css';
import { useNavigate, useParams } from 'react-router-dom';

function ApplyJob() {
  const [coverLetter, setCoverLetter] = useState('');
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the cover letter is empty
    if (!coverLetter.trim()) {
      toast.error('Please write a cover letter before submitting.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        { coverLetter },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );


      // Check if the response is successful
        toast.success('Application submitted successfully!');
        navigate("/"); // Navigate to home or wherever needed after a successful application
    } catch (error) {
      console.error('Application error:', error); // Log the error for debugging
      toast.error('Something went wrong! Please try again later.');
    }
  };

  return (
    <div className="apply-modal">
      <div className="apply-content">
        <h2>Submit Cover Letter</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write a short cover letter..."
            required
          />
          <div className="apply-actions">
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;
