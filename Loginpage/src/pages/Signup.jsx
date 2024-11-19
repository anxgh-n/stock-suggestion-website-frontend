import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import bgImage from '../Images/blue_bg.jpg'

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    categoryId: '1',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7060/usercredentials/register', formData);
      toast.success('Registration successful! Please login.');
      sessionStorage.setItem("categoryId",formData.categoryId);
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md bg-opacity-50 pt-1 ">
        <div className=" flex items-center justify-center mb-8 text-4xl font-extrabold text-gray-800 sm:text-4xl">
        </div>
        <h2 className="text-3xl font-bold text-center text-black mb-8">Register</h2>
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
            <label className="block text-sm font-bold text-black tracking-[0.1rem] mb-2">EMAIL</label>
            <input
              type="email"
              className="w-full px-4 py-2 border-b-2 border-black bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black tracking-[0.1rem] mb-2">PASSWORD</label>
            <input
              type="password"
              className="w-full px-4 py-2 border-b-2 border-black bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black tracking-[0.1rem] mb-2">EXPERIENCE</label>
            <select
              className="w-full px-4 py-2 border-b-2 border-black bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="1" className="bg-opacity-80 hover:scale-95 transition transform">Beginner</option>
              <option value="2" className="bg-opacity-80 hover:scale-95 transition transform">Intermediate</option>
              <option value="3" className="bg-opacity-80 hover:scale-95 transition transform">Expert</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#003236] text-white py-2 px-4 rounded-md hover:bg-[#015E6D] transition duration-200 hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-black">
          Already have an account?{' '}
          <Link to="/login" className="text-[#003236] hover:text-[#015E6D] font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;