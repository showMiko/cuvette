import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginForm = ({ setToken }) => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    companyEmail: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        localStorage.setItem('authToken', response.data.token); 
        const userData = JSON.parse(atob(response.data.token.split('.')[1])); 
        login(userData); 
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      setMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <div className='w-2/3 p-20 text-center hidden md:block'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repudiandae assumenda ea soluta placeat cum iusto minima obcaecati ex ab quae, vitae dolorem unde tempore provident aliquam repellat, harum hic! Quod expedita eius quisquam alias mollitia ipsum laudantium. Inventore reprehenderit nihil amet consequuntur labore natus fugiat perferendis aspernatur? Voluptatibus
      </div>
      <div className="w-full md:w-1/3 max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              id="companyEmail"
              className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your company email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaLock className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
          <p className="text-center mt-4 text-red-500">{message}</p>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
