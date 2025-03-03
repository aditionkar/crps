import { NavbarStudents } from '@/components/shared/navbar/NavbarStudents';
import React from 'react';

function StudentsApplications() {
  return (
    <>
      <NavbarStudents />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">My Applications</h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          {[{
            title: "Software Engineer Intern",
            company: "Tech Solutions",
            status: "Under Review",
            appliedDate: "Feb 20, 2024"
          }, {
            title: "Data Analyst",
            company: "Data Insights",
            status: "Interview Scheduled",
            appliedDate: "Feb 15, 2024"
          }, {
            title: "Marketing Associate",
            company: "Creative Minds",
            status: "Application Received",
            appliedDate: "Feb 10, 2024"
          }].map((application, index) => (
            <div key={index} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
              <h2 className="text-[#1f2021] font-semibold text-xl">{application.title}</h2>
              <p className="text-[#548d97]">Company: {application.company}</p>
              <p className="text-[#89a9c4]">Status: {application.status}</p>
              <p className="text-[#1f2021]">Applied on: {application.appliedDate}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentsApplications;
