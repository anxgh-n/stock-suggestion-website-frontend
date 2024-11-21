import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../CSS/NavigationComponent.css";
import logo from "../Images/athenablock.png";
import NotificationIcon from "./NotificationIcon";
export default function ProfileHeader() {
  let navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar with Dark Gradient */}
      <header
        className="shadow mb-0 sticky top-0 z-2 red-hat-display-header"
        style={{
          backgroundColor: "rgba(0, 0, 0)", // Transparent header
          backdropFilter: "blur(10px)", // Optional blur effect for a glassy look
          padding: "10px 0", // Reduce padding to shrink the height
        }}
      >
        <nav className="relative flex w-full h-20 flex-col bg-transparent overflow-hidden px-2 py-1 md:py-1 md:flex-row md:items-center">
          <div className="container mx-auto w-full flex justify-between items-center px-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              
              <div className="text-white flex flex-col text-left">
                <span className="text-[30px] font-bold leading-none slide-in-right">
                  Athenachain
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-3">
              <Link
                to="/welcome"
                className="text-white text-[16px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                HOME
              </Link>
              <Link
                to="/"
                className="text-black text-[16px] border-2 border-white rounded-full bg-white hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                LOGOUT
              </Link>
              <NotificationIcon />
            </div>
           
          </div>
        </nav>
      </header>
    </>
  );
}
