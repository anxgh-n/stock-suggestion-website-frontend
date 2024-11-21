import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import bgImage from "../Images/bgBlackk.png";
import logo from "../Images/athenablock.png";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();

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
        `http://localhost:7060/usercredentials/get-category-by-username/${username}`
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
      const response = await axios.post('http://localhost:7060/usercredentials/validate-user', formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      if (response.data) {
        sessionStorage.setItem('token', response.data);
       // console.log(sessionStorage.getItem("token"));
        // localStorage.setItem('username', formData.username);
        sessionStorage.setItem("username", formData.username);
        console.log(sessionStorage.getItem("username"));
        // console.log(`username is set:${sessionStorage.getItem("username")}`);
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
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Transparent clickable div */}
  
      <div className="p-10 relative">
      <div
      className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[400px] h-[80px]  cursor-pointer"
      onClick={() => navigate("/")}
      title="Go to Home"
      style={{ backgroundColor: "transparent" }} // Ensures it doesn't interfere visually
    ></div>
        <div className="bg-black bg-opacity-50 border-2 border-white rounded-3xl shadow-xl pr-10 pl-10 pt-4 pb-5 w-full max-w-md  ">
        
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
            <div>
              <label className="block text-sm font-bold text-white mb-2 tracking-[0.1rem]">
                PASSWORD
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border-b-2 text-white border-white bg-transparent focus:ring-0 focus:border-blue-500 focus:border-b-2"
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
            <strong>Don't have an account?{" "}</strong>
            <Link
              to="/signup"
              className="text-white font-medium hover:text-gray-300 hover:underline hover:scale-105 transition duration-200"
            >
              Sign Up
            </Link>



          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
