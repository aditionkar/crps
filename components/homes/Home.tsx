
import React from "react";

function HomePage() {
  return (
    <section className="pt-8 lg:pt-16 bg-gradient-to-b from-white to-[#c6f6ff] h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <h1 className="max-w-3xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
          Connect, Discover, and Launch
          <span className="text-[#2e657a]"> Your Career </span>
        </h1>
        
        <p className="max-w-xl mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
          Welcome to our campus recruitment portal, where students can showcase
          their skills and connect with potential employers. Recruiters can
          easily manage job postings and find the right candidates for their
          teams.
        </p>
        <button className="relative flex items-center mb-3 mx-auto px-6 py-3 overflow-hidden font-medium transition-all bg-[#76aab5] rounded-md group">
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#548d97] rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#548d97] rounded group-hover:-ml-4 group-hover:-mb-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#548d97] rounded-md group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            Get Started
          </span>
        </button>
      </div>
      <div className="">
        {/* Desktop Image */}
        <img
          src="/home_desk.svg"
          alt="Desktop Image"
          className="hidden md:block w-30% h-30% object-cover px-20 py-8 animate-bounceUpDown"
        />

        {/* Mobile Image */}
        <img
          src="/home_mobile.svg"
          alt="Mobile Image"
          className="block md:hidden w-50% h-50% object-cover px-10 py-4 animate-bounceUpDown"
        />
      </div>
    </section>
  );
}

export default HomePage;
