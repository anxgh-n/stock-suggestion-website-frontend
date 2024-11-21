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
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black bg-opacity-60 pt-0">
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded">
              Get Started
            </button>
          </Link>
          <button className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-6 rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-900 text-white py-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Trending Cryptocurrencies</h3>
            <p>Stay updated with the top 3 trending cryptocurrencies.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
            <p>Get crypto suggestions tailored to your investment goals.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
            <p>Learn about crypto investing with beginner-friendly docs and FAQs.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Live News Updates</h3>
            <p>Get daily news updates to stay informed on market trends.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Watchlist & Notifications</h3>
            <p>Track your favorite coins and receive real-time alerts.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
            <p>Your data is protected with JWT-based secure authentication.</p>
          </div>
        </div>
      </section>

      {/* Beginner Resources Section */}
      <section className="bg-gray-800 text-white py-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Resources for Beginners
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="bg-gray-700 p-6 rounded-lg max-w-md shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">FAQs</h3>
            <p>Find answers to common questions about cryptocurrency.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg max-w-md shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Glossary</h3>
            <p>Understand crypto terms like blockchain, tokens, and wallets.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg max-w-md shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Beginner’s Guide</h3>
            <p>Start your crypto journey with simple, step-by-step tutorials.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-12 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Not Sure Where to Start?
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Take our quick questionnaire to find the right cryptocurrencies for
          you.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded">
          Take the Questionnaire
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-6 text-center">
        <p>© 2024 CryptoInvest. All rights reserved.</p>
      </footer>
    </div>
  );
}
