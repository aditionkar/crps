import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f2fafb] p-8 text-[#2e657a] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#78bed8] p-6">
          <h1 className="text-3xl font-bold text-white">Lucas Zhang</h1>
          <p className="text-[#e3fbff]">Backend Engineer</p>
          <p className="text-[#c6f6ff]">lucas.zhang@portfolio.dev</p>
          <p className="text-[#c6f6ff]">+91 98765 43210</p>
          
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Education</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>B.Tech in Information Technology - SRM University, Kattankulathur (2020 - 2024)</li>
              <li>GPA: 8.9 / 10</li>
              <li>Relevant Coursework: Database Systems, Operating Systems, Distributed Systems, Cloud Computing, Software Architecture</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Technical Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Node.js",
                "Express.js",
                "TypeScript",
                "MongoDB",
                "PostgreSQL",
                "Redis",
                "Docker",
                "Kubernetes",
                "Git",
                "CI/CD",
                "GraphQL",
                "AWS"
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
                <h3 className="font-semibold">API Microservices Framework</h3>
                <p className="text-sm text-[#548d97]">
                  Built a scalable API framework using Express.js and Redis for rate limiting and caching. Integrated JWT-based authentication and Swagger documentation.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">DevOps Automation Tool</h3>
                <p className="text-sm text-[#548d97]">
                  Created a Node.js CLI to automate deployment pipelines with Docker and GitHub Actions, reducing setup time for new backend services.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Real-time Chat Server</h3>
                <p className="text-sm text-[#548d97]">
                  Developed a WebSocket-based real-time messaging backend with user presence tracking, hosted on AWS with load balancing.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Certifications</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Backend Development - Coursera (University of Michigan)</li>
              <li>AWS Certified Cloud Practitioner</li>
              <li>Docker Mastery - Udemy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Achievements</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Finalist in Smart India Hackathon 2023</li>
              <li>Built a backend that handled over 1 million requests/day during inter-college tech fest</li>
              <li>Contributed to open source backend library for real-time APIs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Extracurricular Activities</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Backend Lead at CodeChef VIT Chapter</li>
              <li>Speaker at APICon 2024 on "Scaling Node.js with Microservices"</li>
              <li>Mentored junior students in backend dev through peer tutoring programs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Interests</h2>
            <p className="mt-2 text-[#2e657a]">Cloud-native apps, Distributed Systems, Scalability Patterns, Microservices, Ping Pong, Tech Blogging</p>
          </section>
        </div>
      </div>
    </div>
  );
}
