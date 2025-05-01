import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewApplicants.css';

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplicants(response.data);
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="applicants-container">
      <h2 className="applicants-title">Applicants for Job ID: <span>{jobId}</span></h2>
      {loading ? (
        <p className="loading-text">Loading applicants...</p>
      ) : applicants.length === 0 ? (
        <p className="no-applicants">No applicants found.</p>
      ) : (
        <div className="applicants-list">
          {applicants.map((app) => (
            <div key={app.applicantId._id} className="applicant-card">
              <h3>{app.applicantId.name}</h3>
              <p className="email">{app.applicantId.email}</p>
              <div className="cover-letter-box">
                <strong>Cover Letter:</strong>
                <p className="cover-letter">{app.coverLetter}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;
