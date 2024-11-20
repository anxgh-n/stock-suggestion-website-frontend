import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import profileImage from "../Images/profile_pic.png";
import logo from "../Images/athenablock.png";
import grc1 from "../Images/greece.jpg";
import "../CSS/MainHeader.css";
import NotificationIcon from "./NotificationIcon";

export default function MainHeader() {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cryptoList, setCryptoList] = useState([]); // Stores fetched crypto list
  const [filteredCryptos, setFilteredCryptos] = useState([]); // Stores filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // Controls when suggestions are displayed
  const searchRef = useRef(null); // Ref to track the search input and dropdown

  useEffect(() => {
    // Fetch initial list of cryptocurrencies
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        setCryptoList(data);
        setFilteredCryptos(data.slice(0, 10)); // Initially show the first 5
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptos();
  }, []);

  const handleProfile = () => {
    navigate("/profile");
    setIsDropdownOpen(false); // Close the dropdown after selecting Profile
  };

  const handleLogout = () => {
    navigate("/");
    setIsDropdownOpen(false); // Close the dropdown after Logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter cryptos based on query
    if (query.length > 0) {
      const filtered = cryptoList.filter((crypto) =>
        crypto.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredCryptos(filtered.slice(0, 12)); // Limit to 12 results
      setShowSuggestions(true); // Show suggestions as soon as user types
    } else {
      // Reset to initial top 12 suggestions
      setFilteredCryptos(cryptoList.slice(0, 12));
      setShowSuggestions(false); // Hide suggestions if the search is empty
    }
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true); // Show suggestions on focus
  };

  const handleCryptoClick = (id) => {
    navigate(`/crypto/${id}`); // Navigate to the crypto's data page
    setSearchQuery(""); // Clear search text after selecting a crypto
    setShowSuggestions(false); // Hide suggestions on selection
  };

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSuggestions(false); // Hide suggestions if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header
        className="shadow mb-0 sticky top-0 z-50 red-hat-display-header"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent header
          backdropFilter: "blur(10px)", // Optional blur effect for a glassy look
        }}
      >
        <nav className="relative flex w-full flex-col overflow-visible px-2 py-0 md:py-4 md:flex-row md:items-center rounded-3xl ">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-3">
              <Link to="/welcome"><img
                src={logo}
                alt="AthenaChain Logo"
                className="h-[110px] w-[70px] overflow-visible slide-in-left transition-transform transform hover:scale-150 hover:translate-y-[20%] hover:translate-x-[0%]"
                style={{
                  transition: "transform 1s ease-out", // Slow zoom-out effect with smooth transition
                }}
              /></Link>
              <div className="text-white flex flex-col text-left">
                <span className="text-[50px] font-bold leading-none slide-in-right">
                  Athena
                </span>
                <span className="text-[50px] font-bold leading-none slide-in-right">
                  Chain
                </span>
              </div>
            </div>
            <div className="relative w-1/3" ref={searchRef}>
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus} // Show suggestions on focus
                  className="w-full border-b border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none rounded-lg shadow-sm placeholder-black" // Wider input with bottom border only
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)", // Slightly opaque background (80% opacity)
                  }}
                />
              </form>
              {/* Dropdown for suggestions */}
              {showSuggestions && filteredCryptos.length > 0 && (
                <div
                  className="absolute bg-white border rounded-md shadow-lg mt-1 w-[150%] scale-95 transform transition duration-200 ease-in-out z-50"
                  style={{ left: "-25%" }} // Center the dropdown wider than input
                >
                  {filteredCryptos.map((crypto) => (
                    <div
                      key={crypto.id}
                      onClick={() => handleCryptoClick(crypto.id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={crypto.image}
                        alt={`${crypto.name} icon`}
                        className="w-6 h-6 mr-2" // Style for icon
                      />
                      <span>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-6">
              <Link
                to="/welcome"
                className="text-white text-[20px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                HOME
              </Link>
              <Link
                to="/docs"
                className="text-white text-[20px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                DOCS
              </Link>
              <Link
                to="/news"
                className="text-white text-[20px] rounded-full bg-black bg-opacity-50 hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
              >
                NEWS
              </Link>
              <NotificationIcon/>
            </div>

            <div className="relative">
             
              <div
                className="text-black text-[20px] border-2 border-white rounded-full bg-white  hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
                onClick={toggleDropdown}
              >
                PROFILE
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
