import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      toast.success('User logged in successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
      <p className="switch-auth">
        Don't have an account? <Link to="/register">Sign Up here</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default Login;
