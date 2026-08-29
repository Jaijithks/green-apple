"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Loader2, ShieldAlert } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  // Exclude auth check on login page itself
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthState("authenticated"); // Don't guard the login page
      return;
    }

    let cancelled = false;

    const verifySession = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();

        if (cancelled) return;

        if (data.authenticated) {
          setAuthState("authenticated");
        } else {
          setAuthState("unauthenticated");
          router.replace("/admin/login");
        }
      } catch {
        if (!cancelled) {
          setAuthState("unauthenticated");
          router.replace("/admin/login");
        }
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [pathname, isLoginPage, router]);

  // Login page: no shell, just render children
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying session
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-xs text-gray-500 font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated: show brief message while redirecting
  if (authState === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <ShieldAlert className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-sm text-gray-700 font-semibold">Session expired</p>
          <p className="text-xs text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Authenticated: render admin shell
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row text-gray-900 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:flex-shrink-0 sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] z-10 flex">
            <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminNavbar onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
