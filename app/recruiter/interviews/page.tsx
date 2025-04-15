"use client";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useEffect, useState } from "react";
import { FaVideo, FaUser, FaCalendarAlt, FaClock, FaSync } from "react-icons/fa";
import { motion } from "framer-motion";

interface Interview {
  interview_id?: number;
  my_application_id: number;
  applicantName: string;
  jobTitle: string;
  date: string;
  time: string;
  formatted_date?: string;
  formatted_time?: string;
  mode: string;
  status: "Scheduled" | "Completed";
}

function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInterviews = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("/api/interviews"); 
      
      if (!response.ok) {
        throw new Error("Failed to fetch interviews");
      }
      
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleRefresh = () => {
    fetchInterviews();
  };

  const formatDateIfNeeded = (interview: Interview) => {
    if (interview.formatted_date) {
      return interview.formatted_date;
    }
    
    try {
      // Handle SQL date format (YYYY-MM-DD)
      const date = new Date(interview.date);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      });
    } catch (error) {
      return interview.date; // Fall back to the original value
    }
  };

  const formatTimeIfNeeded = (interview: Interview) => {
    if (interview.formatted_time) {
      return interview.formatted_time;
    }
    
    try {
      // Handle SQL time format (HH:MM:SS)
      const time = new Date(`2000-01-01T${interview.time}`);
      return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return interview.time; // Fall back to the original value
    }
  };

  return (
    <>
      <NavbarRecruiters />
      <div className="bg-gradient-to-b from-[#dae1e6] to-[#b8c6cf] min-h-screen flex flex-col items-center p-6">
        <div className="flex justify-between items-center w-full max-w-4xl mb-8">
          <h1 className="text-[#2e657a] text-4xl font-bold text-center">
            Upcoming Interviews
          </h1>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-[#548d97] hover:bg-[#3a6570] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaSync className={`${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="w-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2e657a]"></div>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-6">
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <motion.div
                  key={`${interview.interview_id || interview.my_application_id}-${index}`}
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
                      <span>Date: {formatDateIfNeeded(interview)}</span>
                    </div>
                    <div className="flex items-center text-[#548d97]">
                      <FaClock className="mr-2" />
                      <span>Time: {formatTimeIfNeeded(interview)}</span>
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
        )}
      </div>
    </>
  );
}

export default Interviews;