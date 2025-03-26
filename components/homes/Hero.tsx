import Link from "next/link";
import React from "react";
import Image from "next/image";

function HeroComponent() {
  return (
    <>
    <section className="relative bg-gradient-to-b from-primary to-secondary py-20 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Connect Talent with Opportunity
          </h1>
          <p className="mt-6 text-xl text-accent-lighter">
            The ultimate platform for students to find their dream jobs and for recruiters to discover exceptional talent.
          </p>
          <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/auth/login?type=student">
              <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-accent-lighter">
                Student Login
              </button>
            </Link>
            <Link href="/auth/login?type=recruiter">
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10">
                Recruiter Login
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-1/2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-accent-light opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 h-72 w-72 rounded-full bg-primary-light opacity-50 blur-3xl"></div>
            <div className="relative animate-float rounded-2xl bg-white/10 p-6 backdrop-blur-sm ">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Campus Recruitment"
                className="rounded-xl "
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full animate-wave">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160 C180,200 360,240 540,220 C720,200 900,120 1080,140 C1260,160 1440,240 1440,240 L1440,320 L0,320 Z"
          ></path>
        </svg>
      </div>

      {/* Custom CSS for Wave Animation */}
      <style jsx>{`
        @keyframes wave {
          0% {
            d: path("M0,160 C180,200 360,240 540,220 C720,200 900,120 1080,140 C1260,160 1440,240 1440,240 L1440,320 L0,320 Z");
          }
          50% {
            d: path("M0,180 C200,240 400,220 600,200 C800,180 1000,140 1200,160 C1400,180 1440,200 1440,200 L1440,320 L0,320 Z");
          }
          100% {
            d: path("M0,160 C180,200 360,240 540,220 C720,200 900,120 1080,140 C1260,160 1440,240 1440,240 L1440,320 L0,320 Z");
          }
        }

        .animate-wave path {
          animation: wave 2s infinite ease-in-out;
        }
      `}</style>
    </section>
    <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Career Journey?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg">
          Join thousands of students and recruiters already using our platform to connect talent with opportunity.
        </p>
        <div className="mt-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-accent-lighter">
            <Link href="/auth/register?type=student">Sign Up as Student</Link>
          </button>
          <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10">
            <Link href="/auth/register?type=recruiter">Sign Up as Recruiter</Link>
          </button>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}

export default HeroComponent;
