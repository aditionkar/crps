import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import TopCompanies from "./TopCompanies";

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
              The ultimate platform for students to find their dream jobs and
              for recruiters to discover exceptional talent.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/login">
                <button className="px-6 py-3 bg-white text-[#2e657a] font-semibold rounded-full transition duration-300 ease-in-out hover:bg-[#e0f7ff] hover:shadow-lg">
                  Student Login
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-[#2e657a] hover:shadow-lg">
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
                <video
                  src="/Business vision.mp4"
                  width="600"
                  height="400"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl"
                ></video>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full animate-wave"
          >
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
              d: path(
                "M0,160 C180,200 360,240 540,220 C720,200 900,120 1080,140 C1260,160 1440,240 1440,240 L1440,320 L0,320 Z"
              );
            }
            50% {
              d: path(
                "M0,180 C200,240 400,220 600,200 C800,180 1000,140 1200,160 C1400,180 1440,200 1440,200 L1440,320 L0,320 Z"
              );
            }
            100% {
              d: path(
                "M0,160 C180,200 360,240 540,220 C720,200 900,120 1080,140 C1260,160 1440,240 1440,240 L1440,320 L0,320 Z"
              );
            }
          }

          .animate-wave path {
            animation: wave 2s infinite ease-in-out;
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We provide the tools and resources to help students and recruiters
              connect efficiently.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Job Matching
              </h3>
              <p className="text-gray-600">
                Our intelligent algorithm matches students with jobs that fit
                their skills and career goals.
              </p>
            </div>

            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Talent Discovery
              </h3>
              <p className="text-gray-600">
                Recruiters can easily find and connect with qualified candidates
                from top universities.
              </p>
            </div>

            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Interview Scheduling
              </h3>
              <p className="text-gray-600">
                Streamlined interview scheduling with automated reminders and
                calendar integration.
              </p>
            </div>

            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Profile Showcase
              </h3>
              <p className="text-gray-600">
                Students can create professional profiles to showcase their
                skills and achievements.
              </p>
            </div>

            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Application Tracking
              </h3>
              <p className="text-gray-600">
                Track application status in real-time and receive updates on
                your job applications.
              </p>
            </div>

            <div className="rounded-xl bg-accent-lighter p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                Career Resources
              </h3>
              <p className="text-gray-600">
                Access to resume templates, interview tips, and career
                development resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies Section (For Students) */}
      <TopCompanies />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Career Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg">
              Join thousands of students and recruiters already using our
              platform to connect talent with opportunity.
            </p>
            <div className="mt-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-accent-lighter transition duration-300">
                <Link href="/signin">
                  Sign Up as Student
                </Link>
              </button>
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition duration-300">
                <Link href="/signin">
                  Sign Up as Recruiter
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroComponent;
