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

      <section
        className=" text-white py-12 px-6"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-lg shadow-md text-center  hover:shadow-lg transition"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <h3 className="text-4xl font-semibold mb-3">Vision</h3>
            <p>
              "To revolutionize cryptocurrency investing by making it
              accessible, transparent, and understandable for everyone,
              regardless of experience."
            </p>
          </div>
          <div
            className="p-6 rounded-lg shadow-md text-center  hover:shadow-lg transition"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <h3 className="text-4xl font-semibold mb-3">Mission</h3>
            <p>
              "To simplify the crypto investment process through personalized
              guidance, real-time information, and a strong commitment to user
              education, helping investors make confident, informed decisions."
            </p>
          </div>
          <div
            className="p-6 rounded-lg shadow-md text-center  hover:shadow-lg transition"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <h3 className="text-4xl font-semibold mb-3">Core Values</h3>
            <p>
              AthenaChain focuses on 3 main Core Values :{" "}
              <strong className="text-[#c799b4]">Education</strong>, <strong className="text-[#c799b4]">Personalization</strong> and{" "}
              <strong className="text-[#c799b4]">Transparency</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
