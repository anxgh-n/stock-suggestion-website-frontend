import React from "react";
import hmabImage from "../Images/homeaboutBg.png";
import logoImage from "../Images/athenablock.png"; // Import the logo image
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${hmabImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <div className=" flex flex-col items-center justify-center text-white bg-transparent bg-opacity-60 pt-10 pb-10">
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Our Vision, Mission and Core Values
        </h1>
        
      </div>

      <div className="w-full border-t-2 border-gray-600"></div>


      {/* Beginner Resources Section */}
      <section className="bg-transparent text-white py-12 px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className=" p-6 rounded-lg max-w-md shadow-md text-center hover:shadow-lg transition transform hover:scale-105 " style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-4xl font-semibold mb-3">Vision</h3>
            <p>
            "To revolutionize cryptocurrency investing by making it accessible, transparent, and understandable for everyone, regardless of experience."</p>
            
          </div>
          <div className=" p-6 rounded-lg max-w-md shadow-md text-center hover:shadow-lg transition transform hover:scale-105 " style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-4xl font-semibold mb-3">Mission</h3>
            <p>"To simplify the crypto investment process through personalized guidance, real-time information, and a strong commitment to user education, helping investors make confident, informed decisions."</p>
          </div>
          <div className=" p-6 pr-10 pl-10 rounded-lg max-w-md text-center shadow-md hover:shadow-lg transition transform hover:scale-105" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h3 className="text-4xl font-semibold mb-3">Core Values</h3>
            <ul className="list-disc list-inside text-left inline-block">
        <li>Education</li>
        <li>Personalization</li>
        <li>Transparency</li>
        <li>Simplicity</li>
        <li>Security</li>
        <li>Innovation</li>
      </ul>
          </div>
        </div>
        
      </section>
    </div>
  );
}
