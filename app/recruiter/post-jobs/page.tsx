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
import { useRouter } from "next/navigation";

function PostJobs() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [job, setJob] = useState({
    company_name: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    city: "",
    requirements: "",
  });
  const [postedJobs, setPostedJobs] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Posting job...");

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      const newJob = { ...job, posted_days_ago: 0 };
      setPostedJobs([...postedJobs, newJob]);
      
      setJob({
        company_name: "",
        title: "",
        description: "",
        location: "",
        salary: "",
        city: "",
        requirements: "",
      });
      
      setStatusMessage("Job posted successfully!");
      
      router.refresh();
    } catch (error) {
      console.error("Error posting job:", error);
      setStatusMessage("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
      
      if (statusMessage === "Job posted successfully!") {
        setTimeout(() => setStatusMessage(""), 3000);
      }
    }
  };

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">
          Post a New Job
        </h1>
        
        {statusMessage && (
  <div 
    className={`mb-4 p-4 rounded-lg w-full max-w-2xl flex items-center justify-center shadow-sm animate-fadeIn ${
      statusMessage === "Posting job..." ? "bg-blue-50 border border-blue-200" :
      statusMessage === "Job posted successfully!" ? "bg-green-50 border border-green-200" :
      "bg-red-50 border border-red-200"
    }`}
  >
    <div className="mr-3">
      {statusMessage === "Posting job..." ? (
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      ) : statusMessage === "Job posted successfully!" ? (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
        </svg>
      )}
    </div>
    <p className={`font-medium ${
      statusMessage === "Posting job..." ? "text-blue-700" :
      statusMessage === "Job posted successfully!" ? "text-green-700" :
      "text-red-700"
    }`}>
      {statusMessage}
    </p>
  </div>
)}
        
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
          <select
            name="location"
            className="w-full p-2 border rounded text-black"
            value={job.location}
            onChange={handleChange as any}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
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
            className="mt-2 bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </form>

        <div className="w-full max-w-2xl mt-6 space-y-4">
          <h2 className="text-[#2e657a] text-xl font-bold">Recently Posted Jobs</h2>
          {postedJobs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No jobs posted yet.</p>
          ) : (
            postedJobs.map((job, index) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default PostJobs;