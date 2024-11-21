import React from "react";
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import logo from "../Images/athenablock.png"; // Ensure to import your logo here

export default function Footer() {
  return (
    <footer className="bg-[#17010e] px-8 pt-2 pb-6 text-gray-300">
      <div className="flex flex-wrap justify-between">
        {/* Left Column: Logo, Title, and Social Media Icons */}
        <div className="flex flex-col items-start gap-4 w-full md:w-1/3">
          {/* Logo */}
          <img
            src={logo}
            alt="AthenaChain Logo"
            className="h-[100px] w-[70px] overflow-visible transition-transform transform hover:scale-150 hover:translate-y-[10%]"
            style={{
              transition: "transform 0.5s ease-out",
            }}
          />
          {/* Title */}
          <h2 className="text-xl font-bold text-white">AthenaChain</h2>
          {/* Social Media Icons */}
          <div className="mt-4 flex gap-6">
            <a href="mailto:contact@athenachain.com" className="text-2xl hover:text-white">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="flex flex-col items-start gap-2 w-full md:w-1/3 pt-4">
          <h3 className="text-2xl font-bold text-[#ebd1e0]">Quick Links</h3>
          <nav className="flex flex-col gap-1">
            <a href="/" className="font-medium text-white hover:text-[#ebd1e0]">
              Home
            </a>
            <a href="/about" className="font-medium text-white hover:[#ebd1e0]">
              About
            </a>
          </nav>
        </div>

        {/* Right Column: Contact Us */}
        <div className="flex flex-col items-start gap-2 w-full md:w-1/3 pt-4">
          <h3 className="text-2xl font-bold text-[#ebd1e0]">Contact Us</h3>
          <p>Phone: +1 234 567 890</p>
          <p>Email: athenachain8@gmail.com</p>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-1 text-center text-gray-300">
        © 2024 AthenaChain | All Rights Reserved
      </p>
    </footer>
  );
}
