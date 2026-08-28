import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MenuItem } from "@/models/MenuItem";
import { requireAdminAuth } from "@/lib/auth";
import { MENU_ITEMS as fallbackBuilderItems } from "@/data/menuBuilderData";
import { menuItemsData as fallbackMenuItems } from "@/data/menu";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const serviceStyle = searchParams.get("serviceStyle");
    const search = searchParams.get("search");
    const activeOnly = searchParams.get("active") === "true";

    const conn = await connectToDatabase();
    if (!conn) {
      // Return combined fallback items
      let items = fallbackBuilderItems.map((item, idx) => {
        const matchingDefault = fallbackMenuItems.find(
          (m) => m.name.toLowerCase() === item.name.toLowerCase()
        );
        return {
          _id: item.id || `fb-${idx}`,
          name: item.name,
          slug: item.id || `item-${idx}`,
          category: item.category,
          description: item.description || matchingDefault?.description || "",
          price: matchingDefault?.price || 150,
          currency: matchingDefault?.currency || "₹",
          image: item.image || matchingDefault?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
          isPopular: !!item.isSignature || !!matchingDefault?.isPopular,
          isSignature: !!item.isSignature,
          serviceStyles: item.serviceStyles || ["buffet", "table-service"],
          sortOrder: idx + 1,
          isActive: true,
        };
      });

      if (category && category !== "all") {
        items = items.filter((it) => it.category === category);
      }
      if (serviceStyle) {
        items = items.filter((it) => it.serviceStyles.includes(serviceStyle as any));
      }
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(
          (it) => it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q)
        );
      }

      return NextResponse.json({
        success: true,
        data: items,
        total: items.length,
        source: "fallback",
      });
    }

    const filter: any = {};
    if (activeOnly) filter.isActive = true;
    if (category && category !== "all") filter.category = category;
    if (serviceStyle) filter.serviceStyles = serviceStyle;
    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const items = await MenuItem.find(filter).sort({ sortOrder: 1, name: 1 });

    if (items.length === 0 && !category && !search) {
      // If DB is empty, return fallback
      return NextResponse.json({
        success: true,
        data: fallbackBuilderItems.map((item, idx) => ({
          _id: item.id || `fb-${idx}`,
          name: item.name,
          slug: item.id || `item-${idx}`,
          category: item.category,
          description: item.description || "",
          price: 150,
          currency: "₹",
          image: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
          isPopular: !!item.isSignature,
          isSignature: !!item.isSignature,
          serviceStyles: item.serviceStyles || ["buffet", "table-service"],
          sortOrder: idx + 1,
          isActive: true,
        })),
        total: fallbackBuilderItems.length,
        source: "fallback-empty-db",
      });
    }

    return NextResponse.json({
      success: true,
      data: items,
      total: items.length,
      source: "database",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch menu items" },
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
    const {
      name,
      category,
      description,
      price,
      currency,
      image,
      cloudinaryPublicId,
      isPopular,
      isSignature,
      serviceStyles,
      sortOrder,
      isActive,
    } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Item name is required" }, { status: 400 });
    }
    if (!category || category.trim() === "") {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newItem = await MenuItem.create({
      name: name.trim(),
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      category: category.trim(),
      description: description?.trim() || "",
      price: Number(price) || 0,
      currency: currency?.trim() || "₹",
      image: image?.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      cloudinaryPublicId: cloudinaryPublicId?.trim() || undefined,
      isPopular: Boolean(isPopular),
      isSignature: Boolean(isSignature),
      serviceStyles: serviceStyles || ["buffet", "table-service"],
      sortOrder: Number(sortOrder) || 0,
      isActive: isActive !== false,
    });

    return NextResponse.json({
      success: true,
      message: "Menu item created successfully",
      data: newItem,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create menu item" },
      { status: 500 }
    );
  }
}
