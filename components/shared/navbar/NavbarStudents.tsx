"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function NavbarStudents() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-3xl font-semibold text-[#2e657a]">
                Company name
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            <Link href="/student">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                Home
              </button>
            </Link>

            <Link href="/student/view-jobs">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                View Jobs
              </button>
            </Link>

            <Link href="/student/applications">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                Applications
              </button>
            </Link>

            <Link href="/student/my-profile">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                My Profile
              </button>
            </Link>

            <Link href="/">
              <button className="w-full text-left px-4 py-2 bg-[#2e657a] text-white rounded-lg transition-all duration-200 hover:bg-[#548d97] hover:scale-105 hover:shadow-lg active:scale-95">
                Logout
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-white w-64 h-full shadow-md p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-5 right-5 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>

          <nav className="flex flex-col space-y-4 mt-10">
            <Link href="/student">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                Home
              </button>
            </Link>

            <Link href="/student/view-jobs">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                View Jobs
              </button>
            </Link>

            <Link href="/student/applications">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                Applications
              </button>
            </Link>

            <Link href="/student/my-profile">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                My Profile
              </button>
            </Link>

            <Link href="/">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 duration-200 hover:scale-105 hover:bg-[#dae1e6] rounded-md">
                Logout
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
