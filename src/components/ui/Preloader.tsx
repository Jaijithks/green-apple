"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth loading duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    // Unmount after fade-out transition
    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#072018] text-white transition-all duration-700 ease-out select-none ${
        loading ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
      }`}
      aria-hidden={!loading}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-600/15 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Vertical Green Apple Logo Image (Transparent / Background-less) */}
        <div className="relative w-48 sm:w-56 h-36 sm:h-44 mb-6 animate-bounce-gentle">
          <Image
            src="/logo/green apple logo vertical.png"
            alt="Green Apple Catering & Event Company"
            fill
            priority
            className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Luxury Linear Progress Loader */}
        <div className="w-52 h-[2.5px] bg-white/10 rounded-full overflow-hidden relative shadow-inner mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-300 to-[#D4AF37] rounded-full animate-loader-slide" />
        </div>

        <p className="text-xs text-gray-300 font-light italic font-serif tracking-wide">
          Making moments memorable with flavours...
        </p>
      </div>

      <style jsx>{`
        @keyframes loaderSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-loader-slide {
          animation: loaderSlide 1.3s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounceGentle 2.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
