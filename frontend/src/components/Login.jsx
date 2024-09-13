import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/authSlice.js'; // Adjust the path based on your file structure

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, status, userDetails, errorMessage } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Dispatch the loginUser action and wait for it to complete
      const resultAction = await dispatch(loginUser({
        username: formData.usernameOrEmail,
        password: formData.password,
      }));
  
      // Check if the login was successful
      if (loginUser.fulfilled.match(resultAction)) {
        console.log('Successfully logged in');
        navigate('/todo'); // Redirect to dashboard or another route
      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-gray-700 font-medium">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div>
            <p className="text-center text-gray-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:text-blue-600"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

