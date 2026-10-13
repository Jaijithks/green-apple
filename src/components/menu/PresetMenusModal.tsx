"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full h-full sm:h-[94vh] sm:max-w-5xl bg-[#072018] border-0 sm:border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <header className="flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
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
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close menus display"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Slider Body without text descriptions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
          <MenuSlider onOpenQuote={onOpenQuote} />
        </div>
      </div>
    </div>
  );
}

export { PresetMenusModal as RealMenusModal };
