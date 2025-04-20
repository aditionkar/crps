import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f2fafb] p-8 text-[#2e657a] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#78bed8] p-6">
          <h1 className="text-3xl font-bold text-white">Aria Venkatsh</h1>
          <p className="text-[#e3fbff]">Frontend Developer</p>
          <p className="text-[#c6f6ff]">aria.venkatesh@mail.com</p>
          <p className="text-[#c6f6ff]">+91 98765 43210</p>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Education</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>B.Tech in Computer Science - SRM University, Kattankulathur (2021 - 2025)</li>
              <li>GPA: 8.7 / 10</li>
              <li>Relevant Coursework: Web Development, Data Structures, Algorithms, Human-Computer Interaction, Operating Systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Technical Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Git",
                "Figma",
                "Node.js",
                "Express",
                "MongoDB"
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-[#c6f6ff] text-[#2e657a] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Projects</h2>
            <ul className="mt-2 space-y-3">
              <li>
                <h3 className="font-semibold">Portfolio Website</h3>
                <p className="text-sm text-[#548d97]">
                  Developed a personal portfolio using Next.js and Tailwind CSS to showcase projects, skills, and resume. Fully responsive and deployed on Vercel.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Task Manager App</h3>
                <p className="text-sm text-[#548d97]">
                  Built a task management app with React, managing tasks with localStorage. Includes filtering and dark mode.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Carbon Footprint Tracker</h3>
                <p className="text-sm text-[#548d97]">
                  Created a web app that calculates users' carbon footprint based on lifestyle inputs using React and stores data via a Python backend.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Certifications</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Frontend Web Developer Nanodegree - Udacity</li>
              <li>Responsive Web Design - freeCodeCamp</li>
              <li>JavaScript Algorithms and Data Structures - freeCodeCamp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Achievements</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Secured 2nd place in college-level Hackathon 2024</li>
              <li>Top 10 finalist in DevSoc UI/UX Challenge</li>
              <li>Maintainer of open source frontend component library</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Extracurricular Activities</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Web Lead at Google Developer Student Club, XYZ University</li>
              <li>Organized weekly coding sessions and UI/UX workshops</li>
              <li>Volunteered at Tech Fest 2023 as a design and media coordinator</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Interests</h2>
            <p className="mt-2 text-[#2e657a]">UI/UX Design, Open Source Contributions, Frontend Frameworks, Design Systems, Anime, Digital Illustration</p>
          </section>
        </div>
      </div>
    </div>
  );
}
