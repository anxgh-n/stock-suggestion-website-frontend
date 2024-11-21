import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/NavigationComponent.css";
import logo from "../Images/athenablock.png";
import gr1 from "../Images/greece.jpg"

export default function NavigationComponent() {
  let navigate = useNavigate();

  

  return (
    <>
      {/* Navigation Bar with Dark Gradient */}
      <header
        className="shadow mb-0 sticky top-0 z-80 red-hat-display-header bg-black "
        
      >
        <nav className="relative flex w-full flex-col bg-transparent overflow-hidden px-2 py-0 md:py-4 md:flex-row md:items-center">
          <div className="container mx-auto w-full flex justify-between items-center px-4">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img
                src={logo}
                alt="AthenaChain Logo"
                className="h-[100px] w-[70px] overflow-visible slide-in-left transition-transform transform hover:scale-150 hover:translate-y-[20%] hover:translate-x-[0%]"
                style={{
                  transition: "transform 1s ease-out",
                }}
              /></Link>
             <Link to="/">
             <div className="text-white flex flex-col text-left">
                <span className="text-[40px] font-bold leading-none slide-in-right">
                  AthenaChain
                </span>
              </div>
             </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="text-white text-[20px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                HOME
              </Link>
              <Link
                to="/about"
                className="text-white text-[20px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                ABOUT
              </Link>
              <Link
                to="/login"
                className="text-white text-[20px] border-2 border-white rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="text-black text-[20px] border-2 border-white rounded-full bg-white  hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                SIGNUP
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
