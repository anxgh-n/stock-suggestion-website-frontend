import { LogOut } from "lucide-react";
import axios from "axios";

export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full py-4 bg-transparent z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold text-gray-800">
            <img src="./Images/text.png" alt="" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              Home
            </a>
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              About
            </a>
            <a href="#" className="text-indigo-900 hover:text-pink-800">
              Contacts
            </a>
          </div>
          <div className="flex space-x-4">
            <button className="text-pink-600 rounded-full px-4 py-2">
              Login
            </button>
            <button className="bg-pink-600 text-white rounded-full px-4 py-2">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1051313070/photo/abstract-blur-beautiful-pink-color-pastel-tone-background-with-double-exposure-of-bokeh-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=aUUinpnISirSqeQJRwzUG5qMNg5cXnztUWiDh4M1fxU=')",
        }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-6xl">
            StockWise
          </h2>
          <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-2xl font-medium text-transparent sm:text-3xl mt-4">
            Welcome to StockWise, where smart investing meets personalization.
          </p>
        </div>
      </section>
    </>
  );
}
