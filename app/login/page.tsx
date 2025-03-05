"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/shared/navbar/Navbar";

const LogInPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        type: "", // Dynamically determined
    });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // For navigation

  const determineUserType = (email: string): string => {
    if (email.includes("@company.com")) {
        return "recruiter";
    }
    return "student"; // Default to student if not a recruiter
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        type: name === "email" ? determineUserType(value) : prevData.type, // Update type when email changes
    }));
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Incorrect email or password");
      }

      if (data.redirectTo) {
        router.push(data.redirectTo);
    } else {
        throw new Error("Unknown user type or missing redirect path");
    }

} catch (err: any) {
    setError(err.message || "Something went wrong. Please try again.");
}
};

  return (
    <div className="bg-white">
      <Navbar />
      <div className="min-w-screen flex items-center justify-center px-5 py-5 bg-white h-[90vh]">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden h-[60vh]"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-green-600 py-10 px-10">
              <Image src="/Security-bro2.svg" alt="Security" width={600} height={600} />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-5">Log in</h2>
              <p className="text-sm text-gray-600 mb-5">Log in to your account. It’s quick and easy!</p>
              {error && (
                <div className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-5 border border-red-400">
                  <span className="text-sm font-semibold">{error}</span>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="flex -mx-3 mt-5">
                  <div className="w-full px-3">
                    <label htmlFor="email" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 bg-white text-black"
                      placeholder="john.doe@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex -mx-3 mt-5">
                  <div className="w-full px-3">
                    <label htmlFor="password" className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-4 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 bg-white text-black"
                      placeholder="************"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex -mx-3 mt-5">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="block w-full text-white text-sm font-semibold rounded-lg px-4 py-2 bg-green-600 hover:bg-green-700"
                    >
                      Login
                    </button>
                    <Link
                      href="/signin"
                      className="mt-3 text-center block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2"
                    >
                      Don't have an account? Sign in here
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
