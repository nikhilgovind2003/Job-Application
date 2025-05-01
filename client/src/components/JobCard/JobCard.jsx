import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./JobCard.css";
import { useSelector } from "react-redux";
import axios from "axios";

const JobCard = ({ job, email, onDelete, showApplyButton }) => {
  const descRef = useRef(null);
  const isExpandedRef = useRef(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const MAX_LENGTH = 50;

  const toggleDescription = () => {
    if (!descRef.current) return;
    if (isExpandedRef.current) {
      descRef.current.textContent = job.description.slice(0, MAX_LENGTH);
    } else {
      descRef.current.textContent = job.description;
    }
    isExpandedRef.current = !isExpandedRef.current;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${job?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      alert("Job deleted successfully");
      onDelete(job._id);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-salary">₹ {job.salary}</p>

      <p className="job-description">
        <span ref={descRef}>
          {job.description.length > MAX_LENGTH
            ? job.description.slice(0, MAX_LENGTH)
            : job.description}
        </span>
        {job.description.length > MAX_LENGTH && (
          <span className="read-more" onClick={toggleDescription}>
            {isExpandedRef.current ? " Show less" : "... Read more"}
          </span>
        )}
      </p>

      {/* Show Apply Now button only on the Home page */}
      {showApplyButton && (
        <Link to={`/apply/${job._id}`} className="apply-btn">
          Apply Now
        </Link>
      )}

      {/* Show Edit and Delete buttons only for job creators */}
      {user?.email === email && !showApplyButton && (
        <div className="btns">
          <button
            onClick={() => navigate(`/edit-job/${job._id}`)}
            className="edit"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="delete">
            Delete
          </button>

          {/* Show View Applicants button only for job creators */}
          <Link to={`/view-applicants/${job._id}`} className="view-applicants-btn">
            View Applicants
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
