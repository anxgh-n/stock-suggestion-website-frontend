import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../Images/athenablock.png";
import NotificationIcon from "./NotificationIcon";
import iconn from "../Images/menuop.png";

export default function ProfileHeader() {
  let navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar with Dark Gradient */}
      <header className="shadow mb-0 sticky top-0 z-0 red-hat-display-header h-[100px] bg-black">
        <nav className="relative flex w-full h-20 flex-col bg-transparent overflow-hidden px-2 py-1 md:py-1 md:flex-row md:items-center rounded-3xl">
          <div className="container mx-auto w-full flex justify-between items-center px-4">
            <div className="flex items-center space-x-3">
            <Link to="/">
                <img
                  src={logo}
                  alt="AthenaChain Logo"
                  className="h-[80px] w-[50px] overflow-visible "
                />
              </Link>
              <Link to="/">
                <div className="text-white flex flex-col text-left">
                  <span className="text-[50px] font-bold leading-none">
                    AthenaChain
                  </span>
                </div>
              </Link>
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
                to="/profile"
                className="text-white text-[16px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                PROFILE
              </Link>
              <Link
                to="/watchlist"
                className="text-white text-[16px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                WATCHLIST
              </Link>
              <Link
                to="/"
                className="text-black text-[16px] border-2 border-white rounded-full bg-white hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                LOGOUT
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
