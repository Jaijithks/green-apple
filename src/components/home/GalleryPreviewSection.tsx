"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface GalleryPreviewProps {
  onOpenQuote?: () => void;
}

const FEATURED_EVENTS = [
  {
    id: "event-1",
    title: "Grand Wedding Reception",
    category: "ROYAL WEDDING",
    location: "Kothamangalam",
    guests: "800+ Guests",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-tier live seafood counters, traditional Kerala Sadhya, and bespoke candlelit floral styling.",
    span: "lg:col-span-8",
  },
  {
    id: "event-2",
    title: "Artisanal Dessert & High Tea",
    category: "LIVE COUNTERS",
    location: "Ernakulam",
    guests: "350 Guests",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    description: "Custom pastry displays, signature mocktails, and gourmet canapé stations.",
    span: "lg:col-span-4",
  },
  {
    id: "event-3",
    title: "Outdoor Engagement Banquet",
    category: "ENGAGEMENTS",
    location: "Muvattupuzha",
    guests: "450 Guests",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    description: "Under-the-stars dining featuring dum biryani stations and artisanal welcome drinks.",
    span: "lg:col-span-4",
  },
  {
    id: "event-4",
    title: "Corporate Annual Gala Feast",
    category: "CORPORATE",
    location: "Kochi",
    guests: "600 Guests",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    description: "Executive multi-cuisine buffet, flawless service timing, and premium presentation.",
    span: "lg:col-span-8",
  },
];

export default function GalleryPreviewSection({ onOpenQuote }: GalleryPreviewProps) {
  return (
    <section id="events" className="py-20 sm:py-28 bg-[#FBF9F5] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Editorial Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#229938]" />
              <span className="text-xs tracking-[0.25em] uppercase text-emerald-800 font-semibold">
                CURATED PORTFOLIO
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900">
              Signature Celebrations
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-sm">
              A glimpse into the heartfelt weddings, banquets, and milestone celebrations curated across Kerala.
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {FEATURED_EVENTS.map((event) => (
            <div
              key={event.id}
              className={`${event.span} group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:border-emerald-500/30 transition-all duration-500 flex flex-col min-h-[380px] sm:min-h-[440px]`}
            >
              {/* Event Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-colors duration-500" />
              </div>

              {/* Top Tag Badges */}
              <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {event.category}
                </span>

                <span className="text-xs text-white/80 font-light tracking-wide bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full">
                  {event.location}
                </span>
              </div>

              {/* Bottom Editorial Details */}
              <div className="relative z-10 mt-auto p-6 sm:p-8 text-white space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>{event.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>

                <p className="text-xs sm:text-sm text-gray-200 font-light line-clamp-2 max-w-xl leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2 text-[11px] uppercase tracking-wider text-emerald-400 font-medium">
                  {event.guests}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Instagram / Plan Button */}
        <div className="mt-12 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://www.instagram.com/_green_apple_catering_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-emerald-800 hover:bg-emerald-700 text-white transition-all shadow-md hover:shadow-emerald-950/40"
          >
            <span>Follow @_green_apple_catering_</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </a>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 transition-all shadow-sm cursor-pointer"
          >
            <span>Inquire for Your Date</span>
          </button>
        </div>
      </div>
    </section>
  );
}
