import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoBellFill } from "react-icons/go";

export default function NotificationIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const BACKEND_URL = "http://localhost:7060/notification/get-notification-by-username";
  const AUTH_TOKEN = sessionStorage.getItem('token'); // Replace with the actual token
  const username = sessionStorage.getItem('username');
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
          const marketStock = marketData.find((coin) => coin.id === stock.stockId.toLowerCase());
          if (marketStock) {
            const currentPrice = marketStock.current_price;
            if (currentPrice > parseFloat(stock.threshold)) {
              addNotification(
                `${stock.stockId} price has exceeded the threshold of $${stock.threshold}! Current price: $${currentPrice}`
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
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    setUnreadCount((prevCount) => prevCount + 1);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length);
  };

  const handleViewAll = () => {
    navigate("/notifications", { state: { notifications } });
  };

  return (
    <div className="relative">
      <button
        className="relative text-gray-600 hover:text-gray-900"
        onClick={toggleDropdown}
      >
        <GoBellFill style={{ fontSize: "35px", color: "#fff" }} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg p-2 z-50">
          {notifications.length > 0 ? (
            <>
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 cursor-pointer rounded-md ${
                    notification.read ? "bg-gray-100" : "bg-blue-50 font-semibold"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.text}
                </div>
              ))}
              <button
                className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md w-full"
                onClick={handleViewAll}
              >
                View All
              </button>
            </>
          ) : (
            <div className="text-gray-500 p-2">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
}
