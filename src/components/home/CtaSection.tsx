"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";
import { ArrowRight, Phone } from "lucide-react";

interface CtaSectionProps {
  onOpenQuote?: () => void;
}

export default function CtaSection({ onOpenQuote }: CtaSectionProps) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden text-white bg-[#072018]">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Green Apple Catering Grand Event Setup"
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072018] via-[#072018]/85 to-[#072018]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center space-x-2">
          <span className="w-6 h-[1.5px] bg-[#229938]" />
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-semibold">
            GET IN TOUCH WITH US
          </span>
          <span className="w-6 h-[1.5px] bg-[#229938]" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
          Planning Something Special?
        </h2>

        <p className="font-serif italic text-lg sm:text-2xl text-gray-200 font-light max-w-xl mx-auto">
          Let&apos;s create something memorable together.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Get a Quote Button */}
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] bg-[#229938] hover:bg-[#1c822e] text-white transition-all shadow-xl shadow-emerald-950/80 hover:scale-105 flex items-center justify-center cursor-pointer"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          {/* WhatsApp Us Button */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Green%20Apple%20Catering,%20I%20would%20like%20to%20inquire%20about%20an%20event.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm transition-all shadow-lg hover:scale-105 flex items-center justify-center"
          >
            <WhatsAppSolidIcon className="w-4 h-4 mr-2 text-emerald-400" />
            <span>WHATSAPP US</span>
          </a>
        </div>

        {/* Direct Call Quick Link */}
        <div className="pt-2">
          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="inline-flex items-center text-xs text-gray-300 hover:text-emerald-300 transition-colors font-light tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Direct Call: {siteConfig.contact.phonePrimary} / {siteConfig.contact.phoneSecondary}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
