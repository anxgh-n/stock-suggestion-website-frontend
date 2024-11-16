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
  const [isAdded, setIsAdded] = useState(false); // New state for tracking cart status

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cryptocurrency details
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
        );
        const data = await response.json();
        setCryptoData(data[0]);

        // Fetch historical chart data
        const chartResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
        );
        const chartData = await chartResponse.json();

        // Transform chart data for the graph
        const transformedChartData = chartData.prices.map(
          ([timestamp, price]) => ({
            x: new Date(timestamp).toISOString(), // Convert timestamp to ISO format
            y: price,
          })
        );
        setChartData(transformedChartData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!cryptoData) return <div>Data not available</div>;

  const handleCartClick = () => {
    setIsAdded((prev) => !prev); // Toggle the cart status
  };

  const chartOptions = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true, // Show tooltips on hover
        format: "dd MMM yyyy", // Tooltip date format
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: `${cryptoData.name} Price (USD)`,
        data: chartData,
        color: "#1A56DB",
      },
    ],
    xaxis: {
      type: "datetime", // Use datetime for x-axis
      labels: {
        show: false, // Hide x-axis labels
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toFixed(2)}`, // Format y-axis labels as USD
      },
    },
  };

  return (
    <div className="flex m-5 space-x-5 ">
      <div className="relative w-[33%] flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
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
              <span className="text-[30px] font-bold text-black">{cryptoData.current_price}</span>
              <span
                className={`text-medium font-bold ${
                  cryptoData.price_change_percentage_24h > 0
                    ? "text-[#75FB4C]"
                    : "text-red-500"
                }`}
              >
                <img
                  src={cryptoData.price_change_percentage_24h > 0 ? upp : downn}
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
                  The total trading volume of the cryptocurrency in the past 24
                  hours.
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
                  The lowest price the cryptocurrency has reached in the last 24
                  hours.
                </span>
              </strong>
              <span>${cryptoData.low_24h}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-slate-900 relative group">
                Max Supply:
                <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block text-sm text-gray-700 bg-gray-200 rounded-md px-2 py-1 font-normal">
                  The maximum number of coins or tokens that will ever exist for
                  this cryptocurrency.
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

      <div className="w-[5%] bg-gray-100 rounded-xl p-5 shadow-md">
        <h6 className="text-lg font-semibold text-gray-700">Additional Info</h6>
        <p className="text-sm text-gray-500">
          This section can hold any additional information about the cryptocurrency or other data relevant to your app.
        </p>
      </div>

  
      {/* Chart Section */}
      <div className="w-[57%]">
        <div className="w-full h-full p-4 bg-white rounded-xl shadow-md">
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="area"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default CryptoData;
