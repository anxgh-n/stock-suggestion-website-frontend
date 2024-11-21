import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import upp from "../Images/upwardb.png";
import downn from "../Images/downwardb.png";
import axios from "axios";
import toast from "react-hot-toast";
import hmabImage from "../Images/homeaboutBg.png";

function CryptoData() {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [timeRange, setTimeRange] = useState("7D");
  const [exchangeData, setExchangeData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCartClick = async () => {
    const username = sessionStorage.getItem("username");
    const payload = {
      username: username,
      stockId: cryptoData.id, // Replace with the actual stock ID
    };

    try {
      // Fetch the user's existing watchlist
      const watchlistResponse = await axios.get(
        `http://localhost:7060/watchlist/get-watchlist-by-username/${username}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const watchlist = watchlistResponse.data;

      // Check if the stock is already in the watchlist
      const isStockInWatchlist = watchlist.some(
        (item) => item.stockId === cryptoData.id
      );

      if (isStockInWatchlist) {
        toast.error("This stock is already in your watchlist");
        console.log("Stock is already in the watchlist:", cryptoData.id);
        return; // Exit the function
      }

      // Stock is not in the watchlist, proceed to add it
      const response = await axios.post(
        `http://localhost:7060/watchlist/save`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setIsAdded(true); // Update the state
      toast.success("Added to watchlist");
      console.log("Response from server:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error handling watchlist:", error);
      toast.error("An error occurred while updating the watchlist");
    }
  };

  const handleTimeRangeClick = async (range) => {
    setTimeRange(range);
    await fetchChartData(range);
  };

  const fetchChartData = async (range) => {
    try {
      const chartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
      );
      const chartData = await chartResponse.json();
      const transformedChartData = chartData.prices.map(
        ([timestamp, price]) => ({
          x: new Date(timestamp).toISOString(),
          y: price,
        })
      );
      setChartData(transformedChartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const fetchExchangeData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/exchanges",
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-y1GGhURGBtELwoPE88Xk7Vvc",
          },
        }
      );
      const data = await response.json();
      setExchangeData(data); // Store exchange data
    } catch (error) {
      console.error("Error fetching exchange data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cryptocurrency details
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
        );
        const data = await response.json();
        setCryptoData(data[0]);

        // Fetch initial chart data
        await fetchChartData(timeRange);
        const watchlistResponse = await axios.get(
          `http://localhost:7060/watchlist/get-watchlist-by-username/${username}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const watchlist = watchlistResponse.data;

        // Check if the current stockId is in the watchlist
        const isStockInWatchlist = watchlist.some(
          (item) => item.stockId === id
        );

        // Set isAdded state if stock is in the watchlist
        setIsAdded(isStockInWatchlist);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    fetchExchangeData();
  }, [id, timeRange]);

  if (loading) return <div>Loading...</div>;
  if (!cryptoData) return <div>Data not available</div>;

  const chartOptions = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
      background: "#ffffff",
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy, HH:mm", // Show hours:minutes for "1D", otherwise show full date
      },
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 2 },
    grid: { show: false, strokeDashArray: 4 },
    series: [
      {
        name: `${cryptoData.name} Price (USD)`,
        data: chartData,
        color: "#1A56DB",
      },
    ],
    xaxis: {
      type: "datetime",
      labels: { show: true, style: { colors: "#000000" } },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toFixed(2)}`,
        style: { colors: "#000000" },
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${hmabImage})`,
        backgroundAttachment: "fixed",
      }}
    >
    <div className="flex flex-col m-3 space-y-5 bg-transparent" >
      <div className="flex space-x-5">
        {/* Left Card Section */}
        <div className="relative w-full sm:w-[50%] md:w-[30%] flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
  <div className="relative mx-3 mt-3">
    <div className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
      Last Updated:{" "}
      {new Date(cryptoData.last_updated).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}{" "}
      {new Date(cryptoData.last_updated)
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
        .toLowerCase()}
    </div>
    <Link className="flex h-32 overflow-hidden rounded-xl mt-10" to="#">
      <img
        src={cryptoData.image}
        alt={cryptoData.name}
        className={`w-24 h-24 mx-auto mb-4 rounded-full transform transition-all ${
          hovered ? "scale-125" : "scale-100"
        }`}
      />
    </Link>
  </div>

  <div className="mt-4 px-5 pb-4"> {/* Reduced padding here */}
    <a href="#">
      <h5 className="text-xl font-bold tracking-tight text-slate-900">
        <span className="text-[30px]">{cryptoData.name}</span> (
        {cryptoData.symbol.toUpperCase()}){" "}
        <span className="text-black border-black bg-white ">
          #{cryptoData.market_cap_rank}
        </span>
      </h5>
    </a>
    <div className="mt-2 mb-4 flex items-center justify-between"> {/* Reduced bottom margin */}
      <p className="flex justify-between w-full">
        <span className="text-[30px] font-bold text-black">
          {cryptoData.current_price}
        </span>
        <span
          className={`text-medium font-bold ${
            cryptoData.price_change_percentage_24h > 0
              ? "text-[#75FB4C]"
              : "text-red-500"
          }`}
        >
          <img
            src={
              cryptoData.price_change_percentage_24h > 0 ? upp : downn
            }
            alt={
              cryptoData.price_change_percentage_24h > 0
                ? "upward"
                : "downward"
            }
            className="inline-block ml-2 w-8 h-8"
          />
          {cryptoData.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
    </div>

    {/* Additional Information */}
    <div className="mt-2 grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <strong className="text-slate-900 relative group">
          Market Cap:
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
            The total market value of the cryptocurrency, calculated by
            multiplying the price by the circulating supply.
          </span>
        </strong>
        <span className="text-black">${cryptoData.market_cap}</span>
      </div>

      <div className="flex flex-col">
        <strong className="text-slate-900 relative group">
          Valuation:
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
            The total value of a cryptocurrency at its maximum potential
            supply.
          </span>
        </strong>
        <span className="text-black">${cryptoData.fully_diluted_valuation}</span>
      </div>

      <div className="flex flex-col">
        <strong className="text-slate-900 relative group">
          Volume (24h):
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
            The total trading volume of the cryptocurrency in the past
            24 hours.
          </span>
        </strong>
        <span className="text-black">${cryptoData.total_volume}</span>
      </div>

      <div className="flex flex-col">
        <strong className="text-black relative group">
          High (24h):
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-black bg-gray-200 rounded-md px-2 py-1 font-normal">
            The highest price the cryptocurrency has reached in the last
            24 hours.
          </span>
        </strong>
        <span className="text-black">${cryptoData.high_24h}</span>
      </div>

      <div className="flex flex-col">
        <strong className="text-slate-900 relative group">
          Low (24h):
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
            The lowest price the cryptocurrency has reached in the last
            24 hours.
          </span>
        </strong>
        <span className="text-black">${cryptoData.low_24h}</span>
      </div>
      <div className="flex flex-col">
        <strong className="text-slate-900 relative group">
          Max Supply:
          <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
            The maximum number of coins or tokens that will ever exist
            for this cryptocurrency.
          </span>
        </strong>
        <span className="text-black">{cryptoData.max_supply}</span>
      </div>
    </div>

    {/* Button for adding to cart */}
    <button
      onClick={handleCartClick}
      className={`absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-md p-0 text-white`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 stroke-black"
        fill={isAdded ? "black" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v16l7-6 7 6V3H5z"
        />
      </svg>
    </button>
  </div>
</div>


        {/* Time Range Buttons */}

        {/* Chart Section */}
        <div className="relative w-full sm:w-[50%] md:w-[75%] bg-white rounded-lg border  border-gray-100 shadow-md">
          <div className="p-4 ">
            <div className="mt-4">
              <ReactApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                height={440}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CryptoData;
