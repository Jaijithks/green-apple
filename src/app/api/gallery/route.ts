import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";
import { requireAdminAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("active") === "true";

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        source: "disconnected",
      });
    }

    const filter: any = {};
    if (activeOnly) filter.isActive = true;
    if (category && category !== "All") filter.category = category;

    const items = await GalleryItem.find(filter).sort({ sortOrder: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: items,
      total: items.length,
      source: "database",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: "Database not connected. Please configure MONGODB_URI." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { title, type, src, poster, alt, category, cloudinaryPublicId, sortOrder, isActive } = body;

    if (!src || src.trim() === "") {
      return NextResponse.json({ error: "Media URL (src) is required" }, { status: 400 });
    }

    const newItem = await GalleryItem.create({
      title: title?.trim() || "",
      type: type === "video" ? "video" : "image",
      src: src.trim(),
      poster: poster?.trim() || "",
      alt: alt?.trim() || title?.trim() || "Green Apple Catering & Events showcase",
      category: category?.trim() || "All",
      cloudinaryPublicId: cloudinaryPublicId?.trim() || undefined,
      sortOrder: Number(sortOrder) || 0,
      isActive: isActive !== false,
    });

    return NextResponse.json({
      success: true,
      message: "Gallery item added successfully",
      data: newItem,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to add gallery item" },
      { status: 500 }
    );
  }
}
