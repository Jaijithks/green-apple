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
    id: "faq-hours",
    question: "What are your working hours and availability?",
    answer:
      "We are available 24/7 for enquiries, consultations, and event bookings via phone call and WhatsApp.",
    category: "Availability",
  },
  {
    id: "faq-locations",
    question: "Which locations and districts do you provide catering in?",
    answer:
      "Based in Kothamangalam, Ernakulam, we provide catering and event management services across Kothamangalam, Ernakulam, Idukki, Kottayam, and neighboring districts throughout Kerala.",
    category: "Locations",
  },
  {
    id: "faq-events",
    question: "What kinds of events and occasions do you cater for?",
    answer:
      "We cater for all celebrations across Kerala, including grand wedding banquets, traditional engagement ceremonies, birthday milestones, corporate galas & conferences, authentic Kerala Sadya feasts, housewarmings, and intimate VIP social gatherings.",
    category: "Events",
  },
  {
    id: "faq-customize",
    question: "Can we fully customize our event menu and service style?",
    answer:
      "Yes, completely! You can personalize every dish and counter to your preference—spanning authentic Kerala Sadya, Malabar specialties, North Indian, Continental, Arabian grills, interactive live cooking stalls (dosa, chaat, grills), and handcrafted desserts.",
    category: "Menu",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 lg:py-24 bg-[#F7F5EF] text-gray-900 overflow-hidden border-t border-gray-200/70 scroll-mt-16 sm:scroll-mt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
