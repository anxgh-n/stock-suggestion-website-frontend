import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import bgImage from '../Images/blue_bg.jpg'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/usercredentials/validate-user', formData);
      if (response.data) {
        localStorage.setItem('token', response.data);
        localStorage.setItem('username', formData.username);
        setToken(response.data);
        setUsername(formData.username);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md bg-opacity-50 ">
        <div className="flex items-center justify-center mb-12 text-4xl font-extrabold text-black sm:text-4xl">
          StockWise
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2 tracking-[0.1rem]">USERNAME</label>
            <input
              type="text"
              className="w-full px-4 py-2 border-b-2 border-black bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2 tracking-[0.1rem]">PASSWORD</label>
            <input
              type="password"
              className="w-full px-4 py-2 border-b-2 border-black bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-md bg-[#003236] hover:bg-[#015E6D] transition duration-200" 
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-black">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#003236] hover:text-[#015E6D] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;