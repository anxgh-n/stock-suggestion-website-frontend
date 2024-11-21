import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { PiGreaterThan } from "react-icons/pi";

export default function Documentation() {
  const [activeLink, setActiveLink] = useState("introduction");

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Navigation Bar */}
      <aside className="w-1/4 bg-blue-50 py-10 px-6 sticky top-0 h-screen">
        <nav className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Documentation</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#introduction"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                onClick={() => handleLinkClick("introduction")}
              >
                {activeLink === "introduction" && (
                  <PiGreaterThan className="mr-2" />
                )}
                Introduction to Cryptocurrencies
              </a>
            </li>
            <li>
              <a
                href="#how-to-invest"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                onClick={() => handleLinkClick("how-to-invest")}
              >
                {activeLink === "how-to-invest" && (
                  <PiGreaterThan className="mr-2" />
                )}
                How to Invest in Cryptocurrencies
              </a>
            </li>
            <li>
              <a
                href="#risks"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                onClick={() => handleLinkClick("risks")}
              >
                {activeLink === "risks" && (
                  <PiGreaterThan className="mr-2" />
                )}
                Risks of Cryptocurrency Investment
              </a>
            </li>
            <li>
              <a
                href="#tips"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                onClick={() => handleLinkClick("tips")}
              >
                {activeLink === "tips" && (
                  <PiGreaterThan className="mr-2" />
                )}
                Tips for Beginners
              </a>
            </li>
            <li>
              <a
                href="#resources"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                onClick={() => handleLinkClick("resources")}
              >
                {activeLink === "resources" && (
                  <PiGreaterThan className="mr-2" />
                )}
                Useful Resources
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Documentation Content */}
      <main className="w-3/4 py-10 px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-6xl mb-4">
            User Guide: Investing in Coins
          </h2>
          <p className="text-lg text-gray-600">
            Your comprehensive guide to understanding cryptocurrencies and how to invest wisely.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <section id="introduction" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Introduction to Cryptocurrencies
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Cryptocurrencies are digital assets that use blockchain technology to provide secure
                and decentralized transactions. Popular examples include Bitcoin, Ethereum, and
                Litecoin. They have revolutionized the financial world by offering a decentralized
                alternative to traditional currencies.
              </p>
            </section>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <section id="how-to-invest" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                How to Invest in Cryptocurrencies
              </h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Research:</strong> Understand the market trends and evaluate different coins
                  before investing.
                </li>
                <li>
                  <strong>Choose a Platform:</strong> Select a trusted exchange like Coinbase or
                  Binance to buy and trade cryptocurrencies.
                </li>
                <li>
                  <strong>Create a Wallet:</strong> Use a digital wallet for secure storage of your
                  assets.
                </li>
                <li>
                  <strong>Start Small:</strong> Begin with a small investment to get familiar with the
                  process and risks.
                </li>
                <li>
                  <strong>Monitor the Market:</strong> Stay updated on market fluctuations to make
                  informed decisions.
                </li>
              </ol>
            </section>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <section id="risks" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Risks of Cryptocurrency Investment
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Investing in cryptocurrencies can be highly rewarding but comes with significant
                risks:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Volatility: Prices can fluctuate dramatically in a short time.</li>
                <li>Regulatory Risks: Governments may impose restrictions on cryptocurrency usage.</li>
                <li>Security Risks: Hacking and scams are prevalent in the cryptocurrency world.</li>
              </ul>
            </section>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <section id="tips" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Tips for Beginners
              </h3>
              <p className="text-gray-700 leading-relaxed">
                If you’re new to cryptocurrency, here are some tips to get you started:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Educate yourself on blockchain technology and its applications.</li>
                <li>Invest only what you can afford to lose.</li>
                <li>Diversify your portfolio to minimize risks.</li>
                <li>Enable two-factor authentication for added security.</li>
              </ul>
            </section>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <section id="resources" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Useful Resources
              </h3>
              <ul className="list-none text-gray-700 space-y-2">
                <li>
                  <a
                    href="https://www.coindesk.com/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CoinDesk: Cryptocurrency News and Insights
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.blockchain.com/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blockchain.com: Cryptocurrency Wallets and Tools
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.coinmarketcap.com/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CoinMarketCap: Market Data and Rankings
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
