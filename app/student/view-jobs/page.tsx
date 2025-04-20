"use client";

import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Building,
  DollarSign,
  CalendarDays,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface Job {
  jobs_id: number;
  company_name: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  city: string;
  requirements: string;
  posted_days_ago: number;
}

function ViewJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <NavbarStudents />
      <div className="bg-[#dae1e6] min-h-screen pt-10 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2e657a]/10 text-[#2e657a] text-sm font-medium mb-2">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>Latest Opportunities</span>
            </div>
            <h1 className="text-[#2e657a] text-3xl md:text-4xl font-bold tracking-tight">
              Job Postings
            </h1>
            <p className="text-[#548d97] mt-2">
              Discover and apply to the latest opportunities available for
              students.
            </p>
          </div>
          <div className="w-full space-y-6">
            {loading ? (
              <p className="text-[#1f2021] text-lg">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-[#1f2021] text-lg">No jobs available.</p>
            ) : (
              jobs.map((job) => <JobCard key={job.jobs_id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-[#91b6be]/30">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Side: Job Details */}
        <div className="space-y-4 flex-1">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-[#1f2021] font-bold text-xl md:text-2xl mb-2">
                {job.title}
              </h2>
              <span
                className={`
                  absolute top-0 right-0 m-4 flex flex-col justify-center text-sm font-medium px-2.5 py-0.5 rounded-full 
                  ${
                    job.location === "Remote"
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : job.location === "On-site"
                      ? "bg-green-100 text-green-700 border border-green-500"
                      : "bg-purple-100 text-purple-700 border border-purple-500"
                  }
                `}
              >
                {job.location}
              </span>
            </div>
            <p className="text-[#548d97] text-sm">
              Posted {job.posted_days_ago}{" "}
              {job.posted_days_ago === 1 ? "day" : "days"} ago
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center text-sm text-[#548d97]">
              <Building className="h-4 w-4 mr-2 text-[#78bed8]" />
              <span className="text-base font-medium tracking-tighter">
                {job.company_name}
              </span>
            </div>
            <div className="flex items-center text-sm text-[#548d97]">
              <span className="text-[#78bed8] mr-2">₹</span>
              <span className="pr-4">{job.salary}</span>
            </div>
            <div className="flex items-center text-sm text-[#548d97]">
              <MapPin className="h-4 w-4 mr-2 text-[#78bed8]" />
              <span>{job.city}</span>
            </div>
          </div>
        </div>

        {/* Right Side: About and Requirements */}
        <div className="space-y-4 w-full md:w-1/2 mt-0 md:mt-10">
          <div>
            <h4 className="text-sm font-medium text-[#2e657a] mb-1">
              About{" "}
              <span className="font-bold text-[#2e657a]">
                {job.company_name}
              </span>
              :
            </h4>
            <p className="text-sm text-[#1f2021]">{job.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[#2e657a] mb-1">
              Requirements:
            </h4>
            <p className="text-sm text-[#1f2021]">{job.requirements}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t border-[#91b6be]/20">
        <button className="bg-[#78bed8] text-white px-6 py-2 rounded-[8px] hover:bg-[#548d97] transition-colors flex-1 flex items-center justify-center">
          Apply Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-[8px] hover:bg-gray-100 transition-colors flex-1 flex items-center justify-center">
          Company Website
          <ExternalLink className="ml-2 h-4 w-4" />
        </button>
        <button className="border border-green-500 font-medium text-green-500 px-6 py-2 rounded-[8px] hover:bg-green-100 transition-colors sm:flex-initial">
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewJobs;
