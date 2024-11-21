import React from "react";
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

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

      {/* Footer Heading */}
      

      {/* Main Footer Content: Flex layout to divide into left and right sections */}
      <div className="flex justify-between text-gray-300">
        {/* Left Section: Quick Links */}
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-lg font-bold text-white">Quick Links</h3>
          <nav className="flex flex-col gap-1">
            <a href="#" className="font-medium text-white hover:text-sky-500">
              Home
            </a>
            <a href="#" className="font-medium text-white hover:text-sky-500">
              About
            </a>
          </nav>
        </div>
        <h2 className="text-center text-white text-xl font-bold mb-6">
        Athena Chain
      </h2>

        {/* Right Section: Contact Us */}
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-lg font-bold text-white">Contact Us</h3>
          <p>Phone: +1 234 567 890</p>
          <p>Email: athenachain8@gmail.com</p>
        </div>
      </div>

      {/* Social Media Icons: Centered and aligned horizontally */}
      <div className="mt-6 flex justify-center gap-6 text-gray-300">
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

      {/* Footer Text */}
      <p className="py-6 text-center text-gray-300">
        © 2024 Athena Chain | All Rights Reserved
      </p>
    </footer>
  );
}
