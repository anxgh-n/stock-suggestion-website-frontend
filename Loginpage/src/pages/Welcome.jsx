import { LogOut } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import TradingViewWidget from "../HeatMap/TradingViewWidget";

export default function Welcome() {
  return (
    <>
      <section
        
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-center py-9">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-6xl">Welcome!</h2>
          <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-2xl font-medium text-transparent sm:text-3xl mt-4">
            Welcome to StockWise, where smart investing meets personalization.
          </p>
          
          {/* Stock heatmap widget */}
          <div className="flex flex-col md:flex-row mt-10 w-full">
            {/* Stock heatmap widget taking 70% */}
            <div className="heatmap w-full md:w-7/10 h-96">
              <TradingViewWidget />
            </div>

            {/* Questionn section taking 30% */}
            <div className="questionn w-full md:w-3/10 h-96 bg-gray-200">
              {/* Content for questionn */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
