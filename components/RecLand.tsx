import Link from "next/link";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 shadow-md border border-gray-300 rounded-xl md:h-64 flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-95 hover:shadow-lg">
      <h3 className="font-bold text-xl text-gray-900 mb-5">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-500 text-sm">
        {title === "Efficient Applicant Management" &&
          "Filter, sort, and track candidates seamlessly with our intuitive dashboard."}
        {title === "Schedule Interviews with a Few Clicks" &&
          "Automated scheduling ensures no double bookings, saving time for both recruiters and candidates."}
        {title === "Access a Diverse Talent Pool" &&
          "Browse profiles of skilled professionals from various fields, ensuring the right fit for your company."}
      </p>
    </div>
  );
};

const CompanyLanding: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-10 bg-gradient-to-b from-[#c6f6ff] to-[#e3fbff]">
      <h1 className="text-6xl font-bold mb-4 text-[#2e657a]">
        Unlock the Future of Recruitment Today
      </h1>
      <p className="text-gray-500 max-w-xl mb-10">
        Our platform simplifies the recruitment process, allowing you to manage
        applicants with ease and connect with top talent effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-16">
        <Feature
          title="Efficient Applicant Management"
          description="Easily track and manage all applications in one place."
        />
        <Feature
          title="Schedule Interviews with a Few Clicks"
          description="Coordinate interview times that fit your schedule effortlessly."
        />
        <Feature
          title="Access a Diverse Talent Pool"
          description="Connect with skilled candidates ready to make an impact."
        />
      </div>

      <div className="mt-10 flex space-x-4">
        <button className="bg-black text-white px-6 py-3 rounded-full transition duration-300 transform hover:bg-gray-800 hover:scale-105">
          Learn More
        </button>

        <Link href="/">
          <button className="border border-black text-black px-6 py-3 rounded-full transition duration-300 transform hover:bg-black hover:text-white hover:scale-105">
            For Students
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyLanding;
