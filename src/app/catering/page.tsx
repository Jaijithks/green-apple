"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";
import QuoteModal from "@/components/ui/QuoteModal";
import MenuBuilderModal from "@/components/menu/MenuBuilderModal";
import PresetMenusModal from "@/components/menu/PresetMenusModal";
import { PresetMenu, ServiceStyleId, SERVICE_STYLES } from "@/data/menuBuilderData";
import { siteConfig } from "@/data/site";
import {
  ArrowRight,
  Utensils,
  BookOpen,
  Sparkles,
  Flame,
  Check,
  ShieldCheck,
  Award,
  Users,
  ChefHat,
  Leaf,
  MessageCircle,
} from "lucide-react";

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

const DINING_STYLES = [
  {
    id: "buffet" as ServiceStyleId,
    title: "BUFFET",
    tagline: "A feast at your own pace.",
    description:
      "Beautifully arranged counters, multiple dishes and live stations where guests can explore the spread at their leisure.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85",
    icon: Utensils,
  },
  {
    id: "table-service" as ServiceStyleId,
    title: "TABLE SERVICE",
    tagline: "A meal brought to your table.",
    description:
      "Guests remain seated while carefully selected dishes are served and replenished throughout the celebration.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85",
    icon: ChefHat,
  },
  {
    id: "sadya" as ServiceStyleId,
    title: "SADYA",
    tagline: "A tradition served leaf by leaf.",
    description:
      "A traditional Kerala dining experience where dishes are served sequentially on fresh banana leaves.",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=85",
    icon: Leaf,
  },
];

const REPERTOIRE_CATEGORIES = [
  {
    id: "kerala",
    name: "KERALA",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
    items: ["Sadya", "Biryani", "Curries", "Traditional Favourites"],
  },
  {
    id: "indian",
    name: "INDIAN",
    image:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    items: ["Tandoor", "North Indian", "Street-Inspired", "Favourites"],
  },
  {
    id: "contemporary",
    name: "CONTEMPORARY",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    items: ["Continental", "Fusion", "International", "Flavours"],
  },
  {
    id: "live",
    name: "LIVE STATIONS",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    items: ["Grills", "Dosa", "Appam", "Interactive Counters"],
  },
];

const BEYOND_MENU_PILLARS = [
  {
    id: "freshness",
    title: "FRESHNESS",
    description: "Thoughtfully selected ingredients and carefully prepared dishes.",
    icon: Leaf,
  },
  {
    id: "presentation",
    title: "PRESENTATION",
    description: "Beautifully arranged food that complements your celebration.",
    icon: Sparkles,
  },
  {
    id: "service",
    title: "SERVICE",
    description: "Attentive service designed around the way your guests dine.",
    icon: Users,
  },
  {
    id: "consistency",
    title: "CONSISTENCY",
    description: "From the first plate to the last guest, every detail matters.",
    icon: Award,
  },
];

const CATERING_PROCESS = [
  {
    step: "01",
    title: "DISCOVER",
    description: "We understand your event, preferences and guest requirements.",
  },
  {
    step: "02",
    title: "CURATE",
    description: "We help shape your menu and service style that suits your celebration.",
  },
  {
    step: "03",
    title: "PREPARE",
    description: "Our team prepares every dish with care, hygiene and perfection.",
  },
  {
    step: "04",
    title: "SERVE",
    description: "We bring everything together so you can enjoy your celebration.",
  },
];

const OCCASION_CARDS = [
  {
    id: "weddings",
    title: "WEDDINGS",
    description: "Grand feasts and carefully planned dining experiences for your big day.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "engagements",
    title: "ENGAGEMENTS",
    description: "Intimate menus and elegant setups for meaningful celebrations.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "corporate",
    title: "CORPORATE",
    description: "Professional catering for meetings, conferences and corporate gatherings.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "family",
    title: "FAMILY & SOCIAL",
    description: "Warm, generous food for family gatherings and special moments.",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "traditional",
    title: "TRADITIONAL CELEBRATIONS",
    description: "Kerala-inspired feasts rooted in tradition and served with pride.",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CateringPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMenuBuilderOpen, setIsMenuBuilderOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<PresetMenu | null>(null);

  const handleOpenQuote = () => setIsQuoteModalOpen(true);
  const handleCloseQuote = () => setIsQuoteModalOpen(false);

  const handleOpenMenuBuilder = () => {
    setSelectedPreset(null);
    setIsMenuBuilderOpen(true);
  };

  const handleOpenPresetMenus = () => setIsPresetModalOpen(true);

  const handleCustomizePreset = (preset: PresetMenu) => {
    setSelectedPreset(preset);
    setIsPresetModalOpen(false);
    setIsMenuBuilderOpen(true);
  };

  const handleConsultWhatsApp = (context?: string) => {
    const text = context
      ? `*Catering Inquiry — Green Apple Catering*\n\nHello, I would like to consult with your catering team regarding *${context}*. Please share your menu options and service styles.`
      : `*Catering Inquiry — Green Apple Catering*\n\nHello, I would like to explore custom catering menus and service styles for an upcoming celebration.`;
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col selection:bg-[#229938] selection:text-white">
      {/* 1s Aesthetic Preloader */}
      <Preloader durationMs={1000} />
      
      {/* ======================================================== */}
      {/* 01 — HERO (Dark Forest Green + Luxury Buffet Spread) */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#072018] text-white overflow-hidden">
        {/* Navigation Bar */}
        <Navbar onOpenQuote={handleOpenQuote} onOpenMenuBuilder={handleOpenMenuBuilder} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 lg:pt-8 pb-8 sm:pb-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 z-10 space-y-3 sm:space-y-5 text-center lg:text-left pt-2 lg:pt-0">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
                  ARTISANAL CATERING
                </span>
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] text-white font-normal leading-[1.12] tracking-tight">
                A Feast Worth <br />
                Remembering
              </h1>

              {/* Accent Green Rule */}
              <div className="w-10 sm:w-16 h-[2px] bg-[#229938] mx-auto lg:mx-0" />

              <p className="text-xs sm:text-sm lg:text-[15px] text-gray-300 font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                From traditional Kerala feasts to beautifully curated multi-cuisine celebrations, we bring flavour, freshness and thoughtful service to your table.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handleOpenMenuBuilder}
                  className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl shadow-emerald-950/80 transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[40px] sm:min-h-[44px]"
                >
                  <Utensils className="w-4 h-4 mr-1" />
                  <span>BUILD YOUR MENU</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOpenPresetMenus}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[40px] sm:min-h-[44px]"
                >
                  <BookOpen className="w-4 h-4 mr-1 text-emerald-300" />
                  <span>EXPLORE OUR MENUS</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column (Luxury Buffet Spread Imagery) */}
            <div className="lg:col-span-7 relative">
              <div className="relative h-56 sm:h-72 md:h-96 lg:h-[480px] xl:h-[520px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15">
                <Image
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=85"
                  alt="Opulent luxury wedding buffet spread with chafing dishes and gourmet dining"
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
      {/* 02 — THE GREEN APPLE APPROACH (Warm Ivory / Editorial) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                  THE GREEN APPLE APPROACH
                </span>
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 leading-tight">
                More Than Food. <br />
                <span className="text-emerald-900">An Experience at the Table.</span>
              </h2>

              <LeafFlourish />

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Every celebration deserves food that feels as special as the occasion. From the first welcome drink to the final dessert, we carefully curate every element of your dining experience.
              </p>

              {/* Highlight Badge */}
              <div className="pt-2 sm:pt-3 flex justify-center lg:justify-start">
                <div className="inline-flex items-start space-x-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 shadow-xs text-left max-w-md">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 text-[#229938] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Thoughtful Menus</h4>
                    <p className="text-[10.5px] sm:text-[11px] text-gray-500 font-light mt-0.5">
                      Curated with variety, balance and your preferences in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Large Editorial Dining Photo */}
            <div className="lg:col-span-6">
              <div className="relative h-52 sm:h-72 lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-gray-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85"
                  alt="Beautiful banquet dinner table with floral runner and wine glasses"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 — CHOOSE YOUR WAY OF DINING (3 Cards Grid) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white text-gray-900 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              CHOOSE YOUR WAY OF DINING
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              Every celebration is different. Choose the style that suits yours.
            </p>
          </div>

          {/* 3 Dining Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {DINING_STYLES.map((style) => {
              const IconComp = style.icon;
              return (
                <div
                  key={style.id}
                  onClick={handleOpenMenuBuilder}
                  className="group relative bg-[#FBF9F5] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative h-40 sm:h-48 lg:h-56 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={style.image}
                      alt={style.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Circular Icon Badge */}
                    <div className="absolute -bottom-3.5 left-4 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#229938] group-hover:bg-[#229938] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6 pt-5 sm:pt-7 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-gray-900 font-normal leading-tight group-hover:text-emerald-800 transition-colors">
                        {style.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-serif italic text-emerald-800 mt-0.5">
                        {style.tagline}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-light mt-1.5 leading-relaxed">
                        {style.description}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-gray-200/80 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-700 group-hover:text-emerald-900">
                      <span>PLAN {style.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Action Button */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              onClick={handleOpenMenuBuilder}
              className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-gray-800 hover:text-emerald-800 bg-white hover:bg-emerald-50/50 border border-gray-300 hover:border-emerald-500 shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>CREATE YOUR CATERING PLAN</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 — OUR CULINARY REPERTOIRE (2x2 Grid on Mobile) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-2 sm:space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                  OUR CULINARY REPERTOIRE
                </span>
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-normal text-gray-900 leading-tight">
                From Kerala Classics <br />
                to Global Flavours
              </h2>

              <LeafFlourish />
            </div>

            {/* Right 4 Category Cards (2x2 Grid on Mobile) */}
            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {REPERTOIRE_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={handleOpenMenuBuilder}
                  className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative h-24 sm:h-32 lg:h-36 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-2.5 sm:p-4 space-y-1.5 flex-1">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-emerald-800 transition-colors">
                      {cat.name}
                    </h4>
                    <ul className="space-y-0.5 text-[9.5px] sm:text-xs text-gray-500 font-light">
                      {cat.items.map((it, idx) => (
                        <li key={idx} className="truncate">• {it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 — BUILD YOUR FEAST (Dark Forest Green Bridge Section) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#072018] text-white overflow-hidden border-t border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Interactive Mock Plan Preview */}
            <div className="lg:col-span-6">
              <div className="bg-[#0A261D] rounded-xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-white/15 shadow-2xl space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                    YOUR CATERING PLAN
                  </span>
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider bg-black/40 text-emerald-300 border border-white/10 px-2.5 py-0.5 rounded-lg font-semibold">
                    BUFFET ▾
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      WELCOME DRINKS
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Mint Lime</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Tender Coconut</p>
                  </div>

                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      STARTERS
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Chicken 65</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Chicken Fry</p>
                  </div>

                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      MAIN COURSE
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Chicken Biryani</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Chicken Curry</p>
                  </div>

                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      BREADS
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Porotta</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Naan</p>
                  </div>

                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      DESSERTS
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Payasam</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Ice Cream</p>
                  </div>

                  <div className="bg-black/30 p-2 sm:p-2.5 rounded-xl border border-white/10 space-y-0.5">
                    <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-emerald-400 font-semibold block">
                      LIVE STATIONS
                    </span>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Grill Counter</p>
                    <p className="text-[10px] sm:text-[10.5px] text-gray-200 truncate">✓ Dosa Counter</p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-gray-300">
                  <span>Total Items</span>
                  <span className="text-emerald-400 font-semibold bg-white/5 px-2.5 py-0.5 rounded-md">
                    10 Items
                  </span>
                </div>
              </div>
            </div>

            {/* Right Headline & Action */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
                  YOUR EVENT. YOUR MENU.
                </span>
                <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[50px] text-white font-normal leading-tight">
                Build Your Feast.
              </h2>

              {/* Accent Green Rule */}
              <div className="w-10 sm:w-16 h-[2px] bg-[#229938] mx-auto lg:mx-0" />

              <p className="text-xs sm:text-sm lg:text-[15px] text-gray-300 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                Start with a service style. Choose the dishes you love. Create your counters. We&apos;ll turn your selections into a catering experience designed for your celebration.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleOpenMenuBuilder}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl transition-all hover:scale-102 active:scale-95 cursor-pointer inline-flex items-center justify-center space-x-2"
                >
                  <Utensils className="w-4 h-4 mr-1" />
                  <span>BUILD YOUR MENU</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 — BEYOND THE MENU (2x2 Grid on Mobile) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-1.5">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                BEYOND THE MENU
              </span>
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              It&apos;s All in the Details.
            </h2>

            <LeafFlourish />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {BEYOND_MENU_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 shadow-xs border border-gray-100 text-center flex flex-col items-center space-y-1.5 sm:space-y-2.5 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-50 text-[#229938] flex items-center justify-center mb-0.5 sm:mb-1">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-xs sm:text-base font-bold text-gray-900 uppercase tracking-wider">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-light leading-snug sm:leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 — CATERING PROCESS ("From Menu to Table") */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white text-gray-900 border-t border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#229938]" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-emerald-800 font-semibold">
                OUR PROCESS
              </span>
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              From Menu to Table
            </h2>

            <LeafFlourish />
          </div>

          {/* Process Timeline Flow (Matches Reference Image Exactly Across Screen Sizes) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 lg:gap-6 relative max-w-5xl mx-auto">
            {CATERING_PROCESS.map((step, idx) => (
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
                {idx < CATERING_PROCESS.length - 1 && (
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
      {/* 08 — CATERING FOR YOUR OCCASION (Occasion Cards) */}
      {/* ======================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-[#FBF9F5] text-gray-900 border-t border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14 space-y-1.5">
            <div className="inline-flex items-center space-x-2">
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10px] sm:text-xs tracking-[0.26em] uppercase text-emerald-800 font-semibold">
                CATERING FOR YOUR OCCASION
              </span>
              <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight">
              Feasts for Every Milestone
            </h2>

            <LeafFlourish />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {OCCASION_CARDS.map((occ) => (
              <div
                key={occ.id}
                onClick={handleOpenMenuBuilder}
                className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-24 sm:h-32 lg:h-36 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-2.5 sm:p-4 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-[11.5px] sm:text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-emerald-800 transition-colors">
                      {occ.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-light mt-0.5 leading-snug line-clamp-2 sm:line-clamp-3">
                      {occ.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 — FINAL CTA (Dark Forest Green) */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-18 lg:py-24 bg-[#072018] text-white border-t border-emerald-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
              LET&apos;S CREATE YOUR FEAST
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[52px] text-white font-normal leading-tight">
            You Bring the Occasion. <br />
            We&apos;ll Bring the Flavour.
          </h2>

          <p className="text-xs sm:text-sm lg:text-[15px] text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Tell us what you&apos;re celebrating, how you want your guests to dine, and what you&apos;d love to serve. We&apos;ll help turn your ideas into a catering experience worth remembering.
          </p>

          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenMenuBuilder}
              className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Utensils className="w-4 h-4 mr-1" />
              <span>BUILD YOUR CUSTOM MENU</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleConsultWhatsApp("General Catering Consultation")}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 mr-1 text-emerald-300" />
              <span>TALK TO US</span>
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-400 font-light italic pt-1.5">
            From the first welcome drink to the final sweet note, we&apos;re here for every bite.
          </p>
        </div>
      </section>

      {/* Global Interactive Modals */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />
      <MenuBuilderModal
        isOpen={isMenuBuilderOpen}
        onClose={() => {
          setIsMenuBuilderOpen(false);
          setSelectedPreset(null);
        }}
        initialPreset={selectedPreset}
      />
      <PresetMenusModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleCustomizePreset}
      />

    </div>
  );
}
