import React from "react";
import hmabImage from "../Images/homeaboutBg.png";
import logoImage from "../Images/athenablock.png"; // Import the logo image
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${hmabImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <div className=" flex flex-col items-center justify-center text-white bg-transparent bg-opacity-60 pt-10 pb-20">
        {/* Logo Section */}
        <img src={logoImage} alt="Logo" className="mb-4 w-32 md:w-40" /> {/* Logo above the title */}
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Simplify Your Crypto Journey
        </h1>
        <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">
          Discover the best cryptocurrencies, tailored to your preferences, and
          make informed investment decisions with ease.
        </p>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-[#821b57] hover:bg-[#4f0d33] text-white font-semibold py-3 px-8 rounded-full">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-600"></div>

      {/* Features Section */}
      <section className=" text-white py-12 px-6"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Trending Cryptocurrencies</h3>
            <p>Stay updated with the Top Trending Cryptocurrencies.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
            <p>Try out our personalized questionnaire and get crypto suggestions tailored to your investment goals.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
            <p>Learn about crypto investing with beginner-friendly our documentation which is available on successful <Link to="/login"> <span className="text-blue-500">SignIn</span> </Link>.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">News Updates</h3>
            <p>Get  news updates to stay informed on market trends.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Watchlist & Notifications</h3>
            <p>Track your favorite coins and receive real-time alerts.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
            <p>Your data is protected with JWT-based secure authentication.</p>
          </div>
        </div>
      </section>

      {/* Beginner Resources Section */}
      <section className="bg-transparent text-white py-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Not Sure What we Offer?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className=" p-6 rounded-lg max-w-md shadow-md hover:shadow-lg transition " style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Our Goals</h3>
            <p>Start your crypto journey by knowing what we stand for by going through our <Link to="/about"> <span className="text-blue-500">About Page</span> </Link> .</p>
          </div>
          <div className=" p-6 rounded-lg max-w-md shadow-md hover:shadow-lg transition " style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-xl font-semibold mb-3">Take our quick Questionnaire</h3>
            <p>Take up the short Quiz from our Homepage after  <Link to="/login"> <span className="text-blue-500">Signing In</span> </Link> .</p>
          </div>
        </div>
        
      </section>
    </div>
  );
}
