import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f2fafb] p-8 text-[#2e657a] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#78bed8] p-6">
          <h1 className="text-3xl font-bold text-white">Meera Kapoor</h1>
          <p className="text-[#e3fbff]">UI/UX Designer</p>
          <p className="text-[#c6f6ff]">meera.kapoor@techmail.io</p>
          <p className="text-[#c6f6ff]">+91 90123 45678</p>
          
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Education</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>B.Des in Communication Design - SRM University, Kattankulathur (2020 - 2024)</li>
              <li>CGPA: 9.1 / 10</li>
              <li>Relevant Coursework: Human-Centered Design, Visual Communication, UX Research, Interaction Design, Typography</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Design Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Wireframing", "Prototyping", "User Research", "Design Thinking", "Accessibility", "Responsive Design"].map((skill) => (
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
                <h3 className="font-semibold">Healthcare Mobile App Redesign</h3>
                <p className="text-sm text-[#548d97]">
                  Conducted UX research and redesigned a mobile app for rural health workers, improving usability and reducing task time by 40%.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">College Event Website UI</h3>
                <p className="text-sm text-[#548d97]">
                  Designed a responsive web interface for an annual college fest, achieving a 3x increase in visitor engagement.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Design System for NGO</h3>
                <p className="text-sm text-[#548d97]">
                  Developed a scalable design system for an NGO platform, enabling consistent branding across all touchpoints.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Certifications</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Google UX Design Certificate - Coursera</li>
              <li>Interaction Design Specialization - UC San Diego</li>
              <li>Design Thinking - IDEO U</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Achievements</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Winner of National UX Hackathon 2023</li>
              <li>Design featured in Figma Community Gallery</li>
              <li>Organized UI/UX Bootcamp for 150+ students</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Extracurricular Activities</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Design Head, Creative Arts Club</li>
              <li>Volunteer for UX Accessibility Workshops</li>
              <li>Freelance UI designer for local startups</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Interests</h2>
            <p className="mt-2 text-[#2e657a]">Inclusive Design, Mobile UX, Typography, Visual Storytelling, Hiking, Digital Art</p>
          </section>
        </div>
      </div>
    </div>
  );
}