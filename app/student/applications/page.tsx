"use client";

import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import React, { useEffect, useState } from "react";
import { CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Application {
  my_application_id: number;
  student_id: number;
  jobs_id: number;
  title: string;
  company: string;
  description: string;
  status: string;
  applied_date: string;
  stage_applied_date: string;
  stage_under_review_date: string;
  stage_interview_date: string;
  stage_decision_date: string;
  applied_completed: boolean;
  under_review_completed: boolean;
  interview_completed: boolean;
  decision_completed: boolean;
  student_name?: string;
  email?: string;
  job_title?: string;
  company_name?: string;
}

const StudentsApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/my_applications");
        
        if (!response.ok) {
          // If response is not OK (e.g., 401 Unauthorized), handle accordingly
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.push("/login");
            return;
          }
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setApplications(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load your applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [router]);

  return (
    <>
      <NavbarStudents />
      <div className="bg-[#dae1e6] min-h-screen pt-10 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-[#2e657a] text-3xl md:text-4xl font-bold tracking-tight">
              My Applications
            </h1>
            <p className="text-[#548d97] mt-2">
              Track the status of your job applications here.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="w-full space-y-6">
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-[#548d97]">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-[#548d97]">No applications found. Start applying for jobs to see them here!</p>
              </div>
            ) : (
              applications.map((application) => (
                <div
                  key={application.my_application_id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-[#91b6be]/30"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Left Side: Application Details */}
                    <div className="space-y-4 flex-1">
                      <div>
                        <h2 className="text-[#1f2021] font-bold text-xl md:text-2xl mb-2">
                          {application.title}
                        </h2>
                        <p className="text-[#548d97] font-semibold text-sm">
                          Applied on:{" "}
                          {new Date(application.applied_date)
                            .toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            .replace(/(\d{1,2}),/, "$1th,")}
                        </p>
                      </div>
                      <div className="text-sm text-[#548d97]">
                        <p className="font-medium mb-1">
                          About {application.company}:
                        </p>
                        <p>{application.description}</p>
                      </div>
                      <div className="flex flex-col md:flex-col gap-3 w-full">
                        <div className="text-sm text-[#548d97] flex">
                          <span className="font-medium text-xl">Company:</span>{" "}
                          <span className="font-semibold text-xl text-[#2e657a] tracking-tight">
                            {application.company}
                          </span>
                        </div>
                        <div className="text-[#548d97] flex gap-2 w-full md:w-auto ">
                          <span className="font-semibold text-xl tracking-tight">
                            Status:
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-xl text-base tracking-tight font-medium border
        ${
          application.status === "Under Review"
            ? "bg-blue-100 text-blue-700 border-blue-500"
            : application.status === "Interview Scheduled"
            ? "bg-green-100 text-green-700 border-green-500"
            : application.status === "Application Rejected"
            ? "bg-red-100 text-red-700 border-red-500"
            : "bg-purple-100 text-purple-700 border-purple-500"
        }`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Status Timeline */}
                    <div className="flex flex-col items-end justify-between gap-4">
                      <div className="w-48">
                        {[
                          {
                            stage: "Applied",
                            date: application.stage_applied_date,
                            completed: application.applied_completed,
                          },
                          {
                            stage: "Under Review",
                            date: application.stage_under_review_date,
                            completed: application.under_review_completed,
                          },
                          {
                            stage: "Interview",
                            date: application.stage_interview_date,
                            completed: application.interview_completed,
                          },
                          {
                            stage: "Decision",
                            date: application.stage_decision_date,
                            completed: application.decision_completed,
                          },
                        ].map((stage, idx) => {
                          const formattedDate =
                            stage.date &&
                            stage.date !== "N/A" &&
                            stage.date !== "Rejected"
                              ? new Date(stage.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : stage.date;

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-2 mb-2"
                            >
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center
                ${
                  stage.completed
                    ? "bg-[#78bed8] border border-[#78bed8]"
                    : "bg-white border border-[#91b6be]"
                }`}
                              >
                                {stage.completed && (
                                  <CheckCircle className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#548d97]">
                                  {stage.stage}
                                </p>
                                <p
                                  className={`text-xs ${
                                    stage.date === "N/A" ||
                                    stage.date === "Rejected"
                                      ? "text-red-600"
                                      : "text-[#89a9c4]"
                                  }`}
                                >
                                  {formattedDate}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button className="flex items-center text-[#78bed8] hover:text-[#548d97] transition-colors">
                        <span className="text-sm font-medium">
                          View Details
                        </span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsApplications;