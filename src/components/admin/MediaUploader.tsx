"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Loader2,
  FileVideo,
} from "lucide-react";

interface MediaUploaderProps {
  value: string;
  mediaType: "image" | "video";
  onChange: (url: string, publicId?: string, detectedType?: "image" | "video") => void;
  folder?: string;
  label?: string;
  poster?: string;
  onPosterChange?: (posterUrl: string) => void;
}

export default function MediaUploader({
  value,
  mediaType,
  onChange,
  folder = "green-apple/gallery",
  label = "Upload Media",
  poster = "",
  onPosterChange,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCurrentValueVideo =
    mediaType === "video" ||
    (typeof value === "string" &&
      (value.endsWith(".mp4") ||
        value.endsWith(".webm") ||
        value.endsWith(".mov") ||
        value.includes("/video/upload/")));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const isVideoFile =
      file.type.startsWith("video/") ||
      file.name.match(/\.(mp4|mov|webm|mkv|avi)$/i) !== null;

    const detectedType: "image" | "video" = isVideoFile ? "video" : "image";

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("resourceType", isVideoFile ? "video" : "auto");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Media upload to Cloudinary failed");
      }

      onChange(data.url, data.publicId, detectedType);
    } catch (err: any) {
      setError(err?.message || "Failed to upload file. Please check Cloudinary credentials.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput || !urlInput.trim().startsWith("http")) {
      setError("Please provide a valid URL starting with http:// or https://");
      return;
    }
    setError(null);
    const isVideo =
      urlInput.includes(".mp4") ||
      urlInput.includes(".webm") ||
      urlInput.includes("/videos/") ||
      urlInput.includes("/video/upload/");

    onChange(urlInput.trim(), undefined, isVideo ? "video" : "image");
    setUrlInput("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[10px] text-gray-400 font-medium">
          {mediaType === "video" ? "MP4, WebM, MOV" : "PNG, JPG, WebP"}
        </span>
      </div>

      {/* Live Preview if media URL exists */}
      {value ? (
        <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-gray-200 bg-black group">
          {isCurrentValueVideo ? (
            <video
              src={value}
              poster={poster || undefined}
              controls
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <Image
              src={value}
              alt="Media Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          )}

          {/* Remove / Replace Overlay Button */}
          <div className="absolute top-3 right-3 z-10 flex space-x-2">
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105"
              title="Remove and upload different media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Mode Switch: Device File Upload vs URL Paste */}
          <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50 w-fit text-xs">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                mode === "upload"
                  ? "bg-white shadow-xs text-emerald-800 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Device</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                mode === "url"
                  ? "bg-white shadow-xs text-emerald-800 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Paste Media URL</span>
            </button>
          </div>

          {mode === "upload" ? (
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-7 text-center transition-all bg-gray-50/70 hover:bg-emerald-50/30 ${
                isUploading
                  ? "border-emerald-500 bg-emerald-50/20 cursor-wait"
                  : "border-gray-300 hover:border-emerald-500 cursor-pointer"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept={
                  mediaType === "video"
                    ? "video/mp4,video/webm,video/quicktime,video/*"
                    : "image/png,image/jpeg,image/webp,image/*"
                }
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col items-center justify-center space-y-2.5 text-emerald-700 py-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-900">
                      Uploading {mediaType === "video" ? "Video" : "Photo"} to Cloudinary...
                    </p>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      Processing and optimizing media CDN delivery
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-gray-500">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#229938] flex items-center justify-center mx-auto shadow-xs">
                    {mediaType === "video" ? (
                      <VideoIcon className="w-6 h-6" />
                    ) : (
                      <ImageIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Click to choose {mediaType === "video" ? "a Video" : "a Photo"} from your device
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {mediaType === "video"
                        ? "Supports MP4, MOV, WebM up to 100MB"
                        : "Supports JPG, PNG, WebP up to 15MB"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={
                    mediaType === "video"
                      ? "https://res.cloudinary.com/.../video.mp4"
                      : "https://res.cloudinary.com/.../photo.jpg"
                  }
                  className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
}
