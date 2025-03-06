
"use client";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useState } from "react";
import {
  FaVideo,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa"; // Import icons
import { motion } from "framer-motion"; // Import motion for animations

interface Interview {
  id: number;
  applicantName: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: string;
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    applicantName: "John Doe",
    jobTitle: "Frontend Developer",
    date: "March 10, 2025",
    time: "10:00 AM",
    mode: "Online",
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    jobTitle: "Backend Developer",
    date: "March 12, 2025",
    time: "2:00 PM",
    mode: "In-person",
  },
  {
    id: 3,
    applicantName: "Alice Johnson",
    jobTitle: "UI/UX Designer",
    date: "March 15, 2025",
    time: "11:00 AM",
    mode: "Online",
  },
  {
    id: 4,
    applicantName: "Bob Brown",
    jobTitle: "Data Scientist",
    date: "March 18, 2025",
    time: "3:00 PM",
    mode: "In-person",
  },
  {
    id: 5,
    applicantName: "Charlie Davis",
    jobTitle: "DevOps Engineer",
    date: "March 20, 2025",
    time: "9:00 AM",
    mode: "Online",
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
            interviews.map((interview) => (
              <motion.div
                key={interview.id}
                className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }} // Add hover scale animation
                initial={{ opacity: 0, y: 20 }} // Fade-in animation
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#1f2021] font-bold text-2xl">
                    {interview.applicantName}
                  </h2>
                  <div
                    className={`flex items-center text-white px-3 py-1 rounded-full mr-4 ${
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
                <div className="space-y-2">
                  <div className="flex items-center text-[#548d97]">
                    <FaCalendarAlt className="mr-2" />
                    <span>Date: {interview.date}</span>
                  </div>
                  <div className="flex items-center text-[#548d97]">
                    <FaClock className="mr-2" />
                    <span>Time: {interview.time}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-block bg-[#89a9c4] text-white px-6 py-2 rounded-full text-sm">
                    Job Position:{" "}
                    <span className="font-semibold text-white">
                      {interview.jobTitle}
                    </span>
                  </span>
                  <button
                    className="flex items-center bg-[#2e657a] text-white px-4 py-2 rounded-lg hover:bg-[#1f4a5a] transition-colors duration-200 mr-4"
                    onClick={() => {
                      // Add functionality to view details
                      console.log("View details for:", interview.applicantName);
                    }}
                  >
                    <FaInfoCircle className="mr-2" />
                    View Details
                  </button>
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