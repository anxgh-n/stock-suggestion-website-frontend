import { useState, useEffect } from "react";
import { GoBellFill } from "react-icons/go";

export default function NotificationIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const BITCOIN_PRICE_THRESHOLD = 100000; // Set your threshold value here

  // Fetch Bitcoin price and monitor changes
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();

        // Find Bitcoin's price
        const bitcoin = data.find((coin) => coin.id === "bitcoin");
        if (bitcoin) {
          const bitcoinPrice = bitcoin.current_price;

          // Check if the price exceeds the threshold
          if (bitcoinPrice > BITCOIN_PRICE_THRESHOLD) {
            addNotification(
              `Bitcoin price has exceeded $${BITCOIN_PRICE_THRESHOLD}! Current price: $${bitcoinPrice}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };

    // Poll the API every 60 seconds
    const interval = setInterval(fetchBitcoinPrice, 60000);

    // Fetch immediately on component mount
    fetchBitcoinPrice();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Add a new notification
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

  return (
    <div className="relative">
      <button
        className="relative text-gray-600 hover:text-gray-900"
        onClick={toggleDropdown}
      >
        {/* Bell Icon */}
        <GoBellFill style={{ fontSize: "35px", color: "black" }} />
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg p-2 z-50">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-2 cursor-pointer rounded-md ${
                  notification.read
                    ? "bg-gray-100"
                    : "bg-blue-50 font-semibold"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                {notification.text}
              </div>
            ))
          ) : (
            <div className="text-gray-500 p-2">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
}
