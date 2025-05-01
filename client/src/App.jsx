import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateJob from "./pages/CreateJob/CreateJob";
import MyJobs from "./pages/MyJobs/MyJobsPage";
import ProtectedRoute from "./utils/PrivateRoute"; // ProtectedRoute for regular users
import JobApplication from "./components/CoverLetterForm/CoverLetterForm";
import NotFound from "./pages/PageNotFound/PageNotFound"; // Import the 404 page
import ViewApplicants from "./components/ViewApplicant/ViewApplicant";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />
        {/* User Routes */}
        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute>
              <JobApplication />
            </ProtectedRoute>
          }
        />
        <Route path="/view-applicants/:jobId" element={
          <ProtectedRoute>
            <ViewApplicants />
          </ProtectedRoute>
        } />
        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
