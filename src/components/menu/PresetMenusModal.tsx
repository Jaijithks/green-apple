"use client";

import React, { useEffect } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";
import MenuSlider from "./MenuSlider";

interface PresetMenusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset?: (preset: any) => void;
  onOpenQuote?: () => void;
  onOpenMenuBuilder?: () => void;
}

export default function PresetMenusModal({
  isOpen,
  onClose,
  onOpenQuote,
}: PresetMenusModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full h-[100dvh] sm:h-[94vh] sm:max-w-5xl bg-[#072018] border-0 sm:border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <header className="flex-shrink-0 px-3 sm:px-6 py-2.5 sm:py-4 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="p-1.5 sm:hidden rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer mr-1"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#229938]/20 border border-[#229938]/50 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-semibold block">
                GREEN APPLE CATERING
              </span>
              <h2 className="font-serif text-base sm:text-2xl text-white font-normal leading-none mt-0.5">
                Explore Menus
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center border border-white/10"
            aria-label="Close menus display"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </header>

        {/* Slider Body without text descriptions */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
          <MenuSlider onOpenQuote={onOpenQuote} />
        </div>
      </div>
    </div>
  );
}

export { PresetMenusModal as RealMenusModal };
