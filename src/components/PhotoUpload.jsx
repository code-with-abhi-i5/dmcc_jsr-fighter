import React, { useState, useRef } from "react";
import { Camera, X, RefreshCw } from "lucide-react";
import { validateImageFile } from "../utils/imageCompression";

export default function PhotoUpload({ value, onChange, error }) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      onChange(null, validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    onChange(file, null);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplace = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-1.5 relative z-10">
      <label className="block text-sm font-semibold text-slate-700 tracking-wide">
        Player Photo
        <span className="text-emerald-500 ml-1">*</span>
      </label>

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 sm:h-72 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              type="button"
              onClick={handleReplace}
              className="p-2.5 bg-white/90 hover:bg-emerald-600 text-slate-700 hover:text-white rounded-lg backdrop-blur-sm transition-all duration-200 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 bg-white/90 hover:bg-red-500 text-slate-700 hover:text-white rounded-lg backdrop-blur-sm transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl
            cursor-pointer transition-all duration-300 min-h-[200px] p-8 overflow-hidden bg-white
            ${
              dragActive
                ? "border-emerald-500 bg-emerald-50/50"
                : error
                  ? "border-red-300 bg-red-50/50"
                  : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50/50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-3 text-center relative z-10">
            <div
              className={`p-4 rounded-full transition-colors duration-300 ${
                dragActive 
                  ? "bg-emerald-100 text-emerald-600" 
                  : "bg-slate-100 text-slate-500 group-hover:text-emerald-600 group-hover:bg-emerald-50"
              }`}
            >
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-700">
                {dragActive ? "Drop photo here" : "Click to upload photo"}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                JPG, PNG, WebP (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-medium">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
