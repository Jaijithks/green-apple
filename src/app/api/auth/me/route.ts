import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDbStatus } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAdminSession();
    const dbStatus = await getDbStatus();

    return NextResponse.json({
      authenticated: !!session,
      user: session || null,
      dbStatus,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to check session" },
      { status: 500 }
    );
  }
}
