import { useState, useEffect } from "react";

export default function TickerHeader() {
  const [tickers, setTickers] = useState([]); // State to hold ticker data
  const apiUrl = "https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,MSFT&api_token=8vyKyKlReSMrrEzF7vOv5RwZ7PgkEyLDGBIa1Pns";

  useEffect(() => {
    // Fetch stock ticker data from the API
    const fetchTickerData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Extract the ticker names from the API response
        const tickerNames = data.data.map(item => item.symbol); 
        setTickers(tickerNames); // Store the ticker names in state
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    fetchTickerData(); // Call the function to fetch data when component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <header className="shadow-none mb-0 sticky top-0 z-50 bg-black">
        <nav className="relative flex max-w-screen-xl flex-col overflow-visible px-2 py-0.2 md:mx-auto md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="tickername text-1xl font-light text-white">
              {/* Join the ticker names and display them */}
              {tickers.length > 0 ? tickers.join(", ") : "Loading tickers..."}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
