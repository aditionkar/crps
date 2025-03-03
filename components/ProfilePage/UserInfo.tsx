import React from "react";
import { Mail, Phone, Globe, Github, Linkedin } from "lucide-react";

interface UserInfoProps {
  name: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
  phone,
  portfolio,
  github,
  linkedin,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-4 mt-16">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">{name}</h1>
      
      {/* Two-column layout for contact and links */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-gray-600">
        {/* Column 1: Email & Phone */}
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${email}`} className="hover:text-blue-500">{email}</a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <a href={`tel:${phone}`} className="hover:text-blue-500">{phone}</a>
        </div>

        {/* Column 2: Portfolio, GitHub & LinkedIn */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <a href={portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            Portfolio
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4" />
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};
