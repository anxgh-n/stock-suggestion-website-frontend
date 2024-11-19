import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/NavigationComponent.css";
import logo from "../Images/athenablock.png";

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
      <header
        className="shadow mb-0 sticky top-0 z-50 squada-one-regular bg-black"
        style={{
          background: "rgb(0,0,0), linear-gradient(357deg, rgba(0,0,0,1) 0%, rgba(4,14,32,1) 53%, rgba(3,8,17,1) 80%, rgba(8,29,66,1) 100%)",
          backgroundBlendMode: "overlay", // Optional, for blending the gradient and solid color
        }}
      >
        <nav className="relative flex max-w-screen-xl flex-col overflow-hidden px-2 py-6 md:py-4 md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="AthenaBlock Logo" className="h-[200px] w-[200px]" />
              <div className="text-[55px] font-bold text-white">
                AthenaBlock
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-20">
              <Link
                to="/"
                className="text-white text-2xl hover:text-gray-300 hover:scale-100 hover:border-2 hover:border-white hover:rounded-[10px] px-6 py-0.5 transition-all"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white text-2xl hover:text-gray-300 hover:scale-95 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-all"
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
