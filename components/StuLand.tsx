import Link from "next/link";
import React from "react";

// Define the type for FeatureCard props
interface FeatureCardProps {
  title: string;
  description: string;
}

// FeatureCard component with hover effects and additional text
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg md:h-64 flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-95 hover:shadow-lg">
      <h3 className="font-bold text-xl text-gray-900 mb-5">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-500 text-sm">
        {/* Additional relevant text */}
        {title === "Seamless Job Application Experience" &&
          "No more tedious forms. Apply quickly and track your applications effortlessly."}
        {title === "Showcase Your Skills and Experience" &&
          "Create a detailed profile with projects, achievements, and certifications."}
        {title === "Direct Communication with Recruiters" &&
          "Receive real-time feedback and increase your chances of landing your dream job."}
      </p>
    </div>
  );
};

// Main StudentLanding component
const StudentLanding: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-10  bg-gradient-to-b from-[#c6f6ff] via-[#e3fbff] to-[#f9fafb]">
      <h1 className="md:text-6xl font-bold mb-4 text-[#2e657a] text-4xl">
        Unlock Your Career Potential with Ease
      </h1>
      <p className="text-gray-500 max-w-xl mb-10">
        Our platform simplifies the job application process for students, making
        it easier than ever to connect with potential employers.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-16">
        <FeatureCard
          title="Seamless Job Application Experience"
          description="Apply to jobs with just a few clicks."
        />
        <FeatureCard
          title="Showcase Your Skills and Experience"
          description="Build a professional profile that stands out."
        />
        <FeatureCard
          title="Direct Communication with Recruiters"
          description="Engage directly with recruiters for better opportunities."
        />
      </div>

      <div className="mt-10 flex space-x-4">
        {/* Learn More Button */}
        <button className="bg-black text-white px-6 py-3 rounded-lg transition duration-300 transform hover:bg-gray-800 hover:scale-105">
          Learn More
        </button>

        {/* For Employers Button */}
        <Link href="/company">
          <button className="border border-black text-black px-6 py-3 rounded-lg transition duration-300 transform hover:bg-black hover:text-white hover:scale-105">
            For Employers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentLanding;
