import { useState, useEffect } from "react";
import '../CSS/ticker.css'; 

import upp from '../Images/upward.png';
import downn from '../Images/downward.png';

export default function TickerHeader() {
  const [cryptos, setCryptos] = useState([]);

  // Fetch cryptocurrency data
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1y"
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <header className="shadow-none mb-0 top-0 z-50 bg-black p-2">
      <nav className="relative flex w-full flex-col overflow-hidden">
        <div className="flex items-center w-full">
          <div className="tickername text-1xl font-light text-white overflow-hidden whitespace-nowrap w-full">
            <h6 className="ticker-scroll" >
              {/* Displaying each symbol and price change percentage */}
              {cryptos.map((crypto, index) => {
                const isNegative = crypto.price_change_percentage_24h < 0;
                return (
                  <span key={crypto.id} className="inline-flex items-center">
                    <span className="px-1" ><strong>{crypto.symbol.toUpperCase()}</strong></span>
                    <img
                      src={isNegative ? downn : upp}
                      alt={isNegative ? "Downward" : "Upward"}
                      className="w-4 h-4 mx-2" // Adjust size and spacing
                    />
                    <span><strong className="">{crypto.price_change_percentage_24h.toFixed(2)}%</strong></span>
                    {/* Equidistant "•" */}
                    {index < cryptos.length - 1 && (
                      <span className="mx-4 text-gray-400">•</span> // Add consistent margin
                    )}
                  </span>
                );
              })}
            </h6>
          </div>
        </div>
      </nav>
    </header>
  );
}
