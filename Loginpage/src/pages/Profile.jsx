import { LogOut } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

function handleWatchlist() {
  navigate("/profile");
}
export default function Profile() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -mt-12">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Profile Text Section */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left"></div>

          {/* Profile Avatar Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="about-avatar">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Avatar"
                className="rounded-full w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* Counter Section (optional) */}
        <div className="counter grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="count-data text-center bg-white rounded-lg p-6 shadow-lg">
            <button onClick={handleWatchlist} className="btn btn-primary">
              Edit
            </button>
            <h6 className="count text-2xl font-bold text-blue-900"></h6>
          </div>
          <div className="count-data text-center bg-white rounded-lg p-6 shadow-lg">
            <h6 className="count text-2xl font-bold text-blue-900">150</h6>
            <p className="font-semibold">Projects Completed</p>
          </div>
          <div className="count-data text-center bg-white rounded-lg p-6 shadow-lg">
            <h6 className="count text-2xl font-bold text-blue-900">850</h6>
            <p className="font-semibold">Photos Captured</p>
          </div>
          <div className="count-data text-center bg-white rounded-lg p-6 shadow-lg">
            <h6 className="count text-2xl font-bold text-blue-900">190</h6>
            <p className="font-semibold">Telephonic Talks</p>
          </div>
        </div>
      </div>
    </section>
  );
}
