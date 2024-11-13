import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import profileImage from "../Images/profile_pic.png";

export default function NavigationComponent() {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleProfile() {
    navigate("/profile");
  }

  function handleLogout() {
    navigate("/login")
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  }

  return (
    <>
      <header className="shadow mb-2 sticky top-0 z-50 bg-white">
        <nav className="relative flex max-w-screen-xl flex-col overflow-visible px-2 py-4 md:mx-auto md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-3xl font-bold text-gray-800">StockWise</div>
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-gray-700 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md border-2 border-indigo-900 px-4 py-1 font-medium text-indigo-900 transition-colors hover:bg-indigo-900 hover:text-white"
              >
                Search
              </button>
            </form>
            <div className="flex space-x-6">
              <Link to="/welcome" className="text-indigo-900 hover:text-black-500 text-lg">
                Home
              </Link>
              <Link to="/about" className="text-indigo-900 hover:text-black-500 text-lg">
                About
              </Link>
              <a href="#" className="text-indigo-900 hover:text-black-800 text-lg">
                Contacts
              </a>
            </div>
            
            <div className="relative">
              <div
                className="w-10 h-10 overflow-hidden cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={profileImage}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-35 bg-white border rounded-md shadow-lg p-2">
                  <button
                    onClick={handleProfile}
                    className="block w-30 px-4 py-2 text-left text-gray-700 hover:bg-gray-200 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-30 px-4 py-2 text-left text-gray-700 hover:bg-gray-200 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
