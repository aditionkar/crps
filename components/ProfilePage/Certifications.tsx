import React, { useState } from "react";
import { Save, Edit2, Upload } from "lucide-react";

interface Certificate {
  id: number;
  image: string; // Base64 or URL
}

export const Certifications: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setCertificates((prev) => [
          ...prev,
          { id: Date.now(), image: reader.result as string },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle Save
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Certifications</h2>
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

      {isEditing && (
        <label className="flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
          <Upload className="w-5 h-5 text-black" />
          <p className="text-black">Upload Certificate</p>
          <input
            type="file"
            accept="image/*"
            className="hidden "
            onChange={handleImageUpload}
          />
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="border p-2 rounded-lg shadow">
            <img src={cert.image} alt="Certificate" className="w-full h-40 object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
