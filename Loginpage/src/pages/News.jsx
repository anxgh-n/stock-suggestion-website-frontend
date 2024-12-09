import React from "react";
import hmabImage from "../Images/homeaboutBg.png";

const cryptoNews = [
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/12/09063322/1733726002-image-1733725949807_optimized.jpg",
    heading:
      "Cardano X account Hacked, Spreading False SEC Lawsuit Claims",
    url: "https://cryptonews.com/news/cardano-x-account-hacked-spreading-false-sec-lawsuit-claims/",
  },
  {
    image:
      "https://www.coindesk.com/resizer/b8C2JwUaA7nTjHzJRH7veJi6u1o=/1056x594/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/B3DINV7VIZB3DLCZJPZLM3LJPM.jpg",
    heading:
      "Bitcoin ETF Options Attract $2B on Day One, Shifting BTC’s Market Structure",
    url: "https://www.coindesk.com/markets/2024/11/20/bitcoin-etf-options-attract-2b-on-day-one-shifting-btcs-market-structure/?_gl=1*1cs15rs*_up*MQ..*_ga*MTg4Mzc2NjcwNS4xNzMyMDk0OTc1*_ga_VM3STRYVN8*MTczMjA5NDk3NC4xLjAuMTczMjA5NDk3NC4wLjAuNDQwNDA0NzU3",
  },
  {
    image:
      "https://www.coindesk.com/resizer/OX-aGawxka9gINjqyUHpkzSDwRs=/1056x594/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/54BP4UOSBRFB7F7PBUYPMJHRQE.jpg",
    heading: "Coinbase Delists Wrapped Bitcoin wBTC, Citing 'Listing Concerns'",
    url: "https://www.coindesk.com/tech/2024/11/20/coinbase-delists-wrapped-bitcoin-wbtc-citing-listing-concerns/?_gl=1*rqubg1*_up*MQ..*_ga*MTMzNDIzNTQ2Mi4xNzMyMDk1MzE3*_ga_VM3STRYVN8*MTczMjA5NTMxNi4xLjAuMTczMjA5NTMxNi4wLjAuMjAwNTc1MTIwMw..",
  },
  {
    image:
      "https://www.coindesk.com/resizer/duiqTDT6I0RHVudFVBNqJYGw9kw=/1056x594/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/7LOBLOL3EVGJLCXVKGSJ6HBBIU.jpeg",
    heading:
      "Michael Saylor's MicroStrategy Added Additional 51,780 Bitcoin for $4.6B",
    url: "https://www.coindesk.com/markets/2024/11/18/michael-saylors-microstrategy-added-additional-51780-bitcoin-for-46b/?_gl=1*1aw0ver*_up*MQ..*_ga*NDQ0OTE3MzUuMTczMjA5NTQ1OQ..*_ga_VM3STRYVN8*MTczMjA5NTQ1OC4xLjAuMTczMjA5NTQ1OC4wLjAuMTg3MzM0ODE5MQ..",
  },
  {
    image:
      "https://cimg.co/wp-content/uploads/2024/11/20064030/1732084829-image-1732084772413_optimized.jpg",
    heading:
      "Michael Saylor to Pitch Bitcoin Investment Strategy to Microsoft Board",
    url: "https://cryptonews.com/news/michael-saylor-to-pitch-bitcoin-to-microsoft-board/",
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
        Daily News!
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
