"use client";

import React, { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServicesSection from "@/components/home/ServicesSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import MenuSection from "@/components/home/MenuSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import QuoteModal from "@/components/ui/QuoteModal";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuote = () => setIsQuoteModalOpen(true);
  const handleCloseQuote = () => setIsQuoteModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col selection:bg-[#229938] selection:text-white">
      {/* 1. Hero Section (Overlaid Nav + Photographic Scene + Script Accent) */}
      <HeroSection onOpenQuote={handleOpenQuote} />

      {/* 2. Hero -> About Overlap (Centered White Editorial Card) */}
      <WelcomeSection />

      {/* 3. About -> Services Transition (Dark Photographic Background + 3 Service Cards) */}
      <ServicesSection onOpenQuote={handleOpenQuote} />

      {/* 4. Curated Portfolio (Asymmetric Editorial Event Showcase) */}
      <GalleryPreviewSection onOpenQuote={handleOpenQuote} />

      {/* 5. Curated Menus & Live Action Counters */}
      <MenuSection onOpenQuote={handleOpenQuote} />

      {/* 6. Editorial Testimonials */}
      <TestimonialsSection />

      {/* 7. Final Cinematic Call-to-Action */}
      <CtaSection onOpenQuote={handleOpenQuote} />

      {/* 8. Interactive Custom Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />
    </div>
  );
}
