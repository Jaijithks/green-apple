import { NextRequest, NextResponse } from "next/server";
import { uploadMedia, deleteMedia, isCloudinaryConfigured } from "@/lib/cloudinary";
import { requireAdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "green-apple/uploads";
      const isVideoFile = file?.type?.startsWith("video/") || file?.name?.match(/\.(mp4|mov|webm|mkv|avi)$/i);
      const resourceType = (formData.get("resourceType") as "auto" | "image" | "video") || (isVideoFile ? "video" : "auto");

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadMedia(buffer, folder, resourceType);

      return NextResponse.json({
        success: true,
        ...uploadResult,
        isCloudinaryConfigured: isCloudinaryConfigured(),
      });
    } else {
      const body = await req.json();
      const { dataUrl, folder = "green-apple/uploads", resourceType = "auto" } = body;

      if (!dataUrl) {
        return NextResponse.json({ error: "No image dataUrl provided" }, { status: 400 });
      }

      const uploadResult = await uploadMedia(dataUrl, folder, resourceType);

      return NextResponse.json({
        success: true,
        ...uploadResult,
        isCloudinaryConfigured: isCloudinaryConfigured(),
      });
    }
  } catch (error: any) {
    // Log the full error to the server terminal for debugging
    console.error("━━━ /api/upload ERROR ━━━");
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("HTTP code:", error?.http_code);
    if (error?.error) console.error("Cloudinary inner error:", error.error);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━");

    // Build a clear user-facing message
    let errorMsg = "Media upload failed.";

    if (error?.http_code === 403 || error?.message?.includes("403")) {
      errorMsg =
        "Cloudinary rejected the upload (403 Forbidden). Your API Key does not have upload permissions. " +
        "Go to Cloudinary Dashboard → Settings → API Keys and use the Master API Key & Secret, " +
        "or ensure your Access Key has full read+write permissions.";
    } else if (error?.message?.includes("not configured")) {
      errorMsg = error.message;
    } else {
      errorMsg =
        error?.error?.message ||
        error?.message ||
        "Media upload failed. Check the server terminal for details.";
    }

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("publicId");
    const resourceType = (searchParams.get("resourceType") as "image" | "video") || "image";

    if (!publicId) {
      return NextResponse.json({ error: "publicId is required" }, { status: 400 });
    }

    const success = await deleteMedia(publicId, resourceType);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete media" },
      { status: 500 }
    );
  }
}
