import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MenuCard } from "@/models/MenuCard";
import { requireAdminAuth } from "@/lib/auth";
import { DEFAULT_MENU_CARDS } from "@/data/realMenusData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_MENU_CARDS,
        total: DEFAULT_MENU_CARDS.length,
        source: "fallback-disconnected",
      });
    }

    const filter: any = {};
    if (activeOnly) filter.isActive = true;

    const cards = await MenuCard.find(filter).sort({ sortOrder: 1, createdAt: 1 });

    if (cards.length === 0 && !activeOnly) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        source: "database",
      });
    }

    if (cards.length === 0 && activeOnly) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_MENU_CARDS,
        total: DEFAULT_MENU_CARDS.length,
        source: "fallback-empty",
      });
    }

    return NextResponse.json({
      success: true,
      data: cards,
      total: cards.length,
      source: "database",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch menu cards" },
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
        { error: "Database not connected. Please check MONGODB_URI in .env.local" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      title,
      menuNumber,
      image,
      cloudinaryPublicId,
      whatsappMessage,
      sortOrder,
      isActive,
    } = body;

    if (!image || image.trim() === "") {
      return NextResponse.json(
        { error: "Menu card image is required" },
        { status: 400 }
      );
    }

    const totalCount = await MenuCard.countDocuments();
    const formattedNumber =
      menuNumber?.trim() ||
      String(totalCount + 1).padStart(2, "0");

    const newMenuCard = await MenuCard.create({
      title: title?.trim() || `Menu ${formattedNumber}`,
      menuNumber: formattedNumber,
      image: image.trim(),
      cloudinaryPublicId: cloudinaryPublicId?.trim() || undefined,
      whatsappMessage:
        whatsappMessage?.trim() ||
        `Hello Green Apple Catering! I saw ${title?.trim() || `Menu ${formattedNumber}`} on your website and would like to get a quote.`,
      sortOrder: Number(sortOrder) || totalCount + 1,
      isActive: isActive !== false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Menu card uploaded successfully",
        data: newMenuCard,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create menu card" },
      { status: 500 }
    );
  }
}
