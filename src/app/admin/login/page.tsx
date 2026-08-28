"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid login credentials");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#072018] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-radial from-emerald-900/30 via-transparent to-black/80 pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0A281E] border border-emerald-900/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="relative w-40 h-16 mx-auto flex items-center justify-center">
            <Image
              src="/logo/green apple logo vertical.png"
              alt="Green Apple Catering & Event Company"
              fill
              className="object-contain"
              sizes="160px"
              priority
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-normal text-white">CMS Administration</h1>
            <p className="text-xs text-gray-400 font-light mt-1">
              Sign in to manage Menu, Categories & Gallery
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-950/70 border border-red-800 text-red-200 text-xs px-3.5 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[#229938] hover:bg-[#1c822e] text-white font-semibold text-xs uppercase tracking-widest shadow-lg shadow-emerald-950 transition-all hover:scale-101 active:scale-98 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>


      </div>
    </div>
  );
}
