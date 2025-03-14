import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import hmabImage from "../Images/homeaboutBg.png";

export default function Welcome() {
  let navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [questionnaireStatus, setQuestionnaireStatus] = useState(false); // Track questionnaire status
  const [loadingStatus, setLoadingStatus] = useState(true); // Handle loading state
  const [showFilter, setShowFilter] = useState(false); // Manage filter visibility

  const API_URL = "https://api.coingecko.com/api/v3/search/trending"; // CoinGecko API 
  const username = sessionStorage.getItem("username"); // Replace with the actual username or fetch dynamically
  const BACKEND_URL = `http://localhost:7060/usercredentials/get-questionnaire-status/${username}`; // Backend API
  const API_TOKEN = "CG-y1GGhURGBtELwoPE88Xk7Vvc";

  // Fetch trending coins from the CoinGecko API
  const fetchTrendingCoins = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get(API_URL, {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_TOKEN,
        },
      });

      const coins = response.data.coins.map((coin) => ({
        thumb: coin.item.thumb,
        symbol: coin.item.symbol,
        name: coin.item.name,
        rank: coin.item.market_cap_rank,
        id: coin.item.id,
      }));
      setStocks(coins);
    } catch (err) {
      setError("No trending coins found.");
    }
  };

  // Fetch questionnaire status from the backend
  const fetchQuestionnaireStatus = async () => {
    try {
      const response = await axios.get(BACKEND_URL, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setQuestionnaireStatus(response.data); // Directly set the boolean value
    } catch (err) {
    } finally {
      setLoadingStatus(false); // Stop loading once request completes
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    fetchQuestionnaireStatus();
  }, []);

  const handleQuestionnaireButton = () => {
    navigate("/questionaire");
  };

  const handleFilterButton = () => {
    setShowFilter((prevState) => !prevState); // Toggle the visibility of the Filter component
  };

  const handleRowClick = (id) => {
    navigate(`/crypto/${id}`); // Navigate to the stock details page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${hmabImage})`,
      }}
    >
      <section className="bg-transparent min-h-screen p-6">
        <div className="container mx-auto flex flex-col md:flex-row items-start space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-7/12 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-4">
              {questionnaireStatus ? "Trending Coins" : "Trending coins"}
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : stocks.length === 0 ? (
              <p className="text-gray-500">Loading data...</p>
            ) : (
              <table className="w-full text-left shadow-lg border-white border-2 overflow-hidden rounded-[20px]">
                <thead className="text-black uppercase text-sm rounded-t-lg bg-[rgba(255,255,255,0.8)] ">
                  <tr>
                    <th className="px-4 py-3">Icon</th>
                    <th className="px-4 py-3">Ticker</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.slice(0, 5).map((stock, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-black" : "bg-[#1b1b1c]"
                      } hover:bg-[#520231] transition-colors cursor-pointer`}
                      onClick={() => handleRowClick(stock.id)} // Add click event
                    >
                      <td className="px-4 py-3">
                        <img
                          src={stock.thumb}
                          alt={`${stock.name} icon`}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-4 py-3 text-white">{stock.symbol}</td>
                      <td className="px-4 py-3 text-white font-medium">
                        {stock.name}
                      </td>
                      <td className="px-4 py-3 text-white">{stock.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Right Section */}
          <div className="w-[40%] md:w-[40%] flex flex-col space-y-6">
            {!loadingStatus && (
              <>
                {questionnaireStatus ? (
                  <div className="bg-gray-400 border-gray-300 p-6 rounded-lg mx-20 w-100">
                    <h2 className="text-2xl font-bold text-pink-900 mb-4 font-[cursive]">
                      Filtered Coins
                    </h2>
                    <p className="text-pink-700">
                      Questionnaire filled successfully.
                    </p>
                    <p className="text-pink-700">
                      {" "}
                      Filtered coins displayed below.
                    </p>
                    <button
                      onClick={handleFilterButton}
                      className="rounded-md border-2 mt-4 border-pink-900 px-6 py-2 font-medium font-[revert-layer] text-pink-900 transition-colors hover:bg-pink-900 hover:text-white"
                    >
                      {showFilter
                        ? "Hide Filtered Coins"
                        : "View Filtered Coins"}
                    </button>
                  </div>
                ) : (
                  <div className="p-6 mx-20 rounded-lg bg-[rgba(255,255,255,0.8)] ">
                    <h2 className="text-2xl font-bold text-[#992366] mb-4">
                      Fill Questionnaire
                    </h2>
                    <p className="text-[#a84c80] mb-6">
                      Fill the questionnaire to explore more coin options
                      tailored to your interests.
                    </p>
                    <button
                      onClick={handleQuestionnaireButton}
                      className="rounded-md border-2 border-[#992366] px-6 py-2 font-medium text-[#992366] transition-colors hover:bg-[#992366] hover:text-white"
                    >
                      Fill Questionnaire
                    </button>
                  </div>
                )}
              </>
            )}
            {/* Filter Section Below */}
            {showFilter && <Filter />}{" "}
            {/* Conditionally render Filter component below */}
          </div>
        </div>
      </section>
    </div>
  );
}
