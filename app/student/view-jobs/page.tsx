import { NavbarStudents } from '@/components/shared/navbar/NavbarStudents';
import React from 'react';

function ViewJobs() {
  return (
    <>
      <NavbarStudents />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">Job Postings</h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          {[{
            title: "Software Engineer Intern",
            company: "Tech Solutions",
            location: "Remote",
            city: "San Francisco, CA",
            salary: "$60,000 - $80,000",
            requirements: "Experience with JavaScript, React, and Node.js."
          }, {
            title: "Data Analyst",
            company: "Data Insights",
            location: "On-Site",
            city: "New York, NY",
            salary: "$50,000 - $70,000",
            requirements: "Proficiency in SQL, Python, and data visualization tools."
          }, {
            title: "Marketing Associate",
            company: "Creative Minds",
            location: "Hybrid",
            city: "Los Angeles, CA",
            salary: "$45,000 - $65,000",
            requirements: "Strong communication and social media marketing experience."
          }].map((job, index) => (
            <div key={index} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
              <h2 className="text-[#1f2021] font-semibold text-xl">{job.title}</h2>
              <p className="text-[#548d97]">Company: {job.company}</p>
              <p className="text-[#89a9c4]">Location: {job.location}</p>
              <p className="text-[#548d97]">City: {job.city}</p>
              <p className="text-[#89a9c4]">Salary: {job.salary}</p>
              <p className="text-[#1f2021]">Requirements: {job.requirements}</p>
              <button className="mt-2 bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full sm:w-auto">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewJobs;
