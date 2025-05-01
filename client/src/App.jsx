import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreateJob from './components/CreateJob/CreateJob.jsx';
import MyJobs from './pages/MyJobs/MyJobs.jsx';
import ApplyJob from './components/ApplyJob/ApplyJob.jsx';
import PrivateRoute from './utils/PrivateRoute'; // Import PrivateRoute
import AdminRoute from './utils/AdminRoute'; // Import AdminRoute
import ViewApplicants from './pages/ViewApplicants/ViewApplicants.jsx'; // Import the new page
import EditJob from './pages/EditJob/EditJob.jsx'; // Import the new page
import { JobProvider } from './context/jobContext.jsx';

function App() {
  return (
    <Router>

      <JobProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<ApplyJob />} />
              <Route path="/my-jobs" element={<MyJobs />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/job/:jobId/applicants" element={<ViewApplicants />} />
              <Route path="/job/:jobId/edit-job" element={<EditJob />} />

            </Route>
          </Routes>
        </div>
      </JobProvider>
    </Router>

  );
}

export default App;
