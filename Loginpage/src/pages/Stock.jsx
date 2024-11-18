import React from "react";

export default function Navbar() {
  return (
    <nav
      className="w-full py-4 px-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-800">StockWise</div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="/"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
