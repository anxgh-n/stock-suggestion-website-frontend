import { LogOut } from "lucide-react";
import axios from "axios";
//import textImage from './Images/text2.png'; // adjust the path according to the folder structure
//import logoImage from './Images/preview2.png';
export default function Home() {
  return (
    <>

      {/* Main Section */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -mt-12"
        // style={{
        //   backgroundImage:
        //     "url('https://media.istockphoto.com/id/1051313070/photo/abstract-blur-beautiful-pink-color-pastel-tone-background-with-double-exposure-of-bokeh-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=aUUinpnISirSqeQJRwzUG5qMNg5cXnztUWiDh4M1fxU=')",
        // }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-center py-9">
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
