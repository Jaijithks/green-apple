import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

/**
 * Configure Cloudinary with server-side environment variables
 */
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured(): boolean {
  if (!cloudName || !apiKey || !apiSecret) return false;
  if (
    cloudName.includes("YOUR_CLOUD_NAME") ||
    apiKey.includes("YOUR_API_KEY") ||
    apiSecret.includes("YOUR_API_SECRET")
  ) {
    return false;
  }
  return true;
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

/**
 * Upload a media buffer or data URL to Cloudinary (supports photos and videos)
 */
export async function uploadMedia(
  fileData: string | Buffer,
  folder: string = "green-apple/gallery",
  resourceType: "auto" | "image" | "video" = "auto"
): Promise<{
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  resourceType?: string;
  duration?: number;
}> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local"
    );
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: resourceType || "auto",
    };

    if (Buffer.isBuffer(fileData)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload stream failed"));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resourceType: result.resource_type,
            duration: result.duration,
          });
        }
      );
      uploadStream.end(fileData);
    } else {
      cloudinary.uploader.upload(
        fileData,
        uploadOptions,
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resourceType: result.resource_type,
            duration: result.duration,
          });
        }
      );
    }
  });
}

/**
 * Delete a media asset from Cloudinary
 */
export async function deleteMedia(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicId || publicId.startsWith("mock-")) {
    return true;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    if (result.result === "ok") return true;

    // Try video if image was not found or vice versa
    if (resourceType === "image") {
      const videoResult = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
      return videoResult.result === "ok";
    }
    return false;
  } catch (error) {
    console.warn("Cloudinary asset deletion error:", error);
    return false;
  }
}
