import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin'; // Assuming 'role' is stored in localStorage or JWT

  const handleLogout = () => {
    toast.success('Successfully logged out!', {
      position: 'top-right',
      autoClose: 2000,
    });

    // Set timeout for logout actions after toast message
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Remove the user's role upon logout
      navigate('/login');
    }, 2000); // Delay of 2 seconds (2000ms)
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src="https://imgs.search.brave.com/al2fZ-dA-fW_tELG9lX6aJxIxGDBUEM_J5cOMESezik/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzMyLzM1Lzc3/LzM2MF9GXzIzMjM1/NzczOV91RWhKTWs2/eXBKOWFxTllFdG9t/QzZqVE9aMkhDb09u/Wi5qcGc"
            alt="JobBoard Logo"
            className="navbar-logo-img"
          />
        </div>

        <div className="navbar-links">
          <ul>
            {isLoggedIn && !isAdmin && (
              <>
                <li><Link to="/" className="navbar-item">Home</Link></li>
                <li><Link to="/my-jobs" className="navbar-item">My Jobs</Link></li>
                <li><Link to="/" className="navbar-item">Apply for Jobs</Link></li>
              </>
            )}

            {isAdmin && (
              <>
                <li><Link to="/create-job" className="navbar-item">Create Job</Link></li>
                <li><Link to="/job/:jobId/applicants" className="navbar-item">View Applicants</Link></li>
                <li><Link to="/job/:jobId/edit-job" className="navbar-item">Edit Job</Link></li>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <li><Link to="/register" className="navbar-item">Register</Link></li>
                <li><Link to="/login" className="navbar-item">Login</Link></li>
              </>
            ) : (
              <li><button onClick={handleLogout} className="navbar-item logout-btn">Logout</button></li>
            )}
          </ul>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
}

export default Navbar;
