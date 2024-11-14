import { useState, useEffect } from "react";

export default function TickerHeader() {
  return (
    <>
      <header className="shadow-none mb-0 sticky top-0 z-50 bg-black">
        <nav className="relative flex max-w-screen-xl flex-col overflow-visible px-2 py-0.2 md:mx-auto md:flex-row md:items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="tickername text-1xl font-light text-white">
              {/* Join the ticker names and display them */}
              8
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
