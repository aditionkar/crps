"use client";

import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import React, { useEffect, useState } from "react";

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
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">Job Postings</h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          {loading ? (
            <p className="text-[#1f2021] text-lg">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-[#1f2021] text-lg">No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.jobs_id} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
                <h2 className="text-[#1f2021] font-semibold text-xl">{job.title}</h2>
                <p className="text-[#548d97]">Company: {job.company_name}</p>
                <p className="text-[#89a9c4]">Location: {job.location}</p>
                <p className="text-[#548d97]">City: {job.city}</p>
                <p className="text-[#89a9c4]">Salary: ${job.salary}</p>
                <p className="text-[#1f2021] font-medium">Description:</p>
                <p className="text-[#1f2021]">{job.description}</p>
                <p className="text-[#1f2021] font-medium">Requirements:</p>
                <p className="text-[#1f2021]">{job.requirements}</p>
                <p className="text-[#548d97] font-medium">
                  Posted {job.posted_days_ago} {job.posted_days_ago === 1 ? "day" : "days"} ago
                </p>
                <button className="mt-2 bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full sm:w-auto">
                  Apply
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ViewJobs;
