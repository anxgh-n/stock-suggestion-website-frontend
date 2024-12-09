import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPw({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    useEffect(() => {
        // Disable scrolling when the component is mounted
        document.body.style.overflow = "hidden";
    
        // Re-enable scrolling when the component is unmounted
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);

    try {
      const response = await axios.put("http://localhost:7060/usercredentials/reset-password", {
        username: formData.username,
        newPassword: formData.newPassword,
      });
      toast.success(response.data || "Password reset successful!");
      onClose();
    } catch (error) {
      toast.error("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-0.3 border-2 border-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold text-center text-white mb-4">
          RESET PASSWORD
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none rounded-md text-black"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none rounded-md text-black"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white placeholder-white focus:outline-none rounded-md text-black"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-200"
          >
            Reset Password
          </button>
        </form>
        <button
          className="mt-4 w-full bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ForgotPw;
