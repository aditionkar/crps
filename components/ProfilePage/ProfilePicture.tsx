import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ProfilePictureProps {
  profileUrl: string;
  bannerUrl: string;
  onProfileChange: (url: string) => void;
  onBannerChange: (url: string) => void;
}

const predefinedBanners = [
  'https://via.placeholder.com/800x200?text=Banner+1',
  'https://via.placeholder.com/800x200?text=Banner+2',
  'https://via.placeholder.com/800x200?text=Banner+3',
  'https://via.placeholder.com/800x200?text=Banner+4',
  'https://via.placeholder.com/800x200?text=Banner+5',
];

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profileUrl,
  bannerUrl,
  onProfileChange,
  onBannerChange,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full">
      {/* Banner Section */}
      <div className="relative h-48 bg-gray-200">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <label
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setModalOpen(true)}
            >
              <Upload className="w-6 h-6" />
              <span>Upload Banner</span>
            </label>
          </div>
        )}
      </div>

      {/* Modal for Predefined Banners */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Choose a Banner</h2>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {predefinedBanners.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Banner ${index + 1}`}
                  className="cursor-pointer w-full h-20 object-cover rounded-lg border hover:border-blue-500"
                  onClick={() => {
                    onBannerChange(url);
                    setModalOpen(false);
                  }}
                />
              ))}
            </div>
            <div className="mt-4">
              <label className="cursor-pointer flex items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>Upload Custom Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0], onBannerChange);
                      setModalOpen(false);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0], onProfileChange);
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
