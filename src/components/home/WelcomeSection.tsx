"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section
      id="about"
      className="relative z-20 w-full px-0 sm:px-6 md:px-8 max-w-6xl mx-auto -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 pb-12 sm:pb-16"
    >
      {/* Centered Editorial Card (92% Mobile Viewport Width, 70-74% Desktop) */}
      <div className="w-[92%] sm:w-[94%] max-w-[1140px] mx-auto bg-white rounded-[24px] sm:rounded-3xl shadow-[0_20px_50px_rgba(7,32,24,0.08)] overflow-hidden border border-gray-200/80 transition-all duration-300 p-5 sm:p-7 md:p-8 lg:p-0">
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[440px]">
          {/* Mobile Image (Inside Card with layered rounded corners) / Desktop Left Column */}
          <div className="w-full lg:w-[38%] relative h-[260px] sm:h-[300px] lg:h-full rounded-[16px] sm:rounded-[18px] lg:rounded-none overflow-hidden bg-[#072018] flex-shrink-0 mb-5 lg:mb-0">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85"
              alt="Green Apple Catering Artisanal Gourmet Culinary Preparation and Presentation"
              fill
              className="object-cover object-center hover:scale-104 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 94vw, 38vw"
            />
          </div>

          {/* Text Content Column: Editorial Storytelling with Generous Whitespace */}
          <div className="w-full lg:w-[62%] p-1 sm:p-2 lg:p-12 xl:p-14 flex flex-col justify-between bg-white">
            <div className="space-y-3 sm:space-y-4">
              {/* Eyebrow Label with Green Accent Line */}
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-emerald-800 font-semibold">
                  ABOUT GREEN APPLE
                </span>
              </div>

              {/* Main Heading in Quiet Italic Serif */}
              <h2 className="font-serif italic text-[25px] sm:text-3xl lg:text-[34px] xl:text-[38px] text-gray-900 leading-[1.22] font-normal">
                Where Every Celebration <br className="hidden sm:inline" />
                is Served with Flavour.
              </h2>

              {/* Editorial Narrative Copy */}
              <div className="space-y-3 text-[13px] sm:text-[14px] text-gray-600 font-light leading-[1.75] pt-0.5 sm:pt-1">
                <p>
                  Based in Kothamangalam, Kerala, <strong>Green Apple Catering & Event Company</strong> is dedicated to crafting memorable celebration experiences through thoughtful food, catering, and event presentation.
                </p>
                <p>
                  From grand wedding banquets and engagement feasts to corporate galas and private social gatherings, we bring warmth, flawless hospitality, and exceptional flavour to your special moments.
                </p>
              </div>
            </div>

            {/* Subtle Editorial Link with Horizontal Rule */}
            <div className="pt-6 sm:pt-8 flex items-center space-x-4">
              <Link
                href="#services"
                className="group inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-emerald-800 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
