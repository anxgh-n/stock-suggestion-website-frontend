import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Welcome() {
  const navigate = useNavigate();
  const { username, setToken, setUsername } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usercredentials/get-category-by-username/${username}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {username}!</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
            {userInfo && (
              <div className="space-y-2">
                <p className="text-gray-600">
                  Experience Level:{' '}
                  <span className="font-medium text-gray-900">{userInfo.category.categoryName}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Welcome;