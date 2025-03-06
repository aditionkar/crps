"use client";
import { useState } from "react";
import { About } from "@/components/ProfilePage/About";
import { ProfilePicture } from "@/components/ProfilePage/ProfilePicture";
import { Projects } from "@/components/ProfilePage/Projects";
import { Education } from "@/components/ProfilePage/Education";
import { Skills } from "@/components/ProfilePage/Skills";
import { Certifications } from "@/components/ProfilePage/Certifications";
import { Experience } from "@/components/ProfilePage/Experience";
import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import { UserInfo } from "@/components/ProfilePage/UserInfo";

// Defining interfaces
interface EducationEntry {
  id: number;
  institution: string;
  city: string;
  state: string;
}

interface ExperienceEntry {
  id: number;
  company: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

function App() {
  const [educationData, setEducationData] = useState<EducationEntry[]>([]);
  const [experience, setExperience] = useState<ExperienceEntry[]>([]); // ✅ Fixed Type
  const [aboutText, setAboutText] = useState("This is my about section.");
  const [profile, setProfile] = useState({
    profileUrl: "",
    bannerUrl: "",
    name: "Aditi Onkar",
    email: "aditionkar03@gmail.com",
    phone: "+91 91998 07232",
    about: "A passionate developer...",
    portfolio: "https://your-portfolio-url.com",
    github: "https://github.com/aditionkar",
    linkedin: "https://linkedin.com/in/aditionkar",
    interests: ["Web Development", "Mobile Apps"],
    experience: 3,
    projects: [] as Project[],
    domains: ["Web Development", "Machine Learning"],
    skills: ["JavaScript", "React", "Node.js"],
  });

  const [editing, setEditing] = useState({
    about: false,
    projects: false,
    domains: false,
    skills: false,
  });

  return (
    <>
      <NavbarStudents />
      <div className="min-h-screen bg-[#dae1e6] ">
        <div className="bg-[#dae1e6] w-full h-10"></div>
        <ProfilePicture
          profileUrl={profile.profileUrl}
          bannerUrl={profile.bannerUrl}
          onProfileChange={(url) => setProfile({ ...profile, profileUrl: url })}
          onBannerChange={(url) => setProfile({ ...profile, bannerUrl: url })}
        />

        <div className="container mx-auto px-4 pb-8">
          <UserInfo
            name={profile.name}
            email={profile.email}
            phone={profile.phone}
            portfolio={profile.portfolio}
            github={profile.github}
            linkedin={profile.linkedin}
          />
          <About
            about={aboutText}
            onSave={(data) => setAboutText(data.about)}
          />
          <Projects
            projects={profile.projects}
            isEditing={editing.projects}
            onSave={(projects) => {
              setProfile({ ...profile, projects });
              setEditing({ ...editing, projects: false });
            }}
            onEdit={() => setEditing({ ...editing, projects: true })}
          />
          <Education
            education={educationData}
            onSave={(data) => setEducationData(data)}
          />
          <Skills
            skills={profile.skills}
            isEditing={editing.skills}
            onSave={(skills) => {
              setProfile({ ...profile, skills });
              setEditing({ ...editing, skills: false });
            }}
            onEdit={() => setEditing({ ...editing, skills: true })}
          />
          <Certifications />
          <Experience
            experience={experience}
            onSave={(data) => setExperience(data)}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default App;
