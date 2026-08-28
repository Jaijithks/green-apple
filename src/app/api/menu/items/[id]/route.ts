import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MenuItem } from "@/models/MenuItem";
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

    const item = await MenuItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch menu item" },
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
    const existingItem = await MenuItem.findById(id);
    if (!existingItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Clean up old Cloudinary asset if replaced
    if (
      body.cloudinaryPublicId &&
      existingItem.cloudinaryPublicId &&
      body.cloudinaryPublicId !== existingItem.cloudinaryPublicId
    ) {
      await deleteMedia(existingItem.cloudinaryPublicId);
    }

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.currency !== undefined) updateData.currency = body.currency.trim();
    if (body.image !== undefined) updateData.image = body.image.trim();
    if (body.cloudinaryPublicId !== undefined) updateData.cloudinaryPublicId = body.cloudinaryPublicId.trim();
    if (body.isPopular !== undefined) updateData.isPopular = Boolean(body.isPopular);
    if (body.isSignature !== undefined) updateData.isSignature = Boolean(body.isSignature);
    if (body.serviceStyles !== undefined) updateData.serviceStyles = body.serviceStyles;
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedItem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update menu item" },
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

    const item = await MenuItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if existing
    if (item.cloudinaryPublicId) {
      await deleteMedia(item.cloudinaryPublicId);
    }

    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
