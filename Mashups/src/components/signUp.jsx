import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiconnecter } from '../services/apiconnecter';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.gmail)) {
      toast.error("Invalid email address");
      return;
    }
    try {
      const response = await apiconnecter('post','/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("User Signup Successfully");
        setFormData({
          name: "",
          gmail: "",
          password: "",
        });
        localStorage.setItem("Users", JSON.stringify(formData));
      } else {
        toast.error("Failed to add user");
      }
    } catch (err) {
      toast.error("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 bg-opacity-90 flex flex-col justify-center p-10 mt-14 rounded-lg shadow-lg" style={{ height: '580px' }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-100">Sign Up</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-700 py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder='Enter your name'
                    required
                    className="w-full pl-3 pr-4 py-2 rounded-md transition-all duration-300 outline-none bg-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gmail" className="block text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="gmail"
                    name="gmail"
                    type="email"
                    autoComplete="email"
                    placeholder='Enter your gmail'
                    required
                    className="w-full pl-3 pr-4 py-2 rounded-md transition-all duration-300 outline-none bg-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-500"
                    value={formData.gmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder='Enter the password'
                    required
                    className="w-full pl-3 pr-4 py-2 rounded-md transition-all duration-300 outline-none bg-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-sm text-center">
                <p className="flex gap-2 font-medium text-gray-400">
                  Already have an account? <Link to="/signin" className="text-indigo-400 hover:text-indigo-300">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
