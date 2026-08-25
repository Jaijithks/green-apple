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
    description: "Thoughtfully crafted menus for memorable celebrations.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    objectPosition: "object-center",
  },
  {
    id: "decoration",
    title: "Decoration & Parties",
    category: "ARTFUL SETTINGS",
    description: "Designing stylish setups, buffet tablescapes, and curated party experiences.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    objectPosition: "object-center",
  },
  {
    id: "weddings",
    title: "Weddings",
    category: "ROYAL CELEBRATIONS",
    description: "Grand Kerala wedding feasts, live food counters, and seamless hospitality.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    objectPosition: "object-[center_30%]",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    category: "EXECUTIVE HOSPITALITY",
    description: "Purposeful, hygienic, and premium catering for corporate & company gatherings.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    objectPosition: "object-center",
  },
];

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden text-white py-14 sm:py-20 lg:py-24 bg-[#072018] rounded-none"
    >
      {/* Full-bleed Dark Photographic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
          alt="Dark Rustic Culinary Background with Gourmet Food and Plating"
          fill
          className="object-cover object-center opacity-25 mix-blend-luminosity"
          sizes="100vw"
        />
        {/* Subtle Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#072018]/90 via-[#072018]/80 to-[#072018]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#072018]/60 to-[#072018]" />
      </div>

      {/* Main Services Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-2.5 mb-2.5">
            <span className="w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
              OUR SERVICES
            </span>
            <span className="w-5 h-[1.5px] bg-[#229938]" />
          </div>
          <h2 className="font-serif text-[32px] sm:text-4xl lg:text-5xl font-normal text-white">
            Crafting Experiences
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mt-2 leading-relaxed px-2">
            From traditional Kerala banquets to contemporary multi-cuisine spreads, crafted with precision.
          </p>
        </div>

        {/* 2x2 Grid on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {SERVICE_ITEMS.map((service) => (
            <div
              key={service.id}
              className="group relative h-[290px] sm:h-[330px] lg:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-emerald-950/80 cursor-pointer flex flex-col justify-end p-3.5 sm:p-4 lg:p-6"
              onClick={onOpenQuote}
            >
              {/* Photographic Card Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className={`object-cover ${service.objectPosition} group-hover:scale-108 transition-transform duration-700 ease-out`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 transition-colors duration-500" />

              {/* Card Content */}
              <div className="relative z-10 space-y-1 sm:space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-400 font-semibold block">
                  {service.category}
                </span>

                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-white font-normal drop-shadow-md group-hover:text-emerald-300 transition-colors leading-tight">
                  {service.title}
                </h3>

                <p className="text-[10.5px] sm:text-xs text-gray-300 font-light leading-snug sm:leading-relaxed opacity-90 group-hover:opacity-100 line-clamp-2">
                  {service.description}
                </p>

                <div className="pt-1 sm:pt-2 flex items-center text-[9.5px] sm:text-xs font-semibold tracking-wider text-white uppercase group-hover:text-emerald-400">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 sm:ml-1.5 transform group-hover:translate-x-1 transition-transform text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button & Editorial Note */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col items-center text-center space-y-3">
          <button
            onClick={onOpenQuote}
            className="w-full max-w-sm sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg transition-all hover:scale-103 active:scale-95 cursor-pointer flex items-center justify-center"
          >
            Request Menu & Quotation
          </button>

          <p className="font-serif italic text-xs sm:text-sm text-gray-300/90 font-light max-w-lg leading-relaxed">
            *From traditional Kerala sadyas to contemporary international buffets, we cover each cherished occasion with devotion.*
          </p>
        </div>
      </div>
    </section>
  );
}
