"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

interface ServicesSectionProps {
  onOpenQuote?: () => void;
}

const TWO_SERVICES = [
  {
    id: "catering",
    title: "Catering",
    category: "SIGNATURE FEASTS",
    description: "Bespoke multi-cuisine dining experiences tailored for weddings, sadyas, and banquets.",
    linkText: "EXPLORE CATERING SERVICES",
    href: "/catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85",
    alt: "Luxury multi-cuisine buffet catering setup with gourmet chafing dishes in Kothamangalam",
    objectPosition: "object-center",
  },
  {
    id: "events",
    title: "Events",
    category: "EVENTS & EXPERIENCES",
    description: "Complete celebration planning, stage decoration, and thematic ambiance design.",
    linkText: "EXPLORE EVENT PLANNING",
    href: "/events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
    alt: "Evening celebration banquet table setting with warm lighting and floral decoration in Kerala",
    objectPosition: "object-center",
  },
];

function LeafFlourish({ className = "text-emerald-400" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 my-2">
      <div className="w-8 sm:w-16 h-[1px] bg-[#229938]/40" />
      <svg
        className={`w-4 h-3 sm:w-6 sm:h-4 ${className}`}
        viewBox="0 0 32 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Center leaf */}
        <path d="M16 1 C14.2 6.5 14.2 12.5 16 17.5 C17.8 12.5 17.8 6.5 16 1 Z" />
        {/* Left leaf */}
        <path d="M15 14.5 C9.5 14.5 4.5 9.5 2.5 4.5 C8 4.5 12.5 9 15 14.5 Z" />
        {/* Right leaf */}
        <path d="M17 14.5 C23 13.5 27.5 9.5 29.5 4.5 C24 4.5 19.5 9 17 14.5 Z" />
      </svg>
      <div className="w-8 sm:w-16 h-[1px] bg-[#229938]/40" />
    </div>
  );
}

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden text-white py-10 sm:py-16 lg:py-20 bg-[#072018] scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Full-bleed Dark Photographic Background with Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
          alt=""
          role="presentation"
          fill
          className="object-cover object-center opacity-15 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#072018]/95 via-[#072018]/85 to-[#072018]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#072018]/50 to-[#072018]" />
      </div>

      {/* Main Services Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-10 lg:mb-12">
          <div className="flex items-center space-x-2 sm:space-x-2.5 mb-1.5 sm:mb-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[9.5px] sm:text-xs tracking-[0.26em] uppercase text-emerald-400 font-semibold">
              OUR SERVICES
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight">
            Crafting Experiences
          </h2>

          <p className="text-[11px] sm:text-sm text-gray-300 font-light max-w-md mt-1 sm:mt-1.5 leading-relaxed px-2">
            Make your moments memorable with flavours.
          </p>

          <LeafFlourish />
        </div>

        {/* Two-Service Grid (2 Columns on Mobile, Tablet & Desktop) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8 max-w-5xl mx-auto">
          {TWO_SERVICES.map((service) => {
            const isExternalLink = service.href.startsWith("/");
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group relative h-[310px] sm:h-[400px] md:h-[420px] lg:h-[460px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-500 hover:border-emerald-400/40 hover:shadow-emerald-950/80 cursor-pointer flex flex-col justify-end p-3 sm:p-5 lg:p-7"
              >
                {/* Service Imagery */}
                <Image
                  src={service.image}
                  alt={service.alt || service.title}
                  fill
                  className={`object-cover ${service.objectPosition} group-hover:scale-105 transition-transform duration-700 ease-out`}
                  sizes="(max-width: 768px) 50vw, 50vw"
                  priority={service.id === "catering"}
                />

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent group-hover:from-black/95 transition-colors duration-500" />

                {/* Card Content Overlay */}
                <div className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                  <span className="text-[8px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-emerald-400 font-semibold block mb-0.5 sm:mb-1">
                    {service.category}
                  </span>

                  <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-white font-normal leading-tight drop-shadow-sm">
                    {service.title}
                  </h3>

                  <div className="w-6 sm:w-8 h-[1.5px] bg-[#229938] my-1.5 sm:my-2.5 lg:my-3" />

                  <p className="text-[10px] sm:text-xs lg:text-[13px] text-gray-200/90 font-light leading-snug sm:leading-relaxed max-w-sm mb-2 sm:mb-3 lg:mb-4 line-clamp-3 sm:line-clamp-none">
                    {service.description}
                  </p>

                  <div className="flex items-center text-[9px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] text-white uppercase group-hover:text-emerald-400 transition-colors">
                    <span>{service.linkText}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 sm:ml-1.5 transform group-hover:translate-x-1.5 transition-transform text-emerald-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <div className="mt-6 sm:mt-10 lg:mt-12 flex justify-center px-2">
          <button
            onClick={onOpenQuote}
            className="w-full max-w-xs sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/50 transition-all hover:scale-102 active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2 sm:mr-2.5 text-white/90" />
            <span>REQUEST MENU & QUOTATION</span>
          </button>
        </div>

        {/* Editorial Closing Statement with Leaf Flourishes */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center text-center">
          <LeafFlourish />
          <p className="font-serif italic text-xs sm:text-sm lg:text-[14px] text-gray-300/90 font-light max-w-xl mx-auto leading-relaxed px-4 my-1">
            From traditional Kerala sadyas to contemporary international buffets, we cover each cherished moment with devotion.
          </p>
          <LeafFlourish />
        </div>
      </div>
    </section>
  );
}

