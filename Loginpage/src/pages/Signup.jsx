import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import bgImage from '../Images/greece2.jpg';
import logo from "../Images/athenablock.png";

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
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="p-10">
        <div className="bg-black border-white rounded-3xl shadow-xl px-10 py-8 w-full max-w-xl bg-opacity-65">
        <Link to="/">
          <div className="flex items-center justify-center mb-12 text-4xl font-extrabold text-white sm:text-4xl">
            <img
              src={logo}
              alt="AthenaChain Logo"
              className="h-[120px] w-[80px] "
              style={{
                transition: "transform 1s ease-out",
              }}
            />
          </div>
          </Link>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">USERNAME</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-b-2 border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">EMAIL</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border-b-2 border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">PASSWORD</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border-b-2 border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div>
  <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">PROFICIENCY</label>
  <select
    className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:ring-0 focus:border-blue-500 focus:border-b-2"
    style={{
      color: 'white', // Ensures text color is white
    }}
    value={formData.categoryId}
    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
    required
  >
    <option value="1" className="text-black bg-white">Beginner</option>
    <option value="2" className="text-black bg-white">Intermediate</option>
    <option value="3" className="text-black bg-white">Expert</option>
  </select>
</div>

            </div>
            <button
              type="submit"
              className="w-full text-black py-2 px-4 rounded-md bg-white hover:bg-black hover:text-white transition duration-200 hover:scale-105"
            >
              <strong>Sign Up</strong>
            </button>
          </form>
          <p className="mt-6 text-center text-white">
            <strong>Already have an account?{' '}</strong>
            <Link
              to="/login"
              className="text-white font-medium hover:text-gray-300 hover:underline hover:scale-105 transition duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
