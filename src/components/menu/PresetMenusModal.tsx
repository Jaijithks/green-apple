"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { PRESET_MENUS, PresetMenu, MENU_ITEMS } from "@/data/menuBuilderData";

interface PresetMenusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetMenu) => void;
}

export default function PresetMenusModal({
  isOpen,
  onClose,
  onSelectPreset,
}: PresetMenusModalProps) {
  const [expandedPresetId, setExpandedPresetId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-fadeIn">
      {/* Container */}
      <div className="relative w-full h-full sm:h-[92vh] sm:max-w-5xl bg-[#072018] border-0 sm:border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Sticky Mobile/Desktop Header */}
        <header className="flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#229938]/20 border border-[#229938]/50 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-semibold block">
                CURATED COLLECTIONS
              </span>
              <h2 className="font-serif text-base sm:text-2xl text-white font-normal leading-none mt-0.5">
                Explore Preset Menus
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close preset menus"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Presets Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 px-2">
            <h3 className="font-serif text-xl sm:text-3xl text-white font-normal">
              Signature Menus Crafted by Master Chefs
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Choose an expertly curated celebration menu as your starting point. You can customize dishes, add live counters, and adjust serving styles in the builder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {PRESET_MENUS.map((preset) => {
              const itemsList = preset.itemIds
                .map((id) => MENU_ITEMS.find((m) => m.id === id))
                .filter(Boolean);

              const isExpanded = expandedPresetId === preset.id;
              const displayItems = isExpanded ? itemsList : itemsList.slice(0, 5);

              return (
                <div
                  key={preset.id}
                  className="group bg-[#0A261D] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative h-44 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={preset.image}
                      alt={preset.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A261D] via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.8 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-black/60 text-emerald-300 border border-white/20 backdrop-blur-md">
                        {preset.serviceStyle.toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                        {preset.tagline}
                      </span>
                      <h4 className="font-serif text-lg sm:text-2xl text-white font-normal leading-tight mt-0.5">
                        {preset.name}
                      </h4>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3">
                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        {preset.description}
                      </p>

                      <div className="text-[11px] text-gray-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="text-emerald-400 font-semibold block sm:inline">Ideal For: </span>
                        <span>{preset.idealFor}</span>
                      </div>

                      {/* Included Specialties with Expand/Collapse */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                            INCLUDED SPECIALTIES ({itemsList.length})
                          </span>
                          {itemsList.length > 5 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedPresetId(isExpanded ? null : preset.id);
                              }}
                              className="text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                            >
                              {isExpanded ? "Show Less" : `+${itemsList.length - 5} More`}
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {displayItems.map((it) => (
                            <span
                              key={it?.id}
                              className="px-2.5 py-1 rounded-lg text-[11px] bg-white/5 border border-white/10 text-gray-200"
                            >
                              {it?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Customize CTA */}
                    <div className="pt-3 sm:pt-4 border-t border-white/10">
                      <button
                        onClick={() => onSelectPreset(preset)}
                        className="w-full py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer group/btn min-h-[44px]"
                      >
                        <span>CUSTOMIZE THIS MENU</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

