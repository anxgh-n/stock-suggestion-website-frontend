import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/NavigationComponent.css";
import logo from "../Images/athenablock.png";
import grc1 from "../Images/greece.jpg";

export default function NavigationComponent() {
  let navigate = useNavigate();

  

  return (
    <>
      {/* Navigation Bar with Dark Gradient */}
      <header
        className="shadow mb-0 sticky top-0 z-50 red-hat-display-header bg-black bg-opacity-30 "
        style={{
          backgroundImage: `url(${grc1}) `,
          backgroundSize: "cover", // Ensures both gradient and image cover the header
          backgroundRepeat: "no-repeat", // Prevents repetition for both layers
          backgroundPosition: "center", // Centers both the image and gradient
        }}
      >
        <nav className="relative flex w-full flex-col overflow-hidden px-2 py-0 md:py-4 md:flex-row md:items-center rounded-3xl ">
          <div className="container mx-auto w-full flex justify-between items-center px-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="AthenaChain Logo"
                className="h-[120px] w-[80px] overflow-visible slide-in-left transition-transform transform hover:scale-150 hover:translate-y-[20%] hover:translate-x-[0%]"
                style={{
                  transition: "transform 1s ease-out", // Slow zoom-out effect with smooth transition
                }}
              />
              <div className="text-white flex flex-col text-left">
                <span className="text-[50px] font-bold leading-none slide-in-right">
                  Athena
                </span>
                <span className="text-[50px] font-bold leading-none slide-in-right">
                  Chain
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="text-white text-[25px]  rounded-full bg-black bg-opacity-50 hover:text-gray-300  hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white text-[25px]   rounded-full bg-black bg-opacity-50 hover:text-gray-300  hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                About
              </Link>
              <Link
                to="/login"
                className="text-white text-[25px] border-2 border-white rounded-full bg-black bg-opacity-50 hover:text-gray-300  hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                Login/SignUp
              </Link>
            </div>

          </div>
        </nav>
      </header>
    </>
  );
}
