import { LogOut } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat -mt-12"
      style={{
        background:
          "radial-gradient(789px at 100.2% 3%, rgb(255, 255, 255) 31.1%, rgb(205, 181, 93) 36.4%, rgb(244, 102, 90) 50.9%, rgb(199, 206, 187) 60.7%, rgb(249, 140, 69) 72.5%, rgb(255, 255, 255) 72.6%)",
      }}
    >
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Profile Text Section */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-5xl font-bold text-dark-color">
                About Me
              </h3>
              <h6 className="text-xl font-semibold text-theme-color">
                A Lead UX &amp; UI designer based in Canada
              </h6>
              <p className="text-lg max-w-lg mx-auto lg:mx-0">
                I{" "}
                <mark className="bg-transparent text-current bg-gradient-to-b from-pink-600 to-pink-600 bg-[length:100%_3px] bg-no-repeat pb-1">
                  design and develop
                </mark>{" "}
                services for customers of all sizes, specializing in creating
                stylish, modern websites, web services, and online stores. My
                passion is to design digital user experiences through bold
                interfaces and meaningful interactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900 after:content-[''] after:block after:h-3 after:w-[1px] after:bg-blue-900 after:opacity-50 after:ml-2">
                      Birthday
                    </label>
                    <p>4th April 1998</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Age
                    </label>
                    <p>22 Yr</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Residence
                    </label>
                    <p>Canada</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Address
                    </label>
                    <p>California, USA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      E-mail
                    </label>
                    <p>info@domain.com</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Phone
                    </label>
                    <p>820-885-3321</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Skype
                    </label>
                    <p>skype.0404</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 font-semibold text-blue-900">
                      Freelance
                    </label>
                    <p>Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
            <h6 className="count text-2xl font-bold text-blue-900">500</h6>
            <p className="font-semibold">Happy Clients</p>
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
