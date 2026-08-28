import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";
import { requireAdminAuth } from "@/lib/auth";
import { deleteMedia } from "@/lib/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const { id } = await params;
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await req.json();
    const existing = await GalleryItem.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    // Clean up old Cloudinary asset if replaced
    if (
      body.cloudinaryPublicId &&
      existing.cloudinaryPublicId &&
      body.cloudinaryPublicId !== existing.cloudinaryPublicId
    ) {
      await deleteMedia(existing.cloudinaryPublicId);
    }

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.type !== undefined) updateData.type = body.type;
    if (body.src !== undefined) updateData.src = body.src.trim();
    if (body.poster !== undefined) updateData.poster = body.poster.trim();
    if (body.alt !== undefined) updateData.alt = body.alt.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.cloudinaryPublicId !== undefined) updateData.cloudinaryPublicId = body.cloudinaryPublicId.trim();
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const updated = await GalleryItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Gallery item updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const { id } = await params;
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    if (item.cloudinaryPublicId) {
      await deleteMedia(item.cloudinaryPublicId);
    }

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
