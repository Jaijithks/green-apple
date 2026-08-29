"use client";

import React, { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServicesSection from "@/components/home/ServicesSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import MenuSection from "@/components/home/MenuSection";
import FaqSection from "@/components/home/FaqSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import QuoteModal from "@/components/ui/QuoteModal";
import MenuBuilderModal from "@/components/menu/MenuBuilderModal";
import PresetMenusModal from "@/components/menu/PresetMenusModal";
import { PresetMenu } from "@/data/menuBuilderData";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col selection:bg-[#229938] selection:text-white">
      {/* Editorial Luxury Brand Preloader */}
      <Preloader />

      {/* 1. Hero Section (Overlaid Nav + Photographic Scene + Script Accent) */}
      <HeroSection onOpenQuote={handleOpenQuote} onOpenMenuBuilder={handleOpenMenuBuilder} />

      {/* 2. Hero -> About Overlap (Centered White Editorial Card) */}
      <WelcomeSection />

      {/* 3. About -> Services Transition (Dark Photographic Background + 2 Service Cards) */}
      <ServicesSection onOpenQuote={handleOpenQuote} />

      {/* 4. Curated Portfolio (Asymmetric Editorial Event Showcase) */}
      <GalleryPreviewSection onOpenQuote={handleOpenQuote} />

      {/* 5. Custom Menu Planning & Culinary Repertoire */}
      <MenuSection
        onOpenMenuBuilder={handleOpenMenuBuilder}
        onOpenPresetMenus={handleOpenPresetMenus}
        onOpenQuote={handleOpenQuote}
      />

      {/* 6. Frequently Asked Questions */}
      <FaqSection onOpenQuote={handleOpenQuote} />

      {/* 7. Editorial Testimonials */}
      <TestimonialsSection />

      {/* 7. Final Cinematic Call-to-Action */}
      <CtaSection onOpenQuote={handleOpenQuote} />

      {/* 8. Interactive Custom Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuote} />

      {/* 9. Interactive Custom Menu Builder (Full Experience) */}
      <MenuBuilderModal
        isOpen={isMenuBuilderOpen}
        onClose={() => {
          setIsMenuBuilderOpen(false);
          setSelectedPreset(null);
        }}
        initialPreset={selectedPreset}
      />

      {/* 10. Professionally Curated Preset Menus Modal */}
      <PresetMenusModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleCustomizePreset}
      />
    </div>
  );
}


