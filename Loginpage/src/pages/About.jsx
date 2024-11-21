import React from "react";
import hmabImage from "../Images/homeaboutBg.png";

export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${hmabImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Content Area */}
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold mb-6">Welcome to Home</h1>
        <p className="text-lg mb-4">
          This is the content area. As you scroll, only this content changes.
        </p>
        <p className="text-lg">
          Scroll to see more content while the background stays static.
        </p>
      </div>
    </div>
  );
}
