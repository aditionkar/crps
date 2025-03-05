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
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', jobTitle: 'Frontend Developer', company: 'TechCorp', resumeLink: '#' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', jobTitle: 'Backend Developer', company: 'InnovateX', resumeLink: '#' },
  { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', jobTitle: 'UI/UX Designer', company: 'Creative Minds', resumeLink: '#' },
  { id: 4, name: 'Robert Brown', email: 'robertbrown@example.com', jobTitle: 'Data Scientist', company: 'DataWorks', resumeLink: '#' },
  { id: 5, name: 'Michael Lee', email: 'michaellee@example.com', jobTitle: 'DevOps Engineer', company: 'CloudNet', resumeLink: '#' },
];

function ViewApplicantsOfJobs() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [scheduledInterviews, setScheduledInterviews] = useState<{ [key: number]: string }>({});
  const [rejectedApplicants, setRejectedApplicants] = useState<number[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string>("");

  const handleAccept = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleScheduleInterview = () => {
    if (selectedApplicant && selectedDateTime) {
      setScheduledInterviews((prev) => ({
        ...prev,
        [selectedApplicant.id]: selectedDateTime,
      }));
      setSelectedApplicant(null);
      setSelectedDateTime("");
    }
  };

  const handleReject = (id: number) => {
    setRejectedApplicants((prev) => [...prev, id]);
  };

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

                {scheduledInterviews[applicant.id] ? (
                  <p className="text-green-600">Interview Scheduled on: {scheduledInterviews[applicant.id]}</p>
                ) : rejectedApplicants.includes(applicant.id) ? (
                  <p className="text-red-600">Application Rejected</p>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer"
                      className="bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97]">
                      View Resume
                    </a>
                    <button onClick={() => handleAccept(applicant)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Accept & Schedule
                    </button>
                    <button onClick={() => handleReject(applicant.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#1f2021]">No applicants yet.</p>
          )}
        </div>

        {/* Scheduling Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Schedule Interview for {selectedApplicant.name}</h2>
              <input
                type="datetime-local"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setSelectedApplicant(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Cancel
                </button>
                <button onClick={handleScheduleInterview}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewApplicantsOfJobs;