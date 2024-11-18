import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/NavigationComponent.css"; 
import logo from "../Images/athenablock.png"

export default function NavigationComponent() {
  let navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <>
      {/* Navigation Bar with Dark Gradient */}
      <header className="shadow mb-0 sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black squada-one-regular"
      style={{
        background: 'rgb(0,0,0)',
        background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,4,54,1) 100%)'
      }}>
        <nav className="relative flex max-w-screen-xl flex-col overflow-hidden px-2 py-6 md:py-4 md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="AthenaBlock Logo" className="h-20 w-25" />
              <div className="text-[45px] font-bold text-white">
                AthenaBlock
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-white hover:text-gray-300 text-lg"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 text-lg"
              >
                About
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                className="text-white rounded-full px-4 py-2 hover:text-white transition"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="rounded-md border-2 border-white px-6 py-1 font-medium text-white hover:bg-white hover:text-black transition"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
