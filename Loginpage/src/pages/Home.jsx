import { LogOut } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  
  return (
    <>

      {/* Main Section */}
      <section
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -mt-12"
  style={{
    background: "radial-gradient(889px at 100.2% 3%, rgb(255, 255, 255) 31.1%, rgb(46, 76, 105) 36.4%, rgb(116, 196, 212) 50.9%, rgb(42, 23, 156) 60.7%, rgb(161, 194, 230) 72.5%, rgb(255,255,255) 72.6%)",
  }}
>
  <div className="container mx-auto flex flex-col items-center justify-center text-center py-9">
    <h2 className="text-4xl font-extrabold sm:text-6xl from-pink-500 to-indigo-500">StockWise</h2>
    <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-2xl font-medium text-transparent sm:text-3xl mt-4">
      Welcome to StockWise, where smart investing meets personalization.
    </p>
  </div>
</section>

    </>
  );
}
