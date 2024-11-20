import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import bgImage from '../Images/blue_bg.jpg';

function Login() {
  const [isLogin, setIsLogin] = useState(true); // Track if it's login or signup form
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    categoryId: '1', // Default categoryId for signup
  });
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();

  // Toggle between login and signup
  const toggleForm = () => setIsLogin(!isLogin);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7061/usercredentials/validate-user', formData);
      if (response.data) {
        sessionStorage.setItem('token', response.data);
        sessionStorage.setItem('username', formData.username);
        setToken(response.data);
        setUsername(formData.username);

        // Fetch user category
        await fetchCategoryByUsername(formData.username);
        toast.success('Login successful!');
        navigate('/welcome');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7060/usercredentials/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  // Fetch category data by username (for login)
  const fetchCategoryByUsername = async (username) => {
    try {
      const response = await axios.get(`http://localhost:7061/usercredentials/get-category-by-username/${username}`);
      if (response.data && response.data.category) {
        const categoryId = response.data.category.categoryId;
        sessionStorage.setItem('categoryId', categoryId);
        console.log('CategoryId set in sessionStorage:', categoryId);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <label htmlFor="tab-1" className="tab">Sign In</label>
          <input
            id="tab-2"
            type="radio"
            name="tab"
            className="sign-up"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label htmlFor="tab-2" className="tab">Sign Up</label>

          <div className="login-form">
            {/* Login Form */}
            {isLogin && (
              <div className="sign-in-htm">
                <form onSubmit={handleLogin}>
                  <div className="group">
                    <label htmlFor="user" className="label">Username</label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      data-type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group">
                    <input
                      id="check"
                      type="checkbox"
                      className="check"
                      checked
                      onChange={() => {}}
                    />
                    <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      value="Sign In"
                    />
                  </div>
                  <div className="hr"></div>
                  <div className="foot-lnk">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                </form>
              </div>
            )}

            {/* Sign Up Form */}
            {!isLogin && (
              <div className="sign-up-htm">
                <form onSubmit={handleSignup}>
                  <div className="group">
                    <label htmlFor="user" className="label">Username</label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      data-type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="category" className="label">Experience</label>
                    <select
                      id="category"
                      className="input"
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      required
                    >
                      <option value="1">Beginner</option>
                      <option value="2">Intermediate</option>
                      <option value="3">Expert</option>
                    </select>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      value="Sign Up"
                    />
                  </div>
                  <div className="hr"></div>
                  <div className="foot-lnk">
                    <Link to="/login">Already a Member?</Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
