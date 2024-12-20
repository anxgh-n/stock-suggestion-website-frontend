import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GoBookmarkSlashFill, GoBellFill } from "react-icons/go";
import ProfileHeader from "../components/ProfileHeader";

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

  const stocksUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  useEffect(() => {
    if (!token) {
      setError("Authorization token not found. Please log in.");
      return;
    }

    // Fetch the watchlist data
    fetch(
      `http://localhost:7060/watchlist/get-watchlist-by-username/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
    // Fetch thresholds for each stock in the watchlist
    Promise.all(
      watchlist.map((item) =>
        fetch(
          `${notificationUrl}/get-threshold/${item.stockId}/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch threshold");
            }
            return response.text();
          })
          .then((threshold) => ({
            ...item,
            threshold: threshold === "Threshold not found" ? null : threshold,
          }))
          .catch((error) => {
            console.error("Error fetching threshold:", error);
            return { ...item, threshold: null };
          })
      )
    )
      .then((watchlistWithThresholds) => {
        const merged = watchlistWithThresholds.map((watchItem) => {
          const stockData = stocks.find(
            (stock) => stock.id === watchItem.stockId
          );
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
      })
      .catch((error) => {
        console.error("Error merging data:", error);
        setError(error.message);
      });
  }, [watchlist, stocks]);

  const handleDelete = (watchlistId) => {
    fetch(
      `http://localhost:7060/watchlist/delete-watchlist-by-id/${watchlistId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item from watchlist");
        }
  
        setMergedData(
          mergedData.filter((item) => item.watchlistId !== watchlistId)
        );
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

    fetch(`${notificationUrl}/get-threshold/${selectedStock.id}/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to fetch threshold");
        }
      })
      .then((result) => {
        if (result === "Threshold not found") {
          toast.success("Threshold is set successfully");
          return fetch(`${notificationUrl}/save`, {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          toast.success("Threshold updated successfully");
          return fetch(
            `${notificationUrl}/update-threshold-by-stockId-and-username/${selectedStock.id}/${username}`,
            {
              method: "PUT",
              body: JSON.stringify(notification),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save or update notification");
        }

        // Update threshold in the table
        setMergedData((prevData) =>
          prevData.map((item) =>
            item.id === selectedStock.id
              ? { ...item, threshold: thresholdValue }
              : item
          )
        );

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
    <>
      <div className="flex flex-col items-center min-h-screen bg-white-100 py-10 px-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Your Watchlist</h1>

        {/* Display "No coins in the watchlist" if the watchlist is empty */}
        {watchlist.length === 0 ? (
          <p className="text-lg font-semibold text-gray-600">No coins in the watchlist.</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-6xl">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Stock Name</th>
                  <th className="px-6 py-3 text-left">Current Price (USD)</th>
                  <th className="px-6 py-3 text-left">Market Cap Rank</th>
                  <th className="px-6 py-3 text-left">Threshold</th>
                  <th className="px-6 py-3 text-center"></th>
                  <th className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((item) => (
                  <tr
                    key={item.watchlistId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 border-b border-gray-300">
                      {item.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {item.current_price !== undefined
                        ? `$${item.current_price.toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {item.market_cap_rank || "N/A"}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {item.threshold || "No Threshold Set"}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-center">
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(item.watchlistId)}
                      >
                        <GoBookmarkSlashFill className="inline-block" />
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-center">
                      <button
                        className="text-blue-600"
                        onClick={() => handleOpenModal(item)}
                      >
                        <GoBellFill className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Set Threshold for {selectedStock?.name}
              </h2>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter Threshold Value"
                value={thresholdValue}
                onChange={(e) => setThresholdValue(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSaveThreshold}
                >
                  Save Threshold
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
