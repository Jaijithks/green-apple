"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  onOpenQuote?: () => void;
}

const SERVICE_ITEMS = [
  {
    id: "catering",
    title: "Catering",
    category: "SIGNATURE FEASTS",
    description: "Thoughtfully crafted multi-cuisine menus for memorable celebrations.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    link: "#menu",
  },
  {
    id: "decoration",
    title: "Decoration & Parties",
    category: "AMBIENT STYLING",
    description: "Bespoke floral artistry, buffet tablescapes, and curated event aesthetics.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    link: "#events",
  },
  {
    id: "weddings",
    title: "Weddings",
    category: "ROYAL CELEBRATIONS",
    description: "Grand Kerala wedding feasts, live food counters, and seamless hospitality.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    link: "#events",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    category: "EXECUTIVE HOSPITALITY",
    description: "Punctual, hygienic, and premium catering for conferences & company galas.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    link: "#contact",
  },
];

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden text-white py-16 sm:py-24 bg-[#072018]"
    >
      {/* Full-bleed Dark Photographic Background (Rustic Wooden Table / Culinary Spread) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
          alt="Dark Rustic Culinary Background with Gourmet Food and Plating"
          fill
          className="object-cover object-center opacity-30 mix-blend-luminosity"
          sizes="100vw"
        />
        {/* Subtle Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#072018]/90 via-[#072018]/80 to-[#072018]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#072018]/60 to-[#072018]" />
      </div>

      {/* Main Services Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-emerald-400 font-semibold">
                OUR CORE DISCIPLINES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              Catering, Styling & Celebrations
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mt-3 sm:mt-0 leading-relaxed">
            Every dish prepared with fresh ingredients, every setting curated with finesse. Designed for Kerala&apos;s most cherished moments.
          </p>
        </div>

        {/* 3-4 Large Photographic Service Cards matching Pinterest Reference */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICE_ITEMS.map((service, index) => (
              <div
                key={service.id}
                className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-emerald-950/80 cursor-pointer flex flex-col justify-end p-6"
                onClick={onOpenQuote}
              >
                {/* Photographic Card Image with Smooth Scale Zoom */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-500" />

                {/* Card Content (Centered / Bottom-aligned White Serif Typography) */}
                <div className="relative z-10 space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-semibold block">
                    {service.category}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-md group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-light leading-relaxed opacity-90 group-hover:opacity-100 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="pt-2 flex items-center text-xs font-semibold tracking-wider text-white uppercase group-hover:text-emerald-400">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Quote Note */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-serif italic text-sm sm:text-base text-gray-300">
            &ldquo;From traditional Kerala sadyas to contemporary international buffets, we cater with devotion.&rdquo;
          </p>

          <button
            onClick={onOpenQuote}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Request Menu & Quotation
          </button>
        </div>
      </div>
    </section>
  );
}
