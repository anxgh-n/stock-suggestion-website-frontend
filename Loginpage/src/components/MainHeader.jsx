import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import profileImage from "../Images/profile_pic.png";

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
  };

  const handleLogout = () => {
    navigate("/login");
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
      setFilteredCryptos(filtered.slice(0, 12)); // Limit to 5 results
      setShowSuggestions(true); // Show suggestions as soon as user types
    } else {
      // Reset to initial top 5 suggestions
      setFilteredCryptos(cryptoList.slice(0, 12));
      setShowSuggestions(false); // Hide suggestions if the search is empty
    }
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true); // Show suggestions on focus
  };

  const handleCryptoClick = (id) => {
    navigate(`/crypto/${id}`); // Navigate to the crypto's data page
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
      <header className="shadow mb-2 sticky top-0 z-50 bg-white">
        <nav className="relative flex max-w-screen-xl flex-col overflow-visible px-2 py-4 md:mx-auto md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-3xl font-bold text-gray-800">StockWise</div>
            <div className="relative w-1/3" ref={searchRef}> {/* Attach ref here */}
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus} // Show suggestions on focus
                  className="w-full border-b border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none rounded-lg shadow-sm" // Wider input with bottom border only
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
                      <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
