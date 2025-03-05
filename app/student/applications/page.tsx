"use client";

import { NavbarStudents } from '@/components/shared/navbar/NavbarStudents';
import React, { useEffect, useState } from 'react';

interface Application {
  my_application_id: number;
  role: string;
  company_name: string;
  status: string;
  applied_on: string;
}

function StudentsApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/my_applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <NavbarStudents />
      <div className="bg-[#dae1e6] min-h-screen flex flex-col items-center p-6">
        <h1 className="text-[#2e657a] text-3xl font-bold mb-6">My Applications</h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading applications...</p>
          ) : applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.my_application_id} className="border-b border-[#91b6be] pb-4 mb-4 w-full">
                <h2 className="text-[#1f2021] font-semibold text-xl">{application.role}</h2>
                <p className="text-[#548d97]">Company: {application.company_name}</p>
                <p className="text-[#89a9c4]">Status: {application.status}</p>
                <p className="text-[#1f2021]">Applied on: {new Date(application.applied_on).toDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No applications found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentsApplications;
