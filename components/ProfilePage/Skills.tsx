import React from 'react';
import { Save, Edit2, Plus, X } from 'lucide-react';

interface SkillsProps {
  skills: string[];
  isEditing: boolean;
  onSave: (skills: string[]) => void;
  onEdit: () => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  isEditing,
  onSave,
  onEdit,
}) => {
  const [currentSkills, setCurrentSkills] = React.useState<string[]>(skills);
  const [newSkill, setNewSkill] = React.useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setCurrentSkills([...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave(currentSkills);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Skills</h2>
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
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Add a new skill"
              className="flex-1 p-2 border rounded-md text-black"
            />
            <button
              onClick={addSkill}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-black"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}