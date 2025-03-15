import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      const response = await axios.post('http://localhost:8080/api/signin', formData);
      // Show the success message from API
      alert('Sign-in successful!');
      setToken(response.data.token); // Store the JWT token
    } catch (error) {
      console.error('Error signing in', error);
      // Show the error message returned by the backend or a generic message
      setErrorMessage(error.response?.data?.msg || 'Something went wrong!');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
