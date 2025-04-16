import React from "react";
import TiltedCard from "./TiltedCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function TopCompanies() {
  const companies = [
    {
      imageSrc: "https://img.icons8.com/color/144/google-logo.png",
      altText: "Google",
      captionText: "Google",
    },
    {
      imageSrc: "https://img.icons8.com/color/144/microsoft.png",
      altText: "Microsoft",
      captionText: "Microsoft",
    },
    {
      imageSrc: "https://img.icons8.com/color/144/amazon.png",
      altText: "Amazon",
      captionText: "Amazon",
    },
    {
      imageSrc: "https://img.icons8.com/color/144/facebook.png",
      altText: "Facebook",
      captionText: "Facebook",
    },
    {
      imageSrc: "https://img.icons8.com/color/144/netflix.png",
      altText: "Netflix",
      captionText: "Netflix",
    },
    {
      imageSrc: "https://img.icons8.com/ios-filled/150/mac-os.png",
      altText: "Apple",
      captionText: "Apple",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Top Companies Hiring
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Connect with industry-leading companies looking for fresh talent.
          </p>
        </div>

        {/* Grid of TiltedCards inside white rounded boxes */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="h-40 w-40 rounded-3xl bg-[#e0f2f1] p-2 shadow-md hover:shadow-lg flex items-center justify-center">
                <TiltedCard
                  imageSrc={company.imageSrc}
                  altText={company.altText}
                  captionText={company.captionText}
                  containerHeight="150px"
                  containerWidth="150px"
                  imageHeight="120px"
                  imageWidth="120px"
                  rotateAmplitude={10}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={<p className="tilted-card-demo-text"></p>}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard/student/view-jobs">
            <button className="bg-primary text-white px-6 py-3 rounded-full inline-flex items-center gap-2 transition duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-primary/90">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TopCompanies;
