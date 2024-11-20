import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NotificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(location.state?.notifications || []);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border rounded-md ${
                notification.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <p>{notification.text}</p>
              <div className="mt-2 space-x-2">
                {!notification.read && (
                  <button
                    className="bg-green-900 text-white py-1 px-2 rounded-md"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="bg-indigo-500 text-white py-1 px-2 rounded-md"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
}
