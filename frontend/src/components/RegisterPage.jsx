import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to track input fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });

  // State to track submission status
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  try {
    //   // Send POST request to the backend
    //   const response = await axios.post('http://localhost:8000/api/v2/users/register', formData);
    //   setMessage(response.data.message); // Success message from the backend
    //   setError(null); // Clear error
    // } catch (err) {
    //   if (err.response) {
    //     // Display error message from the backend
    //     setError(err.response.data.message);
    //   } else {
    //     setError('An error occurred. Please try again later.');
    //   }
    //   setMessage(null); // Clear success message

      const resultAction =await dispatch(registerUser({
        fullName: formData.fullName,
        password: formData.password,
        username: formData.username,
        email: formData.email
      }))

      if (registerUser.fulfilled.match(resultAction)) {
        console.log('Successfully Registered');
        navigate('/todo'); // Redirect to dashboard or another route
      } else {
        console.error('Registration failed:', resultAction.payload);
      }
        
  }
    catch(error){
        console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Success/Error Message */}
          {message && <p className="text-green-500 text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
