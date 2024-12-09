import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoBellFill } from "react-icons/go";

export default function NotificationIcon() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const BACKEND_URL =
    "http://localhost:7060/notification/get-notification-by-username";
  const AUTH_TOKEN = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/${username}`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });
        const stockList = await response.json();

        const coinGeckoResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const marketData = await coinGeckoResponse.json();

        stockList.forEach((stock) => {
          const marketStock = marketData.find(
            (coin) => coin.id === stock.stockId.toLowerCase()
          );
          if (marketStock) {
            const currentPrice = marketStock.current_price;
            console.log(`currentPrice is ${currentPrice}`);
            if (currentPrice < parseFloat(stock.threshold)) {
              addNotification(
                ` ${marketStock.name} price has exceeded the threshold of $${stock.threshold}! Current price: $${currentPrice}`
              );
            }
          }
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const interval = setInterval(fetchStockData, 60000);
    fetchStockData();

    return () => clearInterval(interval);
  }, []);

  const addNotification = (text) => {
    const newNotification = { id: Date.now(), text, read: false };
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
    setUnreadCount((prevCount) => prevCount + 1);
  };

  const handleBellClick = () => {
    // Reset unread count when navigating
    setUnreadCount(0);
    // Navigate directly to the notifications page
    navigate("/notifications", { state: { notifications } });
  };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <button
        className="relative text-gray-600 hover:text-gray-900"
        onClick={handleBellClick}
      >
        <GoBellFill className="text-white text-[35px]" />
        {/* Display notification count on top of the bell icon */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
