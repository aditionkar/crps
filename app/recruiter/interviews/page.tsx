"use client";
import { NavbarRecruiters } from '@/components/shared/navbar/NavbarRecruiters';
import React, { useState } from 'react';

interface Interview {
  id: number;
  applicantName: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  mode: string;
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    applicantName: 'John Doe',
    jobTitle: 'Frontend Developer',
    company: 'TechCorp',
    date: 'March 10, 2025',
    time: '10:00 AM',
    mode: 'Online',
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    jobTitle: 'Backend Developer',
    company: 'InnovateX',
    date: 'March 12, 2025',
    time: '2:00 PM',
    mode: 'In-person',
  },
];

function Interviews() {
  const [interviews] = useState<Interview[]>(mockInterviews);

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">Upcoming Interviews</h1>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          {interviews.length > 0 ? (
            interviews.map((interview) => (
              <div key={interview.id} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
                <h2 className="text-[#1f2021] font-semibold text-xl">{interview.applicantName}</h2>
                <p className="text-[#548d97]">Job Position: {interview.jobTitle}</p>
                <p className="text-[#89a9c4]">Company: {interview.company}</p>
                <p className="text-[#548d97]">Date: {interview.date}</p>
                <p className="text-[#89a9c4]">Time: {interview.time}</p>
                <p className="text-[#1f2021]">Mode: {interview.mode}</p>
              </div>
            ))
          ) : (
            <p className="text-[#1f2021]">No upcoming interviews.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Interviews;
