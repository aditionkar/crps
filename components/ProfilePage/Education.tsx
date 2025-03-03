import React, { useState } from "react";
import { Save, Edit2, Plus, Trash } from "lucide-react";

interface EducationEntry {
  id: number;
  institution: string;
  city: string;
  state: string;
}

interface EducationProps {
  education: EducationEntry[];
  onSave: (data: EducationEntry[]) => void;
}

export const Education: React.FC<EducationProps> = ({ education, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educationList, setEducationList] = useState<EducationEntry[]>(education);

  // Handle input change for a specific entry
  const handleChange = (id: number, field: keyof EducationEntry, value: string) => {
    setEducationList((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  // Add a new education entry
  const handleAdd = () => {
    const newEntry: EducationEntry = {
      id: Date.now(), // Unique ID
      institution: "",
      city: "",
      state: "",
    };
    setEducationList([...educationList, newEntry]);
  };

  // Remove an education entry
  const handleRemove = (id: number) => {
    setEducationList(educationList.filter((entry) => entry.id !== id));
  };

  // Save the education list
  const handleSave = () => {
    onSave(educationList);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
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
        <div>
          {educationList.map((entry) => (
            <div key={entry.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
              <input
                type="text"
                placeholder="Institution Name"
                value={entry.institution}
                onChange={(e) => handleChange(entry.id, "institution", e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={entry.city}
                  onChange={(e) => handleChange(entry.id, "city", e.target.value)}
                  className="w-1/2 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={entry.state}
                  onChange={(e) => handleChange(entry.id, "state", e.target.value)}
                  className="w-1/2 p-2 border rounded-md"
                />
              </div>
              <button
                onClick={() => handleRemove(entry.id)}
                className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <Trash className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAdd}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            <Plus className="w-4 h-4" />
            Add School/University
          </button>
        </div>
      ) : (
        <ul>
          {educationList.length > 0 ? (
            educationList.map((entry) => (
              <li key={entry.id} className="mb-2">
                <p className="text-lg font-semibold">{entry.institution}</p>
                <p className="text-gray-600">
                  {entry.city}, {entry.state}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No education details added yet.</p>
          )}
        </ul>
      )}
    </div>
  );
};
