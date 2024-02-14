"use client";
import ImageUploader from "@/components/UploadImageButton";
import React, { useState } from "react";

function Test() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with other data and imageUrl
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />
    </div>
  );
}

export default Test;
