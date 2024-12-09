import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import bgImage from "../Images/bgBlackk.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ForgotPw from "./ForgotPw";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.body.style.overflow = isForgotPasswordModalOpen
      ? "hidden"
      : "auto";
  }, [isForgotPasswordModalOpen]);

  const handleForgotPasswordToggle = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  };

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchCategoryByUsername = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:7060/usercredentials/get-category-by-username/${username}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && response.data.category) {
        const categoryId = response.data.category.categoryId;
        sessionStorage.setItem("categoryId", categoryId);
        console.log("CategoryId set in sessionStorage:", categoryId);
      } else {
        console.error("No category data found for the user.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7060/usercredentials/validate-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        sessionStorage.setItem("token", response.data);
        sessionStorage.setItem("username", formData.username);
        console.log(sessionStorage.getItem("username"));
        setToken(response.data);
        setUsername(formData.username);

        await fetchCategoryByUsername(formData.username);
        toast.success("Login successful!");
        navigate("/welcome");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Transparent clickable div */}

        <div className="p-10 relative">
          <div
            className="absolute bg-transparent top-[-50px] left-1/2 transform -translate-x-1/2 w-[400px] h-[80px]  cursor-pointer"
            onClick={() => navigate("/")}
            title="Go to Home" // Ensures it doesn't interfere visually
          ></div>
          <div className="bg-black bg-opacity-50 border-2 mt-10 border-white rounded-3xl shadow-xl pr-10 pl-10 pt-4 pb-5 w-full max-w-md  ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-b-2 text-white border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-white tracking-[0.1rem]">
                    PASSWORD
                  </label>
                  <span
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="text-white text-base" />
                    ) : (
                      <AiFillEye className="text-white text-base" />
                    )}
                  </span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 mt-2 border-b-2 text-white border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-black py-2 px-4 rounded-md bg-white hover:bg-black hover:text-white transition duration-200 hover:scale-105"
              >
                <strong>Sign In</strong>
              </button>
            </form>
            <p className="mt-6 text-center text-white">
              <strong>Don't have an account? </strong>
              <Link
                to="/signup"
                className="text-white font-medium hover:text-gray-300 hover:underline hover:scale-105 transition duration-200"
              >
                Sign Up
              </Link>
            </p>
            <p
              className="mt-2 text-center text-gray-300 hover:text-white cursor-pointer hover:underline"
              onClick={handleForgotPasswordToggle}
            >
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
      {isForgotPasswordModalOpen && (
        <ForgotPw onClose={handleForgotPasswordToggle} />
      )}
    </>
  );
}

export default Login;
