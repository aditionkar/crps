"use client";
import { NavbarRecruiters } from '@/components/shared/navbar/NavbarRecruiters';
import React, { useState } from 'react';

interface Applicant {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  resumeLink: string;
}

const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    jobTitle: 'Frontend Developer',
    company: 'TechCorp',
    resumeLink: '#',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    jobTitle: 'Backend Developer',
    company: 'InnovateX',
    resumeLink: '#',
  },
];

function ViewApplicantsOfJobs() {
  const [applicants] = useState<Applicant[]>(mockApplicants);

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">Applicants for Your Jobs</h1>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <div key={applicant.id} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
                <h2 className="text-[#1f2021] font-semibold text-xl">{applicant.name}</h2>
                <p className="text-[#548d97]">Email: {applicant.email}</p>
                <p className="text-[#89a9c4]">Applied for: {applicant.jobTitle} at {applicant.company}</p>
                <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] w-full sm:w-auto">View Resume</a>
              </div>
            ))
          ) : (
            <p className="text-[#1f2021]">No applicants yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewApplicantsOfJobs;
