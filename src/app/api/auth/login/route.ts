import { NextRequest, NextResponse } from "next/server";
import { validateAdminCredentials, signAdminToken, setAdminSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await validateAdminCredentials(email, password);
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    const token = await signAdminToken(admin);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: admin,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Authentication error" },
      { status: 500 }
    );
  }
}
