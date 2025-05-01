// src/context/JobContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context
const JobContext = createContext();

// Custom hook
export const useJobContext = () => useContext(JobContext);

// Provider
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 100000 });

  const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        selectedJobType,
        setSelectedJobType,
        locationFilter,
        setLocationFilter,
        salaryRange,
        setSalaryRange,
        jobTypes,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
