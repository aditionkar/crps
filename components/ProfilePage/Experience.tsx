import React, { useState } from "react";
import { Save, Edit2, Plus, Trash } from "lucide-react";

interface ExperienceEntry {
  id: number;
  company: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
}

interface ExperienceProps {
  experience: ExperienceEntry[];
  onSave: (data: ExperienceEntry[]) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ experience, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>(experience);

  const handleChange = (id: number, field: keyof ExperienceEntry, value: string) => {
    setExperienceList((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  const handleAdd = () => {
    const newEntry: ExperienceEntry = {
      id: Date.now(),
      company: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
    };
    setExperienceList([...experienceList, newEntry]);
  };

  const handleRemove = (id: number) => {
    setExperienceList(experienceList.filter((entry) => entry.id !== id));
  };

  const handleSave = () => {
    onSave(experienceList);
    setIsEditing(false);
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Experience</h2>
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
          {experienceList.map((entry) => (
            <div key={entry.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
              <input
                type="text"
                placeholder="Company Name"
                value={entry.company}
                onChange={(e) => handleChange(entry.id, "company", e.target.value)}
                className="w-full p-2 border rounded-md mb-2 text-black"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={entry.city}
                  onChange={(e) => handleChange(entry.id, "city", e.target.value)}
                  className="w-1/3 p-2 border rounded-md text-black"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={entry.state}
                  onChange={(e) => handleChange(entry.id, "state", e.target.value)}
                  className="w-1/3 p-2 border rounded-md text-black"
                />
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Start Date</label>
                  <input
                    type="month"
                    value={entry.startDate}
                    onChange={(e) => handleChange(entry.id, "startDate", e.target.value)}
                    className="p-2 border rounded-md text-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">End Date</label>
                  <input
                    type="month"
                    value={entry.endDate}
                    onChange={(e) => handleChange(entry.id, "endDate", e.target.value)}
                    className="p-2 border rounded-md text-black"
                    placeholder="End Date"
                  />
                </div>
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
            Add Experience
          </button>
        </div>
      ) : (
        <ul>
          {experienceList.length > 0 ? (
            experienceList.map((entry) => (
              <li key={entry.id} className="mb-4">
                <p className="text-lg font-semibold text-black">{entry.company}</p>
                <p className="text-gray-600">
                  {entry.city}, {entry.state}
                </p>
                <p className="text-gray-500">
                  {formatDate(entry.startDate)} -{" "}
                  {entry.endDate ? formatDate(entry.endDate) : "Present"}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No experience added yet.</p>
          )}
        </ul>
      )}
    </div>
  );
};
