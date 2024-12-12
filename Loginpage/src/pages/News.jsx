import React from "react";
import hmabImage from "../Images/homeaboutBg.png";

const cryptoNews = [
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/11210558/1733951158-image-1733951134247_optimized.jpg",
    heading:
      "Supreme Court Allows Class-Action Lawsuit Against Nvidia Over Crypto Mining Claims",
    url: "https://cryptonews.com/news/supreme-court-allows-class-action-lawsuit-against-nvidia-over-crypto-mining-claims/",
  },
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/11154020/1733931620-image-1733931570907_optimized.jpg",
    heading:
      "Roger Ver: US Intelligence “Hijacked” Bitcoin, Turned It Into “Financial Trap”",
    url: "https://cryptonews.com/news/roger-ver-us-intelligence-hijacked-bitcoin/",
  },
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/11150512/1733929511-image-1733929481711_optimized.jpg",
    heading:
      "Kyrgyzstan Passes Law Defining Digital Som CBDC Framework",
    url: "https://cryptonews.com/news/kyrgyzstan-passes-law-defining-digital-som-cbdc-framework/",
  },
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/11164034/1733935234-image-1733934250817_optimized.jpg",
    heading:
      "Russian Scientists Say They have Developed a Solution to 'Fight BTC, ETH-powered Crime'",
    url: "https://cryptonews.com/news/russian-scientists-say-theyve-developed-a-solution-to-fight-btc-eth-powered-crime/",
  },
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/11123817/1733920697-image-1733920663111_optimized.jpg",
    heading:
      "Bitget Eyes Lithuania for EU Regional Hub Amid MiCA Compliance Plans",
    url: "https://cryptonews.com/news/bitget-eyes-lithuania-for-eu-regional-hub-amid-mica-compliance-plans/",
  },
];

export default function News() {
  return (
    <>
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${hmabImage})` }}
      ></div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#450529] via-white to-[#450529]">
        News
      </h1>

      {/* Carousel Container */}
      <div className="max-w-[700px] mt-12 mb-24 mx-auto relative z-10">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators">
            {cryptoNews.map((_, index) => (
              <li
                key={index}
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ol>

          <div className="carousel-inner">
            {cryptoNews.map((news, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={news.image}
                  className="d-block w-full rounded-lg object-cover h-[300px]"
                  alt={news.heading}
                />
                <div className="carousel-caption d-none d-md-block bg-[rgba(0,0,0,0.7)] p-3 rounded-lg max-w-[80%] mx-auto">
                  <a
                    href={news.url}
                    className="text-white text-lg mb-0 text-xl"
                  >
                    {news.heading}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
}
