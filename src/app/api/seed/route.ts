import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    const body = await req.json().catch(() => ({}));
    const { force = false, secret } = body;

    // Allow seed if logged in as admin OR if secret is provided in body
    const isAuthorized =
      !!session ||
      secret === process.env.ADMIN_JWT_SECRET ||
      secret === "green-apple-catering-init-secret";

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized to trigger database seed" },
        { status: 401 }
      );
    }

    const result = await seedDatabase(force);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Seeding failed" },
      { status: 500 }
    );
  }
}
