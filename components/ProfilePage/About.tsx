import React, { useState } from "react";
import { Save, Edit2 } from "lucide-react";

interface AboutMeProps {
  about: string;
  onSave: (data: { about: string }) => void;
}

export const About: React.FC<AboutMeProps> = ({ about, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAbout, setCurrentAbout] = useState(about);

  const handleSave = () => {
    onSave({ about: currentAbout });
    setIsEditing(false); 
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">About Me</h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="w-full p-2 border rounded-md text-black"
          rows={6}
          value={currentAbout}
          onChange={(e) => setCurrentAbout(e.target.value)}
        />
      ) : (
        <p className="text-gray-700">{about || "Click edit to add your about section."}</p>
      )}
    </div>
  );
};
