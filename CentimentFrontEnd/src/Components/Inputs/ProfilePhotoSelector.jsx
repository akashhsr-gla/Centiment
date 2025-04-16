import React, { useRef, useState } from "react";
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const onChooseFile = () => inputRef.current.click();

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl("");
  };

  return (
    <div className="flex justify-center items-center relative w-32 h-32">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Circular Profile Section */}
      <div className="relative w-full h-full">
        <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <LuUser className="w-12 h-12 text-blue-500" />
          )}
        </div>

        {/* Upload Button */}
        {!image ? (
          <button
            onClick={onChooseFile}
            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-all"
          >
            <LuUpload className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-all"
          >
            <LuTrash className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
