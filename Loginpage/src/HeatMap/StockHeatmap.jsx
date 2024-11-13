import React, { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";  // Import heatmap.js library

const API_KEY = '8vyKyKlReSMrrEzF7vOv5RwZ7PgkEyLDGBIa1Pns';
const API_URL = `https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,V&api_token=${API_KEY}`;

function StockHeatmap() {
  const [stockData, setStockData] = useState([]);
  const container = useRef(null);

  // Fetch stock data from the API
  const fetchStockData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStockData(data.data);  // Store the 'data' array
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    if (stockData.length === 0 || !container.current) return;

    // Ensure Heatmap.js is available
    if (!h337) {
      console.error("Heatmap.js is not loaded");
      return;
    }

    // Initialize the heatmap only if container is ready
    const heatmapInstance = h337.create({
      container: container.current,
      radius: 20,
      maxOpacity: 0.6,
      minOpacity: 0.1,
      blur: 0.9,
      gradient: {
        0.1: "blue",
        0.5: "yellow",
        1: "red",
      },
    });

    // Map stock data to heatmap data points
    const heatmapPoints = stockData.map((stock, index) => ({
      x: (index + 1) * 50,  // Position stocks horizontally
      y: 100,  // Fixed Y-axis position for simplicity
      value: Math.abs(stock.day_change),  // Use day change as value for heatmap intensity
      symbol: stock.ticker,  // Symbol for labeling or tooltips
    }));

    // Set the heatmap data
    heatmapInstance.setData({
      max: Math.max(...heatmapPoints.map(point => point.value)),  // Maximum value for heatmap intensity
      data: heatmapPoints,  // Set the heatmap data correctly
    });

    // Cleanup the heatmap on unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = '';  // Clean up the heatmap
      }
    };
  }, [stockData]);

  return (
    <div
      className="stock-heatmap-container"
      ref={container}
      style={{ width: "100%", height: "400px", position: "relative" }}
    >
      <div className="stock-heatmap-title">
        <h2>Stock Market Heatmap</h2>
      </div>
      {/* Optional: Display the stock data */}
      <div>
        {stockData.map((stock) => (
          <div key={stock.ticker}>
            {stock.name} ({stock.ticker}): {stock.day_change}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockHeatmap;
