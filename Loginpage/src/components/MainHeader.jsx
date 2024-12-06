import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../Images/athenablock.png";
import NotificationIcon from "./NotificationIcon";
import iconn from "../Images/menuop.png";

export default function MainHeader() {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenTwo, setIsDropdownOpenTwo] = useState(false);
  const [cryptoList, setCryptoList] = useState([]); // Stores fetched crypto list
  const [filteredCryptos, setFilteredCryptos] = useState([]); // Stores filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // Controls when suggestions are displayed
  const searchRef = useRef(null); // Ref to track the search input and dropdown

  useEffect(() => {
    // Fetch initial list of cryptocurrencies
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          ""
        );//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
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
    navigate("/profilepage");
    setIsDropdownOpen(false); // Close the dropdown after selecting Profile
  };

  const handleLogout = () => {
    navigate("/");
    setIsDropdownOpen(false); // Close the dropdown after Logout
  };

  const handleHome = () => {
    navigate("/welcome");
    setIsDropdownOpenTwo(false); // Close the dropdown after Logout
  };
  const handleDocs = () => {
    navigate("/docs");
    setIsDropdownOpenTwo(false); // Close the dropdown after Logout
  };
  const handleNews = () => {
    navigate("/news");
    setIsDropdownOpenTwo(false); // Close the dropdown after Logout
  };

  const toggleDropdownTwo = () => {
    setIsDropdownOpenTwo(!isDropdownOpenTwo);
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
      <header className="shadow mb-0 sticky top-0 z-50 red-hat-display-header h-[100px] bg-black">
        <nav className="relative flex w-full  flex-col overflow-visible px-2 py-0 md:py-4 md:flex-row md:items-center rounded-3xl ">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-3">
              <Link to="/welcome">
                <img
                  src={logo}
                  alt="AthenaChain Logo"
                  className="h-[80px] w-[50px] overflow-visible "
                />
              </Link>
              <Link to="/welcome">
                <div className="text-white flex flex-col text-left">
                  <span className="text-[50px] font-bold leading-none">
                    AthenaChain
                  </span>
                </div>
              </Link>
            </div>
            <div className="relative w-1/3" ref={searchRef}>
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus} // Show suggestions on focus
                  className="w-full bg-opacity-60 border-b border-black px-4 py-2 focus:border-indigo-500 focus:outline-none rounded-lg shadow-sm placeholder-white" // Wider input with bottom border only
                  style={{
                    backgroundColor: "rgba(255, 255, 255,0.3)", // Slightly opaque background (80% opacity)
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

            <div className="relative">
              <div
                className="px-4 py-2"
                onClick={toggleDropdownTwo}
              >
                <img
                  src={iconn}
                  alt="Profile Icon" // Provide an alt text for accessibility
                  className="h-[40px] w-[40px] object-contain " // Adjust size as needed
                />
              </div>
              {isDropdownOpenTwo && (
                <div className="absolute right-0 mt-2 w-35 bg-black  rounded-md shadow-lg p-2">
                  <button
                    onClick={handleHome}
                    className="block w-30 px-4 py-2 text-left text-white hover:bg-gray-800 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Home
                  </button>
                  <button
                    onClick={handleDocs}
                    className="block w-30 px-4 py-2 text-left text-white hover:bg-gray-800 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Documentation
                  </button>
                  <button
                    onClick={handleNews}
                    className="block w-30 px-4 py-2 text-left text-white hover:bg-gray-800 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    News
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                className="text-black text-[18px] border-2 border-white rounded-full bg-white  hover:text-gray-300 hover:z-10 hover:border-2 hover:border-white hover:rounded-full px-4 py-2 transition-transform duration-200 ease-in-out relative"
                onClick={toggleDropdown}
              >
                PROFILE
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-35 bg-black rounded-md shadow-lg p-2">
                  <button
                    onClick={handleProfile}
                    className="block w-30 px-4 py-2 text-left text-white hover:bg-gray-800 hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-30 px-4 py-2 text-left text-white hover:bg-gray-800  hover:scale-105 transform transition duration-200 ease-in-out rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <NotificationIcon />
          </div>
        </nav>
      </header>
    </>
  );
}
