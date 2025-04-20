import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#f2fafb] p-8 text-[#2e657a] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#78bed8] p-6">
          <h1 className="text-3xl font-bold text-white">Sophie Dubois</h1>
          <p className="text-[#e3fbff]">DevOps Engineer</p>
          <p className="text-[#c6f6ff]">sophie.dubois@codeworks.fr</p>
          <p className="text-[#c6f6ff]">+91 98765 43210</p>
          
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Education</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>B.Sc in Computer Science -SRM University, Kattankulathur (2017 - 2021)</li>
              <li>CGPA: 8.7 / 10</li>
              <li>Relevant Coursework: Cloud Computing, Networking, Operating Systems, System Administration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Technical Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Jenkins", "Python", "Ansible", "Git"].map((skill) => (
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
                <h3 className="font-semibold">Cloud Infrastructure Automation</h3>
                <p className="text-sm text-[#548d97]">
                  Automated the provisioning of cloud infrastructure using Terraform and AWS to scale web applications efficiently.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">CI/CD Pipeline with Jenkins</h3>
                <p className="text-sm text-[#548d97]">
                  Built a fully automated CI/CD pipeline using Jenkins, Docker, and Kubernetes to streamline the deployment process.
                </p>
              </li>
              <li>
                <h3 className="font-semibold">Monitoring and Alerting System</h3>
                <p className="text-sm text-[#548d97]">
                  Implemented a comprehensive monitoring system with Prometheus and Grafana to track infrastructure performance and uptime.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Certifications</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>AWS Certified Solutions Architect – Associate</li>
              <li>Certified Kubernetes Administrator (CKA)</li>
              <li>Docker Certified Associate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Achievements</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Completed a 6-month internship with AWS Cloud Support</li>
              <li>Led the automation of server configurations for a large-scale enterprise project</li>
              <li>Contributed to the open-source project "Kubernetes Dashboard"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Extracurricular Activities</h2>
            <ul className="mt-2 list-disc list-inside text-[#2e657a]">
              <li>Active participant in hackathons and coding competitions</li>
              <li>Volunteer at tech events to mentor juniors on DevOps practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold border-b border-[#91b6be] pb-1">Interests</h2>
            <p className="mt-2 text-[#2e657a]">Cloud Technologies, Automation, DevOps, Open-source Contributions, Running</p>
          </section>
        </div>
      </div>
    </div>
  );
}
