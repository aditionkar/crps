"use client";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useState, useEffect } from "react";
import axios from "axios"; 

interface Applicant {
  mock_applicant_id: number;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  resumeLink: string;
}

function ViewApplicantsOfJobs() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [scheduledInterviews, setScheduledInterviews] = useState<{
    [key: number]: string;
  }>({});
  const [rejectedApplicants, setRejectedApplicants] = useState<number[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/api/mock_applicants"); 
        setApplicants(response.data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleAccept = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleScheduleInterview = () => {
    if (selectedApplicant && selectedDate && selectedTime) {
      const dateTime = `${selectedDate}T${selectedTime}`;
      setScheduledInterviews((prev) => ({
        ...prev,
        [selectedApplicant.mock_applicant_id]: dateTime,
      }));
      setSelectedApplicant(null);
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const handleReject = (id: number) => {
    setRejectedApplicants((prev) => [...prev, id]);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-[#dae1e6] min-h-screen pt-10 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 mx-auto text-center">
            <h1 className="text-[#2e657a] text-3xl md:text-4xl items-center font-bold tracking-tight ">
              Applicants for Your Jobs
            </h1>
            <p className="text-[#548d97] mt-2">
              Review and manage applicants for your job postings.
            </p>
          </div>
          <div className="w-full space-y-6">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <div
                  key={applicant.mock_applicant_id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-[#91b6be]/30"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                    <div className="space-y-2 flex-1">
                      <h2 className="text-[#1f2021] font-bold text-xl md:text-2xl">
                        {applicant.name}
                      </h2>
                      <p className="text-[#548d97] text-sm">
                        Email: {applicant.email}
                      </p>
                      <p className="text-[#89a9c4] text-sm">
                        Applied for: {applicant.jobTitle} 
                      </p>

                      {scheduledInterviews[applicant.mock_applicant_id] ? (
                        <p className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-md shadow-sm border border-green-400">
                           Interview Scheduled on:{" "}
                          {formatDateTime(scheduledInterviews[applicant.mock_applicant_id])}
                        </p>
                      ) : rejectedApplicants.includes(applicant.mock_applicant_id) ? (
                        <p className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-md shadow-sm border border-red-400">
                           Application Rejected
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-7 px-8">
                      <a
                        href={applicant.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] transition-colors flex items-center justify-center"
                      >
                        View Resume
                      </a>
                      {!scheduledInterviews[applicant.mock_applicant_id] &&
                        !rejectedApplicants.includes(applicant.mock_applicant_id) && (
                          <>
                            <button
                              onClick={() => handleAccept(applicant)}
                              className="relative px-4 py-2  isolation-auto z-10 border-2 border-green-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#1C823A] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm  text-black bg-white  rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Accept & Schedule
                            </button>
                            <button
                              onClick={() => handleReject(applicant.mock_applicant_id)}
                              className="relative px-4 py-2  isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm  text-black bg-white rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Reject
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#1f2021]">No applicants yet.</p>
            )}
          </div>
        </div>

        {selectedApplicant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-50">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Schedule Interview for {selectedApplicant.name}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2e657a] mb-1 ">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2e657a] mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full text-black"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleInterview}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
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
