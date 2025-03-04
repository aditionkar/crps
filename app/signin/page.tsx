"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { Navbar } from "@/components/shared/navbar/Navbar";

interface StudentFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  resume_link?: string;
}

interface CompanyFormData {
  company_name: string;
  email: string;
  password: string;
  industry: string;
  website?: string;
}

function SignUpPage() {
  const [userType, setUserType] = useState<"student" | "company">("student");
  const [studentData, setStudentData] = useState<StudentFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    resume_link: "",
  });
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    company_name: "",
    email: "",
    password: "",
    industry: "",
    website: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (userType === "student") {
      setStudentData({ ...studentData, [e.target.name]: e.target.value });
    } else {
      setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", userType === "student" ? studentData : companyData);
    // Add API call or validation logic here
  };

  return (
    <>
      <Navbar />
      <div className="min-w-screen flex items-center justify-center px-5 py-5 bg-white ">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-green-600 py-10 px-10">
              <Image src="/Security-bro.svg" alt="Security-bro" width={600} height={600} />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-5">Sign Up</h2>
              <p className="text-sm text-gray-600 mb-5">Create your account. It’s free and only takes a minute.</p>
              <div className="">
                <label className="text-xs font-semibold px-1">I am a:</label>
                <select
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-lg bg-white text-black"
                  onChange={(e) => setUserType(e.target.value as "student" | "company")}
                  value={userType}
                >
                  <option value="student">Student</option>
                  <option value="company">Company</option>
                </select>
              </div>
              <form onSubmit={handleSubmit} className="">
              {userType === "student" ? (
                  <>
                    <label htmlFor="name" className="text-xs font-semibold px-1">Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" value={studentData.name} onChange={handleChange} required className="input-field" />

                    <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                    <input type="email" name="email" placeholder="john.doe@example.com" value={studentData.email} onChange={handleChange} required className="input-field" />

                    <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                    <input type="password" name="password" placeholder="********" value={studentData.password} onChange={handleChange} required className="input-field" />

                    <label htmlFor="phone" className="text-xs font-semibold px-1">Phone</label>
                    <input type="text" name="phone" placeholder="123-456-7890" value={studentData.phone} onChange={handleChange} required className="input-field" />

                    <label htmlFor="resume_link" className="text-xs font-semibold px-1">Resume Link (optional)</label>
                    <input type="text" name="resume_link" placeholder="https://resume-link.com" value={studentData.resume_link} onChange={handleChange} className="input-field" />
                  </>
                ) : (
                  <>
                    <label htmlFor="company_name" className="text-xs font-semibold px-1">Company Name</label>
                    <input type="text" name="company_name" placeholder="Tech Solutions Inc." value={companyData.company_name} onChange={handleChange} required className="input-field" />

                    <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                    <input type="email" name="email" placeholder="contact@company.com" value={companyData.email} onChange={handleChange} required className="input-field" />

                    <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                    <input type="password" name="password" placeholder="********" value={companyData.password} onChange={handleChange} required className="input-field" />

                    <label htmlFor="industry" className="text-xs font-semibold px-1">Industry</label>
                    <input type="text" name="industry" placeholder="IT, Finance, Healthcare..." value={companyData.industry} onChange={handleChange} required className="input-field" />

                    <label htmlFor="website" className="text-xs font-semibold px-1">Website (optional)</label>
                    <input type="text" name="website" placeholder="https://company-website.com" value={companyData.website} onChange={handleChange} className="input-field" />
                  </>
                )}
                <button type="submit" className="block w-full text-white text-sm font-semibold mt-3 rounded-lg px-4 py-2 bg-green-600 hover:bg-green-700">Create Account</button>
              </form>
              <Link href="/login" className="mt-2 text-center block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2">
                Already have an account? Log in here
              </Link>
              <div className="mt-4 text-center text-xs text-gray-600 flex justify-center">
                By signing up, you agree to our <span className="text-indigo-500 ml-1">Terms</span> and <span className="text-indigo-500 ml-1">Privacy Policy</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .input-field {
        width: 100%;
        padding: 0.5rem 1rem; /* px-4 py-2 */
        font-size: 0.75rem; /* text-xs */
        border: 1px solid #E5E7EB; /* border-gray-200 */
        border-radius: 0.5rem; /* rounded-lg */
        background-color: white; /* bg-white */
        color: black; /* text-black */
    }

    .input-field:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 */
    }

      `}</style>
    </>
  );
}

export default SignUpPage;
