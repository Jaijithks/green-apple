"use client";

import React, { useState } from "react";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What types of events and occasions do you cater for?",
    answer:
      "We provide end-to-end catering and event dining for all special occasions across Kerala. This includes grand wedding receptions, traditional engagement ceremonies, corporate banquets & galas, birthday milestones, housewarmings, traditional Sadya feasts, and private intimate VIP gatherings.",
    category: "Services",
  },
  {
    id: "faq-2",
    question: "Can we fully customize our event menu?",
    answer:
      "Yes, completely! You can tailor every dish to your preference or dietary needs. We specialize in authentic Kerala Sadya, Malabar cuisines, North Indian delicacies, Continental, Chinese, Arabian grills, gourmet live counters (chaat, pasta, grills, appam/dosa), and handcrafted dessert spreads.",
    category: "Menu",
  },
  {
    id: "faq-3",
    question: "How far in advance should we reserve our booking?",
    answer:
      "For weddings and peak wedding season dates (September through May), we recommend booking 2 to 4 months in advance to secure your preferred date. For corporate banquets, birthdays, and smaller functions, 2 to 3 weeks prior notice is generally sufficient, subject to date availability.",
    category: "Booking",
  },
  {
    id: "faq-4",
    question: "Do you provide service staff, crockery, and live buffet setups?",
    answer:
      "Yes! Green Apple offers a complete dining experience. We provide premium chafing units, elegant chinaware, glassware, cutlery, bespoke themed buffet presentation, live culinary cooking stations, and professionally groomed, courteous service personnel.",
    category: "Logistics",
  },
  {
    id: "faq-5",
    question: "What is your minimum and maximum guest capacity?",
    answer:
      "We accommodate gatherings of all scales — from intimate private family dinners of 30–50 guests to massive wedding receptions of 3,000+ attendees, ensuring the exact same consistency of taste, food temperature, and graceful hospitality.",
    category: "Capacity",
  },
  {
    id: "faq-6",
    question: "Do you offer food tasting sessions before finalizing our menu?",
    answer:
      "Yes! For confirmed wedding banquets and large corporate events, we are happy to arrange a dedicated food tasting session during the menu consultation phase to fine-tune flavours and presentation exactly to your expectations.",
    category: "Menu",
  },
  {
    id: "faq-7",
    question: "Which locations and districts do you serve across Kerala?",
    answer:
      "Based in Kothamangalam, Ernakulam, we regularly travel across all central and southern Kerala districts including Kochi, Muvattupuzha, Idukki, Thrissur, Kottayam, Alappuzha, and neighboring regions.",
    category: "Locations",
  },
];

interface FaqSectionProps {
  onOpenQuote?: () => void;
}

export default function FaqSection({ onOpenQuote }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 lg:py-24 bg-[#F7F5EF] text-gray-900 overflow-hidden border-t border-gray-200/70 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-800 font-semibold">
              COMMON QUESTIONS
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-md mx-auto leading-relaxed">
            Everything you need to know about our catering services, menu curation, and event booking process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-white border-emerald-800/25 shadow-md shadow-emerald-950/5 ring-1 ring-emerald-800/10"
                    : "bg-white/70 hover:bg-white border-gray-200/80 hover:border-emerald-800/20 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-gray-900 font-normal leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? "bg-[#072018] text-white"
                        : "bg-emerald-50 text-emerald-800 group-hover:bg-emerald-100"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help & Quick Contact Banner */}
        <div className="mt-10 sm:mt-14 bg-[#072018] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left space-y-1 sm:space-y-1.5">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
              Have a specific question in mind?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-light max-w-md">
              Speak directly with our team for personalized menu advice, date inquiries, and custom packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {onOpenQuote && (
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
