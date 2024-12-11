import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  let navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const categoryId = sessionStorage.getItem("categoryId"); // Get categoryId from sessionStorage
  const questionAnswersUrl = `http://localhost:7060/answer/get-questions-with-answers/${username}`;
  const stocksUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"; //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd

  useEffect(() => {
    axios
      .get(questionAnswersUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserAnswers(response.data.questions || []);
      })
      .catch((error) => {
        console.error("Error fetching user answers:", error);
      });

    // Fetch stocks data
    axios
      .get(stocksUrl, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setStocks(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching stocks data:", error);
      });
  }, [questionAnswersUrl]);

  useEffect(() => {
    if (stocks.length > 0 && userAnswers.length > 0) {
      filterStocks();
    }
  }, [stocks, userAnswers]);

  const filterStocks = () => {
    let filtered = stocks;
    userAnswers.forEach((answer) => {
      const { question, chosenAnswer } = answer;

      if (categoryId === "1") {
        // Filtering logic for category 1 (Beginner)
        switch (question) {
          case "What is your preferred price range for buying a cryptocurrency?":
            filtered = filtered.filter((stock) => {
              if (chosenAnswer === "Under $1000") return stock.current_price < 1000;
              if (chosenAnswer === "$1000 - $10000")
                return stock.current_price >= 1000 && stock.current_price <= 10000;
              if (chosenAnswer === "$10000 - $50000")
                return stock.current_price > 10000 && stock.current_price <= 50000;
              if (chosenAnswer === "Above $50000")
                return stock.current_price > 50000;
              return true;
            });
            break;

          case "Do you care about how much a cryptocurrency has changed in the last 24 hours?":
            filtered = filtered.filter((stock) => {
              if (
                chosenAnswer === "Yes, I want a coin that has gone up in value"
              )
                return stock.price_change_percentage_24h > 0;
              if (
                chosenAnswer ===
                "Yes, I want a coin that has gone down in value"
              )
                return stock.price_change_percentage_24h < 0;
              if (chosenAnswer === "No, I prefer stable coins")
                return stock.price_change_percentage_24h >= 0 && stock.price_change_percentage_24h<=5;
              return true;
            });
            break;

          case "Are you looking for a cryptocurrency that has a high trading volume?":
            filtered = filtered.filter((stock) => {
              if (
                chosenAnswer ===
                "Yes, I want high trading volume (for liquidity)"
              )
                return stock.total_volume > 1000000; // Example threshold
              if (chosenAnswer === "No, I’m fine with lower trading volume")
                return stock.total_volume <= 1000000;
              return true;
            });
            break;

          default:
            break;
        }
      } else if (categoryId === "2") {
        // Filtering logic for category 2 (Intermediate)
        switch (question) {
          case "What is your preferred market cap range for cryptocurrencies?":
            filtered = filtered.filter((stock) => {
              if (chosenAnswer === "Small-cap (under $100 billion)")
                return stock.market_cap < 100000000000;
              if (chosenAnswer === "Mid-cap ($100 billion - $200 billion)")
                return (
                  stock.market_cap >= 100000000000 &&
                  stock.market_cap <= 200000000000
                );
              if (chosenAnswer === "Large-cap ($200 billion - $300 billion)")
                return (
                  stock.market_cap > 200000000000 &&
                  stock.market_cap <= 300000000000
                );
              if (chosenAnswer === "Mega-cap (over $300 billion)")
                return stock.market_cap > 300000000000;
              return true;
            });
            break;

          case "Are you interested in cryptocurrencies that have recently hit a new all-time high (ATH)?":
            filtered = filtered.filter((stock) => {
              if (
                chosenAnswer ===
                "Yes, I want assets that are reaching new highs"
              )
                return stock.ath_change_percentage >= 0;
              if (chosenAnswer === "No, I’m looking for undervalued assets") {
                return stock.ath_change_percentage < 0;
              }

              if (chosenAnswer === "I prefer coins that are close to their ATH")
                return Math.abs(stock.ath_change_percentage) <= 5; // Example threshold
              return true;
            });
            break;

          case "How much volatility do you want from your cryptocurrency?":
            filtered = filtered.filter((stock) => {
              if (chosenAnswer === "Low volatility (stable price movements)")
                return Math.abs(stock.price_change_percentage_24h) <= 2;
              if (
                chosenAnswer === "Medium volatility (moderate price movements)"
              )
                return (
                  Math.abs(stock.price_change_percentage_24h) > 2 &&
                  Math.abs(stock.price_change_percentage_24h) <= 10
                );
              if (chosenAnswer === "High volatility (large price swings)")
                return Math.abs(stock.price_change_percentage_24h) > 10;
              return true;
            });
            break;

          default:
            break;
        }
      } else if (categoryId === "3") {
        // Existing filtering logic for category 3
        switch (question) {
          case "How important is the long-term trend of a cryptocurrency's price for your investment?":
            filtered = filtered.filter((stock) => {
              const athChange = stock.ath_change_percentage || 0;
              if (
                chosenAnswer ===
                "I prefer coins that are trending upward long-term"
              )
                return athChange > -10;
              if (
                chosenAnswer ===
                "I’m interested in coins with significant corrections (buying dips)"
              )
                return athChange <= -10;
              if (chosenAnswer === "I prefer to focus on short-term trades")
                return stock.price_change_percentage_24h !== 0;
              return true;
            });
            break;

          case "Are you looking for cryptocurrencies with a strong ROI (return on investment)?":
            filtered = filtered.filter((stock) => {
              const roi = stock.roi?.percentage || 0;
              if (
                chosenAnswer ===
                "Yes, I want coins that have shown high historical ROI"
              )
                return roi > 50;
              if (
                chosenAnswer ===
                "No, I prefer coins with stable returns (minimal fluctuations)"
              )
                return roi <= 50 && roi >= 0;
              return true;
            });
            break;

          case "Do you want cryptocurrencies that have a limited or fixed supply?":
            filtered = filtered.filter((stock) => {
              const maxSupply = stock.max_supply || 0;
              if (
                chosenAnswer === "Yes, I prefer limited or fixed supply coins"
              )
                return maxSupply > 0 && stock.circulating_supply === maxSupply;
              if (
                chosenAnswer ===
                "No, I prefer coins with potentially unlimited supply (e.g., inflationary)"
              )
                return maxSupply === null || maxSupply === 0;
              return true;
            });
            break;

          default:
            break;
        }
      }
    });

    setFilteredStocks(filtered);
  };

  const handleRowClick = (id) => {
    navigate(`/crypto/${id}`); // Navigate to the stock details page
  };

  return (
    <div className="max-w-4xl  mx-20 p-2 bg-gray-300 rounded-lg shadow-lg">
      {filteredStocks.length > 0 ? (
        <ul className="space-y-5">
          {/* Slice the first 3 stocks */}
          {filteredStocks.slice(0, 3).map((stock) => (
            <li
              key={stock.id}
              className="flex items-center space-x-4 bg-gray-300 p-1 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
              onClick={() => handleRowClick(stock.id)}
            >
              <img
                src={stock.image}
                alt={`${stock.name} icon`}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-lg font-medium text-gray-800">{stock.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No stocks match your criteria.</p>
      )}
    </div>
  );
}
