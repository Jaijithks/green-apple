import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MenuCard } from "@/models/MenuCard";
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

    const card = await MenuCard.findById(id);
    if (!card) {
      return NextResponse.json({ error: "Menu card not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: card });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch menu card" },
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
    const existing = await MenuCard.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Menu card not found" }, { status: 404 });
    }

    // Clean up old Cloudinary asset if replaced
    if (
      body.cloudinaryPublicId &&
      existing.cloudinaryPublicId &&
      body.cloudinaryPublicId !== existing.cloudinaryPublicId
    ) {
      await deleteMedia(existing.cloudinaryPublicId);
    }

    const updated = await MenuCard.findByIdAndUpdate(
      id,
      {
        title: body.title !== undefined ? body.title.trim() : existing.title,
        menuNumber: body.menuNumber !== undefined ? body.menuNumber.trim() : existing.menuNumber,
        image: body.image !== undefined ? body.image.trim() : existing.image,
        cloudinaryPublicId:
          body.cloudinaryPublicId !== undefined
            ? body.cloudinaryPublicId.trim()
            : existing.cloudinaryPublicId,
        whatsappMessage:
          body.whatsappMessage !== undefined
            ? body.whatsappMessage.trim()
            : existing.whatsappMessage,
        sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : existing.sortOrder,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Menu card updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update menu card" },
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

    const card = await MenuCard.findById(id);
    if (!card) {
      return NextResponse.json({ error: "Menu card not found" }, { status: 404 });
    }

    // Clean up Cloudinary asset if it was an uploaded file
    if (card.cloudinaryPublicId) {
      await deleteMedia(card.cloudinaryPublicId);
    }

    await MenuCard.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Menu card deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete menu card" },
      { status: 500 }
    );
  }
}
