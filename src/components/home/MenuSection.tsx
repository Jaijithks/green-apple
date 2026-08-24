"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface MenuSectionProps {
  onOpenQuote?: () => void;
}

const MENU_CATEGORIES = [
  {
    id: "kerala-sadhya",
    title: "Traditional Kerala Sadhya",
    subtitle: "Authentic 24+ item feast served on fresh banana leaf",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Parippu & Pure Ghee with Crispy Pappadam",
      "Avial, Thoran, Kalan, Olan & Pachadi",
      "Authentic Sambar, Rasam & Moru Curry",
      "Ada Pradhaman & Palada Payasam Duo",
    ],
  },
  {
    id: "wedding-feast",
    title: "Royal Wedding Grand Buffet",
    subtitle: "Lavish multi-cuisine spread with gourmet live counters",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Authentic Thalassery Mutton & Chicken Dum Biryani",
      "Kerala Fish Molly & Karimeen Pollichathu",
      "Appam, Idiyappam & Malabar Porotta Counter",
      "Gourmet Dessert Lounge & Soufflé Bar",
    ],
  },
  {
    id: "live-counters",
    title: "Live Action Cooking & Starters",
    subtitle: "Interactive chef stations crafted fresh before your guests",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Live Tandoor & Barbeque Skewers",
      "Dosa & Appam Station with Custom Toppings",
      "Artisanal Pasta & Risotto Live Counter",
      "Signature Mocktail Bar with Tender Coconut Blends",
    ],
  },
  {
    id: "continental",
    title: "Continental & Fusion Celebrations",
    subtitle: "Contemporary delicacies for chic receptions & cocktail galas",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Smoked Herb Chicken & Fish Fillet with Lemon Butter",
      "Mediterranean Mezze Platter with Hummus & Pita",
      "Gourmet Finger Sandwiches & Savory Canapés",
      "Belgian Chocolate Fondue & Pastry Bites",
    ],
  },
];

export default function MenuSection({ onOpenQuote }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const selected = MENU_CATEGORIES[activeTab];

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#09281E] text-white relative overflow-hidden bg-dark-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-semibold">
              OUR CULINARY REPERTOIRE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Curated Menus for Every Occasion
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Every recipe is prepared with locally sourced fresh produce, premium spices, and time-honored techniques.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {MENU_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#229938] text-white shadow-lg shadow-emerald-950/60 scale-102"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Showcase Editorial Card for Selected Category */}
        <div className="bg-white/5 border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Food Image */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Right Menu Info & Sample Specialties */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                  FEATURED EXPERIENCE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal mt-1">
                  {selected.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-2 leading-relaxed">
                  {selected.subtitle}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block">
                  Sample Culinary Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.highlights.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white transition-all shadow-md flex items-center justify-center cursor-pointer"
                >
                  <span>Request Custom Menu & Tasting</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Green%20Apple%20Catering,%20I%20would%20like%20to%20know%20more%20about%20your%20menus.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
