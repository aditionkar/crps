import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function HeroComponent() {
  return (
    <section className="relative bg-gradient-to-b from-primary to-secondary py-20 text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Connect Talent with Opportunity
          </h1>
          <p className="mt-6 text-xl text-accent-lighter">
            The ultimate platform for students to find their dream jobs and for recruiters to discover exceptional
            talent.
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
            <div className="relative animate-float rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Campus Recruitment"
                className="rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroComponent
