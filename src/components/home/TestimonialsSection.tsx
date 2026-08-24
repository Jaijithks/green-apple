"use client";

import React from "react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Green Apple orchestrated the entire wedding banquet for our daughter in Kothamangalam. Every single guest complimented the authentic sadya and the live dessert counter. Their team's hospitality was flawless.",
    author: "Mathew & Mary",
    event: "Wedding Celebration, Kothamangalam",
  },
  {
    id: "t2",
    quote:
      "The food quality, punctuality, and presentation for our corporate annual gala were top tier. Fresh flavours, elegant buffet styling, and courteous service staff throughout.",
    author: "Dr. Anish Kumar",
    event: "Medical Association Gala, Ernakulam",
  },
  {
    id: "t3",
    quote:
      "From the initial menu consultation to the evening reception, Green Apple exceeded all our expectations. The dum biryani and live fish counters were the absolute highlight!",
    author: "Sujith & Anjali",
    event: "Engagement Banquet, Muvattupuzha",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F5] text-gray-900 overflow-hidden border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-xs tracking-[0.25em] uppercase text-emerald-800 font-semibold">
              WORDS OF APPRECIATION
            </span>
            <span className="w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900">
            Cherished Experiences
          </h2>
        </div>

        {/* Testimonials 3-Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col justify-between relative group hover:border-emerald-300 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-emerald-600/30 mb-4" />

              <p className="font-serif italic text-sm sm:text-base text-gray-700 leading-relaxed font-light mb-6 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-serif text-base font-bold text-gray-900">
                  {item.author}
                </h4>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
