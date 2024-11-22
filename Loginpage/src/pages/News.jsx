import React from "react";
import hmabImage from "../Images/homeaboutBg.png";

const cryptoNews = [
  {
    image:
      "https://www.coindesk.com/resizer/RW0CjmFEeIqmtKTdEuaXTdgIWSQ=/1056x594/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/QOV3FM2ZUJDQRJNPTAGVS4JHDU.jpg",
    heading:
      "Ethena Sees $1B Inflows as Crypto Rally Brings Back Double-Digit Yields",
    url: "https://www.coindesk.com/markets/2024/11/19/ethena-sees-1b-inflows-as-crypto-rally-brings-back-double-digit-yields/?_gl=1*6mvmtf*_up*MQ..*_ga*MTQyNjg5MTM5OC4xNzMyMDkxMjA4*_ga_VM3STRYVN8*MTczMjA5MTIwNy4xLjAuMTczMjA5MTIwNy4wLjAuMTc0Mzg0NTUyMQ..",
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
  const backgroundStyle = {
    backgroundImage: `url(${hmabImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  };

  const containerStyle = {
    maxWidth: "700px",
    marginTop: "50px", // 20px margin on top
    marginBottom: "100px", // 20px margin on bottom
    marginLeft: "auto", // Center horizontally
    marginRight: "auto", // Center horizontally
    position: "relative", // Ensure carousel content stays above the background
    zIndex: 1,
  };

  const imgStyle = {
    borderRadius: "10px",
    objectFit: "cover",
    height: "300px",
  };

  const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "10px 15px",
    borderRadius: "12px",
    maxWidth: "80%",
    margin: "0 auto",
  };

  const headingStyle = {
    
    fontSize: "1.5rem",
    marginBottom: "0",
  };

  return (
    <>
      {/* Background Image */}
      <div style={backgroundStyle}></div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#450529] via-white to-[#450529]">
        Daily News!
      </h1>

      {/* Carousel Container */}
      <div style={containerStyle}>
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
                  className="d-block w-100"
                  alt={news.heading}
                  style={imgStyle}
                />
                <div
                  className="carousel-caption d-none d-md-block"
                  style={captionStyle}
                >
                  <a style={headingStyle} href={news.url}>
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
