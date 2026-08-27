"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";
import QuoteModal from "@/components/ui/QuoteModal";
import MenuBuilderModal from "@/components/menu/MenuBuilderModal";
import { siteConfig } from "@/data/site";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Briefcase,
  Users,
  Lightbulb,
  ShieldCheck,
  Headphones,
  Calendar,
  Phone,
  MessageSquare,
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

function LeafFlourish({ className = "text-[#229938]" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 my-2">
      <div className="w-6 sm:w-12 h-[1px] bg-[#229938]/30" />
      <svg
        className={`w-3.5 h-2.5 sm:w-5 sm:h-3.5 ${className}`}
        viewBox="0 0 32 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 1 C14.2 6.5 14.2 12.5 16 17.5 C17.8 12.5 17.8 6.5 16 1 Z" />
        <path d="M15 14.5 C9.5 14.5 4.5 9.5 2.5 4.5 C8 4.5 12.5 9 15 14.5 Z" />
        <path d="M17 14.5 C23 13.5 27.5 9.5 29.5 4.5 C24 4.5 19.5 9 17 14.5 Z" />
      </svg>
      <div className="w-6 sm:w-12 h-[1px] bg-[#229938]/30" />
    </div>
  );
}

const EVENT_TYPES = [
  {
    id: "birthday",
    number: "01",
    title: "Birthday Celebrations",
    description:
      "From intimate gatherings to grand birthday bashes, we create fun, vibrant and personalized setups that make the day unforgettable.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=85",
    icon: Sparkles,
    ctaText: "EXPLORE BIRTHDAY EVENTS",
    quoteCategory: "Birthday & Social Gathering",
  },
  {
    id: "weddings",
    number: "02",
    title: "Weddings & Engagements",
    description:
      "Elegant décor, thoughtful details and flawless execution for your big day — because your love story deserves magic.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85",
    icon: Heart,
    ctaText: "EXPLORE WEDDING EVENTS",
    quoteCategory: "Wedding Reception",
  },
  {
    id: "corporate",
    number: "03",
    title: "Corporate Events",
    description:
      "Professional setups for conferences, product launches, award nights and team events that impress and inspire.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=85",
    icon: Briefcase,
    ctaText: "EXPLORE CORPORATE EVENTS",
    quoteCategory: "Corporate Event",
  },
  {
    id: "social",
    number: "04",
    title: "Social Gatherings",
    description:
      "Anniversaries, reunions, festive parties and more — we create warm, stylish and memorable experiences for every celebration.",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=85",
    icon: Users,
    ctaText: "EXPLORE SOCIAL EVENTS",
    quoteCategory: "Birthday & Social Gathering",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    description: "We listen to your ideas and understand your needs.",
  },
  {
    step: "02",
    title: "Planning",
    description: "We plan every detail to bring your vision to life.",
  },
  {
    step: "03",
    title: "Execution",
    description: "We design, decorate and coordinate with care and perfection.",
  },
  {
    step: "04",
    title: "Enjoy",
    description: "Relax and enjoy your moments while we handle the rest.",
  },
];

const MEMORABLE_PILLARS = [
  {
    id: "concepts",
    title: "Creative Concepts",
    description: "Unique ideas that bring your vision to life.",
    icon: Lightbulb,
  },
  {
    id: "ambience",
    title: "Perfect Ambience",
    description: "The right mood, colors and every little detail.",
    icon: Heart,
  },
  {
    id: "execution",
    title: "Flawless Execution",
    description: "On-time, organized and stress-free experience.",
    icon: ShieldCheck,
  },
  {
    id: "support",
    title: "We're Here for You",
    description: "From planning to the last guest — we've got you.",
    icon: Headphones,
  },
];

export default function EventsPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMenuBuilderOpen, setIsMenuBuilderOpen] = useState(false);

  const handleOpenQuote = () => setIsQuoteModalOpen(true);
  const handleCloseQuote = () => setIsQuoteModalOpen(false);

  const handleOpenMenuBuilder = () => setIsMenuBuilderOpen(true);
  const handleCloseMenuBuilder = () => setIsMenuBuilderOpen(false);

  const handlePlanWhatsApp = (eventType?: string) => {
    const text = eventType
      ? `*Event Planning Inquiry — Green Apple Events*\n\nHello, I would like to plan a *${eventType}* with Green Apple. Please share your event decoration and management portfolio.`
      : `*Event Planning Inquiry — Green Apple Events*\n\nHello, I would like to consult with your event management and decoration team for an upcoming celebration.`;
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col selection:bg-[#229938] selection:text-white">
      {/* 1s Aesthetic Preloader */}
      <Preloader durationMs={1000} />
      
      {/* ======================================================== */}
      {/* 01 — HERO SECTION (Dark Forest Green + Luxury Ambience) */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#072018] text-white overflow-hidden">
        {/* Ambient Top Navbar */}
        <Navbar onOpenQuote={handleOpenQuote} onOpenMenuBuilder={handleOpenMenuBuilder} />

        {/* Hero Background Grid with Split Dark / Imagery Composition */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 lg:pt-8 pb-8 sm:pb-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Content Zone (Typography & CTA) */}
            <div className="lg:col-span-5 z-10 space-y-3 sm:space-y-5 text-center lg:text-left pt-2 lg:pt-0">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
                  EVENTS WE CREATE
                </span>
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[54px] text-white font-normal leading-[1.12] tracking-tight">
                We Design. <br />
                We Decorate. <br />
                <span className="text-white">You Celebrate.</span>
              </h1>

              {/* Accent Green Rule */}
              <div className="w-10 sm:w-16 h-[2px] bg-[#229938] mx-auto lg:mx-0" />

              <p className="text-xs sm:text-sm lg:text-[15px] text-gray-300 font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                Beautifully designed events that reflect your story, set the perfect mood, and turn moments into lasting memories.
              </p>

              {/* Primary CTA Button */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => handlePlanWhatsApp()}
                  className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl shadow-emerald-950/80 transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[40px] sm:min-h-[44px]"
                >
                  <span>LET&apos;S PLAN YOUR EVENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual Zone (Luxury Event Ambience Photo) */}
            <div className="lg:col-span-7 relative">
              <div className="relative h-56 sm:h-72 md:h-96 lg:h-[460px] xl:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                  alt="Luxury wedding bouquet and evening celebration lighting"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#072018]/70 via-transparent to-black/20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 — EVENT TYPES ("Celebrate Life's Special Occasions") */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                EVENTS FOR EVERY MOMENT
              </span>
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[44px] font-normal text-gray-900 tracking-tight">
              Celebrate Life&apos;s Special Occasions
            </h2>

            <LeafFlourish />

            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-lg mx-auto leading-relaxed px-2">
              Every event is unique. We listen, understand, design and execute experiences that leave you and your guests with unforgettable memories.
            </p>
          </div>

          {/* 4 Event Cards Grid (2x2 on Mobile, 4-Col on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {EVENT_TYPES.map((evt) => {
              const IconComp = evt.icon;
              return (
                <div
                  key={evt.id}
                  onClick={() => handlePlanWhatsApp(evt.title)}
                  className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-100/90 shadow-xs sm:shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Image Thumbnail */}
                  <div className="relative h-28 sm:h-40 lg:h-52 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating Circular Icon Badge */}
                    <div className="absolute -bottom-3 sm:-bottom-4 left-3 sm:left-4 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#229938] group-hover:bg-[#229938] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 sm:p-4 lg:p-5 pt-4 sm:pt-6 lg:pt-7 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xs sm:text-base lg:text-xl text-gray-900 font-normal leading-snug group-hover:text-emerald-800 transition-colors">
                        {evt.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-light mt-1 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-[8.5px] sm:text-[10.5px] lg:text-[11px] font-semibold uppercase tracking-wider text-emerald-700 group-hover:text-emerald-900">
                      <span className="truncate pr-1">{evt.ctaText}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 03 — Custom Event Centered CTA Pill */}
          <div className="mt-6 sm:mt-10 lg:mt-12 flex justify-center">
            <button
              onClick={() => handlePlanWhatsApp("Custom Celebration")}
              className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-gray-800 hover:text-emerald-800 bg-white hover:bg-emerald-50/50 border border-gray-300 hover:border-emerald-500 shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>HAVE A CUSTOM EVENT IN MIND? LET&apos;S TALK</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 — OUR PROCESS ("From Start to Celebration") */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white text-gray-900 border-t border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header (Matches Image 1) */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#229938]" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-emerald-800 font-semibold">
                OUR PROCESS
              </span>
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              From Start to Celebration
            </h2>

            <LeafFlourish />
          </div>

          {/* Process Timeline Flow (Matches Reference Image Exactly Across Screen Sizes) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 lg:gap-6 relative max-w-5xl mx-auto">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.step} className="flex flex-col items-center text-center relative group">
                {/* Thin Light Emerald Outline Step Circle */}
                <div className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white border-[1.5px] border-emerald-300 text-emerald-800 flex items-center justify-center font-serif text-xs sm:text-base lg:text-lg font-normal shadow-xs mb-2 sm:mb-3 group-hover:border-[#229938] group-hover:bg-emerald-50/50 transition-all duration-300">
                  {step.step}
                </div>

                <h3 className="font-serif text-[11px] sm:text-base lg:text-xl font-normal text-gray-900 mb-0.5 sm:mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[9px] sm:text-xs lg:text-[13px] text-gray-600 font-light leading-tight sm:leading-relaxed max-w-[200px]">
                  {step.description}
                </p>

                {/* Minimalist Arrow between steps */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-3.5 sm:top-5 lg:top-7 -right-1 sm:-right-2.5 lg:-right-3 transform translate-x-1/2 -translate-y-1/2 text-emerald-400">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 stroke-[1.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 — WE MAKE YOUR MOMENTS MEMORABLE (2x2 Grid on Mobile) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-1.5">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                WE MAKE YOUR MOMENTS MEMORABLE
              </span>
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              Something Beautiful is <span className="italic text-emerald-800">Coming...</span>
            </h2>

            <LeafFlourish />
          </div>

          {/* 4 Pillar Grid (2x2 on Mobile, 4-Col on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {MEMORABLE_PILLARS.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 shadow-xs border border-gray-100 text-center flex flex-col items-center space-y-1.5 sm:space-y-2.5 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-50 text-[#229938] flex items-center justify-center mb-0.5 sm:mb-1">
                    <PillarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-xs sm:text-base font-normal text-gray-900 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-light leading-snug sm:leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 06 — Final CTA Action */}
          <div className="mt-10 sm:mt-14 flex flex-col items-center text-center space-y-3">
            <button
              onClick={() => handlePlanWhatsApp("Event Inquiry")}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] bg-[#072018] hover:bg-[#0c3327] text-white shadow-xl transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <span>LET&apos;S CREATE MAGIC TOGETHER</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>

            <p className="text-xs text-gray-500 font-light italic">
              We&apos;re here for you, every step of the way.
            </p>
          </div>

        </div>
      </section>

      {/* Global Interactive Modals */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />
      <MenuBuilderModal isOpen={isMenuBuilderOpen} onClose={handleCloseMenuBuilder} />

    </div>
  );
}
