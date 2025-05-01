import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css"; // Assuming you have a CSS file for styling
const CreateJob = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        job,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    
      alert("Job created successfully!");
    
      if (res.data.success) {
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
    
  };

  return (
    <div className="create-job-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
