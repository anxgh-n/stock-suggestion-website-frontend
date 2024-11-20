import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { GoBookmarkSlashFill, GoBellFill } from "react-icons/go";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [notifiedStocks, setNotifiedStocks] = useState(new Set());
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thresholdValue, setThresholdValue] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const notificationUrl = "http://localhost:7060/notification";
  const API_TOKEN = "CG-y1GGhURGBtELwoPE88Xk7Vvc";
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");

  const stocksUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  useEffect(() => {
    if (!token) {
      setError("Authorization token not found. Please log in.");
      return;
    }

    // Fetch the watchlist data
    fetch(`http://localhost:7060/watchlist/get-watchlist-by-username/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        return response.json();
      })
      .then((data) => setWatchlist(data))
      .catch((error) => setError(error.message));

    // Fetch the stocks data
    axios
      .get(stocksUrl, {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_TOKEN,
        },
      })
      .then((response) => {
        setStocks(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching stocks data:", error);
      });
  }, []);

  useEffect(() => {
    const merged = watchlist.map((watchItem) => {
      const stockData = stocks.find((stock) => stock.id === watchItem.stockId);
      return stockData
        ? {
            ...watchItem,
            name: stockData.name,
            current_price: stockData.current_price,
            market_cap_rank: stockData.market_cap_rank,
            id: stockData.id,
          }
        : watchItem;
    });
    setMergedData(merged);
  }, [watchlist, stocks]);

  const handleDelete = (watchlistId) => {
    fetch(`http://localhost:7060/watchlist/delete-watchlist-by-id/${watchlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item from watchlist");
        }
        setMergedData(mergedData.filter((item) => item.watchlistId !== watchlistId));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setError(error.message);
      });
  };

  const handleOpenModal = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setThresholdValue("");
    setSelectedStock(null);
  };

  const handleSaveThreshold = () => {
    const notification = {
      threshold: thresholdValue,
      stockId: selectedStock.id,
      username: username,
    };
  
    // Check if the notification already exists
    fetch(`${notificationUrl}/get-threshold/${selectedStock.id}/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Parse response as text
        } else {
          throw new Error("Failed to fetch threshold");
        }
      })
      .then((result) => {
        if (result === "Threshold not found") {
            toast.success("Threshold is set successfully");
          // Notification does not exist, call the save endpoint
          return fetch(`${notificationUrl}/save`, {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          // Notification exists, call the update endpoint
          toast.success("Threshold updated successfully");
          return fetch(`${notificationUrl}/update-threshold-by-stockId-and-username/${selectedStock.id}/${username}`, {
            method: "PUT",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save or update notification");
        }
        // Update notified stocks state
        setNotifiedStocks((prev) => new Set([...prev, selectedStock.id]));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error saving/updating notification:", error);
        setError(error.message);
      });
  };
  

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Watchlist</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-6 py-3 border-b-2 border-gray-300">Stock Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Current Price (USD)</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Market Cap Rank</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((item) => (
              <tr key={item.watchlistId} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 border-b border-gray-300">{item.name || "N/A"}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.current_price !== undefined
                    ? `$${item.current_price.toFixed(2)}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.market_cap_rank || "N/A"}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    onClick={() => handleDelete(item.watchlistId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <GoBookmarkSlashFill />
                  </button>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className={`hover:text-gray-900 ${
                      notifiedStocks.has(item.id) ? "text-black" : "text-blue-500"
                    }`}
                  >
                    <GoBellFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              Set Threshold for {selectedStock?.name}
            </h2>
            <input
              type="number"
              value={thresholdValue}
              onChange={(e) => setThresholdValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Enter threshold value"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveThreshold}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
