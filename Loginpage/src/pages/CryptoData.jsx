import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import upp from "../Images/upwardb.png";
import downn from "../Images/downwardb.png";

function CryptoData() {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [timeRange, setTimeRange] = useState("1Y");
  
  const descriptionContent =
    "This is the description content about the selected cryptocurrency.";
  const relatedNewsContent = "This is where related news will be displayed.";

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCartClick = () => {
    setIsAdded((prev) => !prev);
  };

  const handleTimeRangeClick = async (range) => {
    setTimeRange(range);
    await fetchChartData(range);
  };

  const fetchChartData = async (range) => {
    const days = {
      "1D": 1,
      "7D": 7,
      "30D": 30,
      "1Y": 365,
    };
    try {
      const chartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days[range]}`
      );
      const chartData = await chartResponse.json();
      const transformedChartData = chartData.prices.map(([timestamp, price]) => ({
        x: new Date(timestamp).toISOString(),
        y: price,
      }));
      setChartData(transformedChartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
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
    },
    tooltip: {
      enabled: true,
      x: {
        format: timeRange === "1D" ? "HH:mm" : "dd MMM yyyy", // Show hours:minutes for "1D", otherwise show full date
      },
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
    xaxis: { type: "datetime", labels: { show: false } },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
  };

  return (
    <div className="flex flex-col m-5 space-y-5">
      <div className="flex space-x-5">
        {/* Left Card Section */}
        <div className="relative w-full sm:w-[50%] md:w-[25%] flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <div className="relative mx-3 mt-3 ">
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

          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-bold tracking-tight text-slate-900">
                <span className="text-[30px]">{cryptoData.name}</span> (
                {cryptoData.symbol.toUpperCase()}){" "}
                <span>{cryptoData.market_cap_rank}</span>
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
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
            <div className="mt-2 mb-5 text-small grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  Market Cap:
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The total market value of the cryptocurrency, calculated by
                    multiplying the price by the circulating supply.
                  </span>
                </strong>
                <span>${cryptoData.market_cap}</span>
              </div>

              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  Valuation:
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The total value of a cryptocurrency at its maximum potential
                    supply.
                  </span>
                </strong>
                <span>${cryptoData.fully_diluted_valuation}</span>
              </div>

              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  Volume (24h):
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The total trading volume of the cryptocurrency in the past
                    24 hours.
                  </span>
                </strong>
                <span>${cryptoData.total_volume}</span>
              </div>

              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  High (24h):
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The highest price the cryptocurrency has reached in the last
                    24 hours.
                  </span>
                </strong>
                <span>${cryptoData.high_24h}</span>
              </div>

              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  Low (24h):
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The lowest price the cryptocurrency has reached in the last
                    24 hours.
                  </span>
                </strong>
                <span>${cryptoData.low_24h}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-slate-900 relative group">
                  Max Supply:
                  <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                    The maximum number of coins or tokens that will ever exist
                    for this cryptocurrency.
                  </span>
                </strong>
                <span>{cryptoData.max_supply}</span>
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
        <div className="relative w-full sm:w-[50%] md:w-[75%] bg-white rounded-lg border border-gray-100 shadow-md">
          <div className="p-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleTimeRangeClick("1D")}
                className="bg-gray-200 p-2 rounded-md"
              >
                1D
              </button>
              <button
                onClick={() => handleTimeRangeClick("7D")}
                className="bg-gray-200 p-2 rounded-md"
              >
                7D
              </button>
              <button
                onClick={() => handleTimeRangeClick("30D")}
                className="bg-gray-200 p-2 rounded-md"
              >
                30D
              </button>
              <button
                onClick={() => handleTimeRangeClick("1Y")}
                className="bg-gray-200 p-2 rounded-md"
              >
                1Y
              </button>
            </div>
            <div className="mt-4">
              <ReactApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>

      </div>

      {/* New Div Bar Section */}
      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => handleTabClick("description")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "description"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => handleTabClick("news")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "news"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          Related News
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 text-sm text-gray-800">
        {activeTab === "description" && <p>{descriptionContent}</p>}
        {activeTab === "news" && <p>{relatedNewsContent}</p>}
      </div>
    </div>


    </div>
  );
}

export default CryptoData;
