"use client";

import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useState } from "react";
import {
  MapPin,
  Building,
  DollarSign,
  CalendarDays,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

function PostJobs() {
  const [job, setJob] = useState({
    company_name: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    city: "",
    requirements: "",
    posted_days_ago: 0,
  });
  const [postedJobs, setPostedJobs] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPostedJobs([...postedJobs, job]);
    setJob({
      company_name: "",
      title: "",
      description: "",
      location: "",
      salary: "",
      city: "",
      requirements: "",
      posted_days_ago: 0,
    });
  };

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">
          Post a New Job
        </h1>
        <form
          className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            className="w-full p-2 border rounded text-black"
            value={job.company_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full p-2 border rounded text-black"
            value={job.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            className="w-full p-2 border rounded text-black"
            value={job.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Job Location"
            className="w-full p-2 border rounded text-black"
            value={job.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-2 border rounded text-black"
            value={job.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary Range"
            className="w-full p-2 border rounded text-black"
            value={job.salary}
            onChange={handleChange}
            required
          />
          <textarea
            name="requirements"
            placeholder="Job Requirements"
            className="w-full p-2 border rounded text-black"
            value={job.requirements}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full "
          >
            Post Job
          </button>
        </form>

        <div className="w-full max-w-2xl mt-6 space-y-4">
          {postedJobs.map((job, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-[#91b6be]/30"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-[#1f2021] font-bold text-xl md:text-2xl mb-2">
                        {job.title}
                      </h2>
                      <span
                        className={`absolute top-0 right-0 m-4 flex flex-col justify-center text-sm font-medium px-2.5 py-0.5 rounded-full ${
                          job.location === "Remote"
                            ? "bg-blue-100 text-blue-700 border border-blue-500"
                            : job.location === "On-site"
                            ? "bg-green-100 text-green-700 border border-green-500"
                            : "bg-purple-100 text-purple-700 border border-purple-500"
                        }`}
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
                <button className="bg-[#78bed8] text-white px-6 py-2 rounded-lg hover:bg-[#548d97] transition-colors flex-1 flex items-center justify-center">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 flex items-center justify-center">
                  Company Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
                <button className="border border-green-500 font-medium text-green-500 px-6 py-2 rounded-lg hover:bg-green-100 transition-colors sm:flex-initial">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PostJobs;
