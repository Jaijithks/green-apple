import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MenuCategory } from "@/models/MenuCategory";
import { requireAdminAuth } from "@/lib/auth";
import { MENU_CATEGORIES as fallbackCategories } from "@/data/menuBuilderData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const conn = await connectToDatabase();
    if (!conn) {
      // Fallback
      return NextResponse.json({
        success: true,
        data: fallbackCategories.map((c, idx) => ({
          _id: c.id,
          name: c.name,
          slug: c.id,
          shortName: c.shortName,
          number: c.number,
          description: c.description || "",
          serviceStyles: c.serviceStyles || ["buffet", "table-service", "sadya"],
          sortOrder: idx + 1,
          isActive: true,
        })),
        source: "fallback",
      });
    }

    const query = activeOnly ? { isActive: true } : {};
    const categories = await MenuCategory.find(query).sort({ sortOrder: 1, name: 1 });

    if (categories.length === 0) {
      // Return fallback if database has no records yet
      return NextResponse.json({
        success: true,
        data: fallbackCategories.map((c, idx) => ({
          _id: c.id,
          name: c.name,
          slug: c.id,
          shortName: c.shortName,
          number: c.number,
          description: c.description || "",
          serviceStyles: c.serviceStyles || ["buffet", "table-service", "sadya"],
          sortOrder: idx + 1,
          isActive: true,
        })),
        source: "fallback-empty-db",
      });
    }

    return NextResponse.json({
      success: true,
      data: categories,
      source: "database",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch menu categories" },
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
    const { name, slug, shortName, number, description, serviceStyles, sortOrder, isActive } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existing = await MenuCategory.findOne({ slug: generatedSlug });
    if (existing) {
      return NextResponse.json(
        { error: `Category with slug '${generatedSlug}' already exists` },
        { status: 409 }
      );
    }

    const category = await MenuCategory.create({
      name: name.trim(),
      slug: generatedSlug,
      shortName: shortName?.trim() || name.trim(),
      number: number?.trim() || "0",
      description: description?.trim() || "",
      serviceStyles: serviceStyles || ["buffet", "table-service", "sadya"],
      sortOrder: Number(sortOrder) || 0,
      isActive: isActive !== false,
    });

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      data: category,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
