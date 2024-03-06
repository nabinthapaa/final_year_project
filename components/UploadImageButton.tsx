"use client";
import React, { useRef, useState } from "react";
import {encodeImageFileAsURL} from "@/libs/saveImage";

const ImageUploader = ({ image,handleChange,  label, key_, required }: any) => {
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
      const imageBase64 = await encodeImageFileAsURL(file);
      handleChange({ [key_]: imageBase64 });
      setImageName(file.name);
      setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageName("");
    setImageFile(null);
  };

  const handleImageNameClick = () => {
    if (imageRef.current) imageRef.current.click();
  };

  return (
    <>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left w-full">
        <span>{label}</span>
        <input
          id={key_}
          ref={imageRef}
          name="image"
          type="file"
          accept=".gif,.jpg,.jpeg,.png"
          className="sr-only"
          required={required}
          onChange={handleImageChange}
        />
        {imageName ? (
          <div className="flex items-center space-x-2">
            <span className="cursor-pointer" onClick={handleImageNameClick}>
              {imageName}
            </span>
            <button className="text-red-500" onClick={handleRemoveImage}>
              &#10005;
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleImageNameClick}>
            Select Image
          </label>
        )}
      </label>
    </>
  );
};

export default ImageUploader;
