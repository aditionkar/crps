"use client";
import { NavbarRecruiters } from '@/components/shared/navbar/NavbarRecruiters';
import React, { useState } from 'react';

function PostJobs() {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    city: '',
    salary: '', 
    requirements: ''
  });
  const [postedJobs, setPostedJobs] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPostedJobs([...postedJobs, job]);
    setJob({ title: '', company: '', location: '', city: '', salary: '', requirements: '' });
  };

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">Post a New Job</h1>
        <form className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Job Title" className="w-full p-2 border rounded text-black" value={job.title} onChange={handleChange} required />
          <input type="text" name="company" placeholder="Company Name" className="w-full p-2 border rounded text-black" value={job.company} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Job Location" className="w-full p-2 border rounded text-black" value={job.location} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded text-black" value={job.city} onChange={handleChange} required />
          <input type="text" name="salary" placeholder="Salary Range" className="w-full p-2 border rounded text-black" value={job.salary} onChange={handleChange} required />
          <textarea name="requirements" placeholder="Job Requirements" className="w-full p-2 border rounded text-black" value={job.requirements} onChange={handleChange} required />
          <button type="submit" className="mt-2 bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full">Post Job</button>
        </form>

        <div className="w-full max-w-2xl mt-6">
          {postedJobs.map((job, index) => (
            <div key={index} className="border-b border-[#91b6be] pb-4 mb-4 w-full bg-white rounded-lg shadow-lg p-6">
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

export default PostJobs;
