import React, { useState } from 'react';
import './CoverLetterForm.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CoverLetterForm = () => {
  const { jobId } = useParams()
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobId)
    try {
      const response = await axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`, // Adjust the URL as needed
        { coverLetter },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}` // Assuming you store the token in localStorage
          }
        }
      );

      if (response.data.success) {
        alert('Cover letter submitted successfully!');
        setCoverLetter('');
          navigate("/")
      } else {
        setMessage('Failed to submit cover letter.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while submitting.');
    }
  };

  return (

    <div className='coverletter-form'>
      <div className="cover-letter-container">
        <h2 className="cover-letter-title">Submit Cover Letter</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label className="cover-letter-label">Your Cover Letter</label>
          <textarea
            name="coverLetter"
            required
            rows="8"
            className="cover-letter-textarea"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          <div className='btns'>

            <button type="button" className="cancel-button" onClick={() => {
              navigate("/")
            }}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoverLetterForm;
