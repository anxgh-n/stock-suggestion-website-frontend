import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-gray-900 px-4 pt-20">
      {/* Logo Section */}
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-900 bg-white p-2">
        {/* <img
          className="h-full object-contain"
          src="/images/logo-circle.png"
          alt="Logo"
        /> */}
      </div>
      
      {/* Navigation Links */}
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <a href="#" className="font-medium text-white">
          Demo
        </a>
        <a href="#" className="font-medium text-white">
          Support
        </a>
        <a href="#" className="font-medium text-white">
          Privacy Policy
        </a>
        <a href="#" className="font-medium text-white">
          Terms & Conditions
        </a>
      </nav>

      {/* Footer Text */}
      <p className="py-10 text-center text-gray-300">
        © 2024 StockWise | All Rights Reserved
      </p>
    </footer>
  );
}
