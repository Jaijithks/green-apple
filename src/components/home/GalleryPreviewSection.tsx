"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { galleryItemsData } from "@/data/gallery";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function GalleryPreviewSection() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : galleryItemsData.length - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < galleryItemsData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-20 bg-white text-gray-900 border-b border-gray-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="OUR PORTFOLIO"
          title="Moments We've Created"
          centered={true}
        />

        {/* Carousel / Showcase Grid with Controls */}
        <div className="mt-12 relative">
          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors focus:outline-none"
            aria-label="Previous Gallery Image"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors focus:outline-none"
            aria-label="Next Gallery Image"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Image Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-6 sm:px-8">
            {galleryItemsData.map((item, idx) => (
              <div
                key={item.id}
                className={`relative h-56 sm:h-64 rounded-xl overflow-hidden shadow-md group border border-gray-100 transition-all duration-300 ${
                  idx === scrollIndex ? "ring-2 ring-emerald-500 scale-105 z-10" : "opacity-90 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                      {item.category}
                    </span>
                    <p className="text-xs font-bold text-white leading-tight">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Gallery Button */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:shadow-emerald-900/40 group"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
