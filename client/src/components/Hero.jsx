import React from "react";

const Hero = () => {
  return (
    <div className="">
      <div className="mx-auto h-full px-4 py-20 md:py-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row ">
          <div className=" ">
            <div className="lg:max-w-xl lg:pr-5">
              <p className="flex text-sm uppercase text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                A platform for personalized wellness and health management
              </p>
              <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-blue-600 sm:text-7xl sm:leading-snug">
                Take Charge of Your Health with
                <span className="my-1 inline-block border-b-8 border-blue-600 bg-orange-400 px-4 font-bold text-white">
                  AuraHealth
                </span>
              </h2>
              <p className="text-base text-gray-700">
                Track, improve, and manage your well-being with personalized
                insights and expert support, all in one app. Start your journey
                to better health today!
              </p>
            </div>
            <div className="mt-10 flex justify-center items-center md:flex-row">
              <button className="bg-blue-600 p-4 rounded-lg text-sky-100 font-semibold text-lg">
                Get Started Today
              </button>
            </div>
          </div>
          <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
            <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
              <div className="">
                <img
                  className="object-contain h-"
                  src="https://plus.unsplash.com/premium_photo-1670459707646-a2a9ca198789?q=80&w=1897&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
