"use client";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface Applicant {
  mock_applicant_id: number;
  job_id: number;
  student_id: number;
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
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get("/api/mock_applicants");
      setApplicants(response.data);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
      toast.error("Failed to load applicants");
    }
  };

  const deleteApplicantRecord = async (applicantId: number) => {
    try {
      await axios.delete(`/api/mock_applicants?applicantId=${applicantId}`);
      console.log("Applicant record deleted successfully");
      
      // Update local state to remove the applicant from the list
      setApplicants((prev) => 
        prev.filter((app) => app.mock_applicant_id !== applicantId)
      );
    } catch (error) {
      console.error("Failed to delete applicant record:", error);
      // Don't show an error toast as this is a background operation
    }
  };

  const handleAccept = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleScheduleInterview = async () => {
    if (selectedApplicant && selectedDate && selectedTime) {
      try {
        setIsSubmitting(true);

        const modeSelect = document.querySelector(
          "select"
        ) as HTMLSelectElement;
        const mode = modeSelect ? modeSelect.value : "Online";

        const formattedDate = new Date(selectedDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        const formattedTime = new Date(
          `2000-01-01T${selectedTime}`
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const sqlDate = selectedDate;
        const sqlTime = selectedTime;

        // First, schedule the interview
        const interviewResponse = await fetch("/api/interviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            my_application_id: selectedApplicant.mock_applicant_id,
            applicantName: selectedApplicant.name,
            jobTitle: selectedApplicant.jobTitle,
            date: sqlDate,
            time: sqlTime,
            formattedDate: formattedDate,
            formattedTime: formattedTime,
            mode: mode,
            status: "Scheduled",
            company: selectedApplicant.company,
          }),
        });

        if (!interviewResponse.ok) {
          const errorData = await interviewResponse.json();
          throw new Error(errorData.error || "Failed to schedule interview");
        }

        // Then, update the application status
        const updateResponse = await fetch("/api/my_applications", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: selectedApplicant.student_id,
            jobId: selectedApplicant.job_id,
            action: "accept",
            interviewDate: sqlDate, // Using the same date selected for the interview
          }),
        });

        if (!updateResponse.ok) {
          console.error(
            "Failed to update application status:",
            await updateResponse.text()
          );
          // Continue with the rest of the function even if this fails
        } else {
          console.log("Application status updated successfully");
        }

        const dateTime = `${selectedDate}T${selectedTime}`;
        setScheduledInterviews((prev) => ({
          ...prev,
          [selectedApplicant.mock_applicant_id]: dateTime,
        }));

        // Delete the record from mock_applicants table
        await deleteApplicantRecord(selectedApplicant.mock_applicant_id);

        setSelectedApplicant(null);
        setSelectedDate("");
        setSelectedTime("");

        toast.success("Interview scheduled successfully!");
      } catch (error) {
        console.error("Failed to schedule interview:", error);
        toast.error(
          `Failed to schedule interview: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReject = async (applicant: Applicant) => {
    try {
      // First, update the local state
      setRejectedApplicants((prev) => [...prev, applicant.mock_applicant_id]);

      // Then, update the application status in the database
      const updateResponse = await fetch("/api/my_applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: applicant.student_id,
          jobId: applicant.job_id,
          action: "reject",
        }),
      });

      if (!updateResponse.ok) {
        console.error(
          "Failed to update application status:",
          await updateResponse.text()
        );
        // Continue showing the toast even if this fails
      } else {
        console.log("Application status updated successfully");
      }

      // Delete the record from mock_applicants table
      await deleteApplicantRecord(applicant.mock_applicant_id);

      toast.success("Application rejected");
    } catch (error) {
      console.error("Failed to reject application:", error);
      // Don't show error toast since we're proceeding even if status update fails
    }
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
      <Toaster position="top-center" />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "green",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "red",
            },
          },
        }}
      />
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
                          {formatDateTime(
                            scheduledInterviews[applicant.mock_applicant_id]
                          )}
                        </p>
                      ) : rejectedApplicants.includes(
                          applicant.mock_applicant_id
                        ) ? (
                        <p className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-md shadow-sm border border-red-400">
                          Application Rejected
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-7 px-8">
                      <a
                        href={`/resume/${applicant.resumeLink
                          .split("/")
                          .pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#78bed8] text-white px-4 py-2 rounded-[6px] hover:bg-[#548d97] transition-colors flex items-center justify-center"
                      >
                        View Resume
                      </a>
                      {!scheduledInterviews[applicant.mock_applicant_id] &&
                        !rejectedApplicants.includes(
                          applicant.mock_applicant_id
                        ) && (
                          <>
                            <button
                              onClick={() => handleAccept(applicant)}
                              className="relative px-4 py-2  isolation-auto z-10 border-2 border-green-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-[100%] before:bg-[#1C823A] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm  text-black bg-white  rounded-[6px] shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Accept & Schedule
                            </button>
                            <button
                              onClick={() => handleReject(applicant)}
                              className="relative px-4 py-2 isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-[100%] before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm text-black bg-white rounded-[6px] shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
                <div>
                  <label className="block text-sm font-medium text-[#2e657a] mb-1">
                    Interview Mode
                  </label>
                  <select
                    className="border border-gray-300 p-2 rounded-md w-full text-black"
                    defaultValue="Online"
                  >
                    <option value="Online">Online (Video)</option>
                    <option value="In-Person">In-Person</option>
                  </select>
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
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  className="bg-[#78bed8] text-white px-4 py-2 rounded-md hover:bg-[#548d97] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Scheduling..." : "Confirm"}
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