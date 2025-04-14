"use client";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useState } from "react";
import { FaVideo, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

interface Interview {
  my_application_id: number;
  applicantName: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: string;
  status: "Scheduled" | "Completed";
}

const mockInterviews: Interview[] = [
  {
    my_application_id: 1,
    applicantName: "John Doe",
    jobTitle: "Frontend Developer",
    date: "March 10, 2025",
    time: "10:00 AM",
    mode: "Online",
    status: "Scheduled",
  },
  {
    my_application_id: 2,
    applicantName: "Jane Smith",
    jobTitle: "Backend Developer",
    date: "March 12, 2025",
    time: "2:00 PM",
    mode: "In-person",
    status: "Completed",
  },
  {
    my_application_id: 3,
    applicantName: "Alice Johnson",
    jobTitle: "UI/UX Designer",
    date: "March 15, 2025",
    time: "11:00 AM",
    mode: "Online",
    status: "Scheduled",
  },
  {
    my_application_id: 4,
    applicantName: "Bob Brown",
    jobTitle: "Data Scientist",
    date: "March 18, 2025",
    time: "3:00 PM",
    mode: "In-person",
    status: "Completed",
  },
  {
    my_application_id: 5,
    applicantName: "Charlie Davis",
    jobTitle: "DevOps Engineer",
    date: "March 20, 2025",
    time: "9:00 AM",
    mode: "Online",
    status: "Scheduled",
  },
];

function Interviews() {
  const [interviews] = useState<Interview[]>(mockInterviews);

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-gradient-to-b from-[#dae1e6] to-[#b8c6cf] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-4xl font-bold mb-8 text-center">
          Upcoming Interviews
        </h1>
        <div className="w-full max-w-4xl space-y-6">
          {interviews.length > 0 ? (
            interviews.map((interview, index) => (
              <motion.div
                key={`${interview.my_application_id}-${index}`}
                className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                  <h2 className="text-[#1f2021] font-bold text-2xl">
                    {interview.applicantName}
                  </h2>
                  <div
                    className={`flex items-center text-white px-3 py-1 rounded-full ${
                      interview.mode === "Online"
                        ? "bg-[#548d97]"
                        : "bg-[#e67e22]"
                    }`}
                  >
                    {interview.mode === "Online" ? (
                      <FaVideo className="mr-2" />
                    ) : (
                      <FaUser className="mr-2" />
                    )}
                    <span>{interview.mode}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#548d97]">
                    <FaCalendarAlt className="mr-2" />
                    <span>Date: {interview.date}</span>
                  </div>
                  <div className="flex items-center text-[#548d97]">
                    <FaClock className="mr-2" />
                    <span>Time: {interview.time}</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-3">
                  <span className="inline-block bg-[#89a9c4] text-white px-6 py-2 rounded-full text-sm">
                    Job Position:{" "}
                    <span className="font-semibold text-white">
                      {interview.jobTitle}
                    </span>
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                      interview.status === "Scheduled"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {interview.status}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[#1f2021] text-center">
              No upcoming interviews.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Interviews;
