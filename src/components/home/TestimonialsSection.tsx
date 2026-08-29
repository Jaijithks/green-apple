"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Green Apple orchestrated the entire wedding banquet for our daughter in Kothamangalam. Every single guest complimented the authentic sadya and the live dessert counter. Their team's hospitality was flawless.",
    author: "Mathew & Mary",
    event: "Wedding Celebration, Kothamangalam",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The food quality, punctuality, and presentation for our corporate annual gala were top tier. Fresh flavours, elegant buffet styling, and courteous service staff throughout.",
    author: "Dr. Anish Kumar",
    event: "Medical Association Gala, Ernakulam",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "From the initial menu consultation to the evening reception, Green Apple exceeded all our expectations. The dum biryani and live fish counters were the absolute highlight!",
    author: "Sujith & Anjali",
    event: "Engagement Banquet, Muvattupuzha",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-8 sm:py-14 lg:py-20 bg-[#FBF9F5] text-gray-900 overflow-hidden border-t border-gray-200/70 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-8 md:mb-12 space-y-1 sm:space-y-2">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[9.5px] sm:text-xs tracking-[0.25em] uppercase text-emerald-800 font-semibold">
              WORDS OF APPRECIATION
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight">
            Cherished Experiences
          </h2>
        </div>

        {/* Reviews: Vertically stacked on mobile (one below another, compact), 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-7 max-w-lg md:max-w-none mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-xs sm:shadow-sm border border-gray-100/90 flex flex-col justify-between relative group hover:border-emerald-300 hover:shadow-md transition-all duration-200"
            >
              {/* Top Row: Quote Icon & Stars */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600/40" />
                <div className="flex items-center space-x-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="font-serif italic text-[11.5px] sm:text-xs md:text-[13px] text-gray-700 leading-relaxed font-light mb-3 sm:mb-4 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-gray-100">
                <h4 className="font-serif text-xs sm:text-sm md:text-[14.5px] font-bold text-gray-900 leading-tight">
                  {item.author}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium mt-0.5 leading-tight">
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


