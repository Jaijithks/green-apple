import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "./db";
import { AdminUser } from "@/models/AdminUser";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "green-apple-catering-default-jwt-secret-2026"
);

const COOKIE_NAME = "greenapple_admin_session";

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Sign JWT token valid for 7 days
 */
export async function signAdminToken(payload: AdminSessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Verify JWT token
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get current admin session from cookie store
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

/**
 * Set admin session cookie
 */
export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Clear admin session cookie
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Validate credentials against MongoDB or default initial environment admin
 */
export async function validateAdminCredentials(
  email: string,
  pass: string
): Promise<AdminSessionPayload | null> {
  const trimmedEmail = email.trim().toLowerCase();
  const defaultEmail = (process.env.ADMIN_EMAIL || "admin@greenapplecatering.in").toLowerCase();
  const defaultPass = process.env.ADMIN_INITIAL_PASSWORD || "GreenAppleAdmin@2026!";

  // 1. Check DB if connected
  const conn = await connectToDatabase();
  if (conn) {
    try {
      const user = await AdminUser.findOne({ email: trimmedEmail });
      if (user) {
        const isValid = await bcrypt.compare(pass, user.passwordHash);
        if (isValid) {
          user.lastLogin = new Date();
          await user.save();
          return {
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
      }
    } catch (e) {
      console.warn("DB user check failed, evaluating fallback admin config", e);
    }
  }

  // 2. Fallback to Initial Environment Admin
  if (trimmedEmail === defaultEmail && pass === defaultPass) {
    return {
      userId: "env-admin-root",
      email: defaultEmail,
      name: "Green Apple Admin",
      role: "admin",
    };
  }

  return null;
}

/**
 * Guard helper for API routes: returns 401 response if unauthorized
 */
export async function requireAdminAuth(
  req: NextRequest
): Promise<AdminSessionPayload | NextResponse> {
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  const authHeader = req.headers.get("Authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = cookieToken || bearerToken;
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: Admin session required" },
      { status: 401 }
    );
  }

  const session = await verifyAdminToken(token);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or expired session token" },
      { status: 401 }
    );
  }

  return session;
}
