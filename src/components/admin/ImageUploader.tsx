"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string, publicId?: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "green-apple/uploads",
  label = "Item Image",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      onChange(data.url, data.publicId);
    } catch (err: any) {
      setError(err?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput || !urlInput.trim().startsWith("http")) {
      setError("Please provide a valid image URL starting with http/https");
      return;
    }
    setError(null);
    onChange(urlInput.trim());
    setUrlInput("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>

      {/* Preview if image URL exists */}
      {value ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Toggle between upload and URL */}
          <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50 w-fit text-xs">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "upload" ? "bg-white shadow-xs text-emerald-800 font-semibold" : "text-gray-600"
              }`}
            >
              <Upload className="w-3.5 h-3.5 inline mr-1" />
              File Upload
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === "url" ? "bg-white shadow-xs text-emerald-800 font-semibold" : "text-gray-600"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5 inline mr-1" />
              Image URL
            </button>
          </div>

          {mode === "upload" ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50 hover:bg-emerald-50/20"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              {isUploading ? (
                <div className="flex flex-col items-center justify-center space-y-2 text-emerald-700 py-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xs font-medium">Uploading to Cloudinary...</span>
                </div>
              ) : (
                <div className="space-y-1.5 text-gray-500">
                  <ImageIcon className="w-7 h-7 mx-auto text-gray-400" />
                  <p className="text-xs font-medium text-gray-700">
                    Click to select an image from your computer
                  </p>
                  <p className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
