"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Share2,
  Calendar,
  Users,
  MapPin,
  Utensils,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  FileText,
  Copy,
  CheckCheck,
} from "lucide-react";
import {
  SERVICE_STYLES,
  MENU_CATEGORIES,
  MENU_ITEMS,
  ServiceStyleId,
  MenuItem,
  CateringCounter,
  EventDetails,
  PresetMenu,
} from "@/data/menuBuilderData";
import { siteConfig } from "@/data/site";

interface MenuBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreset?: PresetMenu | null;
}

const STEPS = [
  { id: 1, label: "SERVICE STYLE", short: "Service" },
  { id: 2, label: "BUILD MENU", short: "Menu" },
  { id: 3, label: "COUNTERS & PLAN", short: "Counters" },
  { id: 4, label: "REVIEW PLAN", short: "Review" },
  { id: 5, label: "ENQUIRE", short: "Enquiry" },
];

const STORAGE_KEY = "green_apple_catering_plan_v1";

export default function MenuBuilderModal({
  isOpen,
  onClose,
  initialPreset,
}: MenuBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceStyle, setSelectedServiceStyle] = useState<ServiceStyleId>("buffet");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("welcome-drinks");
  const [counters, setCounters] = useState<CateringCounter[]>([]);
  const [newCounterName, setNewCounterName] = useState<string>("");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [presetNotice, setPresetNotice] = useState<string | null>(null);

  const [eventDetails, setEventDetails] = useState<EventDetails>({
    fullName: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    guestCount: "",
    location: "",
    additionalNotes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize or load preset
  useEffect(() => {
    if (initialPreset) {
      setSelectedServiceStyle(initialPreset.serviceStyle);
      setSelectedItemIds(initialPreset.itemIds);
      if (initialPreset.suggestedCounters && initialPreset.suggestedCounters.length > 0) {
        setCounters(
          initialPreset.suggestedCounters.map((c, i) => ({
            id: `counter-${i + 1}`,
            name: c.name,
            itemIds: c.itemIds,
          }))
        );
      } else {
        setCounters([]);
      }
      setPresetNotice(initialPreset.name);
      setCurrentStep(2);
      return;
    }

    // Try loading saved session
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.selectedServiceStyle) setSelectedServiceStyle(parsed.selectedServiceStyle);
          if (parsed.selectedItemIds) setSelectedItemIds(parsed.selectedItemIds);
          if (parsed.counters) setCounters(parsed.counters);
          if (parsed.eventDetails) setEventDetails(parsed.eventDetails);
        }
      } catch (e) {
        console.error("Failed to restore session menu", e);
      }
    }
  }, [initialPreset, isOpen]);

  // Persist session
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            selectedServiceStyle,
            selectedItemIds,
            counters,
            eventDetails,
          })
        );
      } catch (e) {
        // ignore
      }
    }
  }, [selectedServiceStyle, selectedItemIds, counters, eventDetails]);

  // Filter categories by service style
  const availableCategories = useMemo(() => {
    return MENU_CATEGORIES.filter(
      (cat) => !cat.serviceStyles || cat.serviceStyles.includes(selectedServiceStyle)
    );
  }, [selectedServiceStyle]);

  // Set default active category when service style changes
  useEffect(() => {
    if (availableCategories.length > 0) {
      if (!availableCategories.some((c) => c.id === activeCategoryId)) {
        setActiveCategoryId(availableCategories[0].id);
      }
    }
  }, [availableCategories, activeCategoryId]);

  // Filtered menu items for the active category and service style
  const currentCategoryItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCat = item.category === activeCategoryId;
      const matchStyle =
        !item.serviceStyles || item.serviceStyles.includes(selectedServiceStyle);
      return matchCat && matchStyle;
    });
  }, [activeCategoryId, selectedServiceStyle]);

  // Selected items objects
  const selectedItems = useMemo(() => {
    return selectedItemIds
      .map((id) => MENU_ITEMS.find((m) => m.id === id))
      .filter(Boolean) as MenuItem[];
  }, [selectedItemIds]);

  // Group selected items by category
  const selectedItemsByCategory = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    selectedItems.forEach((item) => {
      if (!map[item.category]) {
        map[item.category] = [];
      }
      map[item.category].push(item);
    });
    return map;
  }, [selectedItems]);

  // Toggle item selection
  const handleToggleItem = (itemId: string) => {
    setSelectedItemIds((prev) => {
      if (prev.includes(itemId)) {
        // also remove from counters
        setCounters((prevCounters) =>
          prevCounters.map((c) => ({
            ...c,
            itemIds: c.itemIds.filter((id) => id !== itemId),
          }))
        );
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Add counter
  const handleAddCounter = () => {
    if (!newCounterName.trim()) return;
    const newCounter: CateringCounter = {
      id: `counter-${Date.now()}`,
      name: newCounterName.trim(),
      itemIds: [],
    };
    setCounters((prev) => [...prev, newCounter]);
    setNewCounterName("");
  };

  // Remove counter
  const handleRemoveCounter = (counterId: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== counterId));
  };

  // Assign item to counter
  const handleToggleItemInCounter = (counterId: string, itemId: string) => {
    setCounters((prev) =>
      prev.map((counter) => {
        if (counter.id === counterId) {
          const has = counter.itemIds.includes(itemId);
          return {
            ...counter,
            itemIds: has
              ? counter.itemIds.filter((id) => id !== itemId)
              : [...counter.itemIds, itemId],
          };
        }
        return counter;
      })
    );
  };

  // Auto-generate suggested counters for buffet
  const handleAutoOrganizeCounters = () => {
    const mainItems = selectedItems.filter((i) =>
      ["main-course", "rice-biryani", "side-dishes"].includes(i.category)
    );
    const starterItems = selectedItems.filter((i) =>
      ["welcome-drinks", "starters"].includes(i.category)
    );
    const breadLiveItems = selectedItems.filter((i) =>
      ["breads", "live-counters"].includes(i.category)
    );
    const dessertItems = selectedItems.filter((i) =>
      ["desserts", "beverages"].includes(i.category)
    );

    const generated: CateringCounter[] = [];
    if (starterItems.length > 0) {
      generated.push({
        id: `counter-starters`,
        name: "Welcome Drinks & Starters Lounge",
        itemIds: starterItems.map((i) => i.id),
      });
    }
    if (mainItems.length > 0) {
      generated.push({
        id: `counter-mains`,
        name: "Grand Main Feast & Biryani Counter",
        itemIds: mainItems.map((i) => i.id),
      });
    }
    if (breadLiveItems.length > 0) {
      generated.push({
        id: `counter-breads`,
        name: "Live Appam & Breads Station",
        itemIds: breadLiveItems.map((i) => i.id),
      });
    }
    if (dessertItems.length > 0) {
      generated.push({
        id: `counter-desserts`,
        name: "Gourmet Dessert & Payasam Counter",
        itemIds: dessertItems.map((i) => i.id),
      });
    }
    setCounters(generated);
  };

  // Validate Step 5
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!eventDetails.fullName.trim()) errors.fullName = "Please provide your name";
    if (!eventDetails.phone.trim()) errors.phone = "Please provide your phone number";
    if (!eventDetails.guestCount.trim()) errors.guestCount = "Approx. guest count is required";
    if (!eventDetails.location.trim()) errors.location = "Event location/city is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate WhatsApp Message text
  const generateWhatsAppMessage = () => {
    const styleObj = SERVICE_STYLES.find((s) => s.id === selectedServiceStyle);
    let msg = `*NEW CUSTOM CATERING ENQUIRY — GREEN APPLE*\n\n`;
    msg += `*Customer:* ${eventDetails.fullName || "Valued Client"}\n`;
    msg += `*Phone:* ${eventDetails.phone || "Not specified"}\n`;
    msg += `*Event Type:* ${eventDetails.eventType}\n`;
    if (eventDetails.eventDate) msg += `*Date:* ${eventDetails.eventDate}\n`;
    msg += `*Guests:* ${eventDetails.guestCount}\n`;
    msg += `*Location:* ${eventDetails.location}\n`;
    msg += `*Service Style:* ${styleObj?.title || selectedServiceStyle.toUpperCase()}\n\n`;

    msg += `*--- SELECTED MENU (${selectedItems.length} Items) ---*\n`;

    Object.entries(selectedItemsByCategory).forEach(([catId, items]) => {
      const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
      msg += `\n*${catObj?.name || catId.toUpperCase()}:*\n`;
      items.forEach((item) => {
        msg += `• ${item.name}\n`;
      });
    });

    if (selectedServiceStyle === "buffet" && counters.length > 0) {
      msg += `\n*--- PLANNED COUNTERS (${counters.length}) ---*\n`;
      counters.forEach((c, idx) => {
        msg += `\n*Counter ${idx + 1}: ${c.name}*\n`;
        const cItems = c.itemIds
          .map((id) => MENU_ITEMS.find((m) => m.id === id)?.name)
          .filter(Boolean);
        if (cItems.length > 0) {
          cItems.forEach((name) => (msg += `  - ${name}\n`));
        } else {
          msg += `  - (Items to be curated with team)\n`;
        }
      });
    }

    if (eventDetails.additionalNotes.trim()) {
      msg += `\n*Additional Requirements:*\n${eventDetails.additionalNotes.trim()}\n`;
    }

    msg += `\nPlease review and share the menu options and quotation. Thank you!`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    const msg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopySummary = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-fadeIn">
      {/* Main Full-Screen/Modal Container */}
      <div className="relative w-full h-full sm:h-[94vh] sm:max-w-6xl bg-[#072018] border-0 sm:border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Top Header Bar (Mobile + Desktop) */}
        <header className="flex-shrink-0 px-3.5 sm:px-6 py-3 sm:py-4 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#229938]/20 border border-[#229938]/50 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-semibold truncate block">
                  GREEN APPLE CATERING
                </span>
                {presetNotice && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Preset: {presetNotice}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-sm sm:text-xl text-white font-normal leading-none mt-0.5 truncate">
                Build Your Custom Menu
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="px-2.5 py-1 rounded-full bg-[#229938]/20 border border-[#229938]/40 text-emerald-300 text-[11px] font-semibold flex items-center space-x-1">
              <span>{selectedItems.length}</span>
              <span className="hidden sm:inline">Items</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close builder"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* Responsive Progress Indicator: Compact Progress on Mobile, Full Steps Bar on Desktop */}
        {/* Mobile Progress Bar (Compact) */}
        <div className="sm:hidden flex-shrink-0 px-4 py-2.5 bg-[#051812]/80 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[9.5px] uppercase tracking-widest text-emerald-400 font-bold block">
              STEP {currentStep} OF 5
            </span>
            <span className="text-xs font-semibold text-white">
              {STEPS.find((s) => s.id === currentStep)?.label}
            </span>
          </div>

          {/* Thin Progress bar */}
          <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#229938] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop Progress Bar */}
        <nav className="hidden sm:block flex-shrink-0 px-6 py-2.5 bg-[#072018] border-b border-white/10">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((s, idx) => {
              const isCurrent = currentStep === s.id;
              const isCompleted = currentStep > s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(s.id)}
                    className={`flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isCurrent
                        ? "text-emerald-400"
                        : isCompleted
                        ? "text-white hover:text-emerald-300"
                        : "text-gray-300 hover:text-gray-200"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isCurrent
                          ? "bg-[#229938] text-white shadow-md shadow-emerald-950"
                          : isCompleted
                          ? "bg-emerald-900/60 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </span>
                    <span>{s.label}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <div className="w-8 lg:w-12 h-[1px] bg-white/15 mx-3" />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Main Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
          {/* Scrollable Step Workspace */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 pb-28 md:pb-8">
            {/* ======================================================== */}
            {/* STEP 1: SERVICE STYLE */}
            {/* ======================================================== */}
            {currentStep === 1 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="text-center space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 01
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-white font-normal">
                    How would you like your food to be served?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto">
                    Select your dining format. Categories and counter options will adapt automatically.
                  </p>
                </div>

                {/* Vertical Stack on Mobile, 3-Col on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 pt-2 sm:pt-4">
                  {SERVICE_STYLES.map((style) => {
                    const isSelected = selectedServiceStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setSelectedServiceStyle(style.id)}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border ${
                          isSelected
                            ? "border-[#229938] ring-2 ring-[#229938]/60 bg-[#0E362A] shadow-xl shadow-emerald-950/80 scale-[1.01] sm:scale-[1.02]"
                            : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="relative h-36 sm:h-48 w-full overflow-hidden">
                          <Image
                            src={style.image}
                            alt={style.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#072018] via-transparent to-transparent" />
                          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                            <span className="px-2.5 py-0.8 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-black/60 text-emerald-300 border border-white/20 backdrop-blur-md">
                              {style.badge}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#229938] text-white flex items-center justify-center shadow-lg">
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <h3 className="font-serif text-lg sm:text-2xl text-white font-normal group-hover:text-emerald-300 transition-colors">
                              {style.title}
                            </h3>
                            <span className="text-[10.5px] sm:text-[11px] text-emerald-400 font-medium block mt-0.5">
                              {style.subtitle}
                            </span>
                            <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
                              {style.description}
                            </p>
                          </div>

                          <div className="pt-2 sm:pt-3">
                            <div
                              className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition-all ${
                                isSelected
                                  ? "bg-[#229938] text-white"
                                  : "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                              }`}
                            >
                              {isSelected ? "Selected Service" : "Select This Style"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 sm:pt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <span>PROCEED TO BUILD MENU</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 2: BUILD MENU (FOOD ITEM SELECTION) */}
            {/* ======================================================== */}
            {currentStep === 2 && (
              <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                      STEP 02 · {selectedServiceStyle.toUpperCase()}
                    </span>
                    <h2 className="font-serif text-xl sm:text-3xl text-white font-normal mt-0.5">
                      Select Dishes & Specialties
                    </h2>
                  </div>
                  <div className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="text-emerald-400 font-semibold">{selectedItems.length}</span> chosen
                  </div>
                </div>

                {/* Horizontally scrollable Category bar sticky on mobile */}
                <div className="sticky top-0 z-10 bg-[#072018]/95 backdrop-blur-md py-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 no-scrollbar">
                    {availableCategories.map((cat) => {
                      const isActive = cat.id === activeCategoryId;
                      const countInCat = (selectedItemsByCategory[cat.id] || []).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategoryId(cat.id)}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer min-h-[38px] ${
                            isActive
                              ? "bg-[#229938] text-white shadow-md shadow-emerald-950"
                              : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                          }`}
                        >
                          <span>{cat.shortName}</span>
                          {countInCat > 0 && (
                            <span
                              className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                                isActive ? "bg-white text-emerald-900" : "bg-[#229938] text-white"
                              }`}
                            >
                              {countInCat}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category Description */}
                {availableCategories.find((c) => c.id === activeCategoryId)?.description && (
                  <p className="text-[11.5px] sm:text-xs text-gray-300 font-light italic">
                    {availableCategories.find((c) => c.id === activeCategoryId)?.description}
                  </p>
                )}

                {/* Food Items Grid: 1-col on small mobile, 2-col on tablet, 3-col on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {currentCategoryItems.map((item) => {
                    const isSelected = selectedItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleItem(item.id)}
                        className={`group relative rounded-xl sm:rounded-2xl p-3 sm:p-4 border cursor-pointer transition-all duration-200 flex items-start space-x-3 ${
                          isSelected
                            ? "bg-[#0E362A] border-[#229938] shadow-md shadow-emerald-950/60 ring-1 ring-[#229938]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25"
                        }`}
                      >
                        {/* Thumbnail */}
                        {item.image && (
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="80px"
                            />
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-6">
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <h4 className="font-serif text-sm sm:text-lg text-white font-normal leading-tight group-hover:text-emerald-300 transition-colors">
                              {item.name}
                            </h4>
                            {item.isSignature && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex-shrink-0 mt-0.5">
                                Signature
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[10.5px] sm:text-[11px] text-gray-300 font-light mt-1 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Checkbox badge */}
                        <div
                          className={`absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#229938] text-white shadow-md"
                              : "border border-white/30 text-transparent group-hover:border-white/60"
                          }`}
                        >
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="pt-4 sm:pt-6 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
                  >
                    <span>Organize Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 3: COUNTERS & SERVICE PLAN */}
            {/* ======================================================== */}
            {currentStep === 3 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3 sm:pb-4">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 03 · CATERING LAYOUT
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl text-white font-normal mt-0.5">
                    {selectedServiceStyle === "buffet"
                      ? "Organize Your Catering Counters"
                      : selectedServiceStyle === "table-service"
                      ? "Table Service Course Plan"
                      : "Traditional Sadya Serving Sequence"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 max-w-2xl">
                    {selectedServiceStyle === "buffet"
                      ? "Group your chosen dishes into physical stations (e.g. Welcome Drinks, Biryani Station, Live Counter, Desserts)."
                      : selectedServiceStyle === "table-service"
                      ? "Your dishes will be served and replenished table-side by our hospitality team."
                      : "Items will be served in the authentic Kerala sequential order on fresh banana leaves."}
                  </p>
                </div>

                {/* BUFFET COUNTERS BUILDER */}
                {selectedServiceStyle === "buffet" ? (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Add Counter Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10">
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="e.g. Live Grill Station, Dessert Lounge..."
                          value={newCounterName}
                          onChange={(e) => setNewCounterName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddCounter()}
                          className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-emerald-400 min-h-[40px]"
                        />
                        <button
                          onClick={handleAddCounter}
                          className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white flex items-center space-x-1 cursor-pointer flex-shrink-0 min-h-[40px]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>

                      <button
                        onClick={handleAutoOrganizeCounters}
                        className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-emerald-300 border border-white/10 flex items-center justify-center space-x-1.5 cursor-pointer flex-shrink-0 min-h-[40px]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Auto-Suggest Stations</span>
                      </button>
                    </div>

                    {/* Counters List */}
                    {counters.length === 0 ? (
                      <div className="text-center py-8 sm:py-12 px-4 rounded-2xl border border-dashed border-white/20 bg-white/5 space-y-2.5">
                        <Layers className="w-7 h-7 text-emerald-400/60 mx-auto" />
                        <h4 className="font-serif text-base sm:text-lg text-white">No catering stations created yet</h4>
                        <p className="text-xs text-gray-400 max-w-md mx-auto font-light">
                          Click <strong>Auto-Suggest Stations</strong> or type a counter name above to organize your {selectedItems.length} dishes.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                        {counters.map((counter, idx) => (
                          <div
                            key={counter.id}
                            className="bg-[#0A261D] border border-white/15 rounded-2xl p-4 space-y-2.5 shadow-lg"
                          >
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <div>
                                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold block">
                                  STATION 0{idx + 1}
                                </span>
                                <h4 className="font-serif text-base sm:text-lg text-white font-normal">
                                  {counter.name}
                                </h4>
                              </div>
                              <button
                                onClick={() => handleRemoveCounter(counter.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                                title="Remove counter"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Assigned items in counter */}
                            <div className="space-y-1.5 min-h-[50px]">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                                Assigned Dishes ({counter.itemIds.length}):
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedItems.map((item) => {
                                  const isAssigned = counter.itemIds.includes(item.id);
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => handleToggleItemInCounter(counter.id, item.id)}
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center space-x-1 cursor-pointer min-h-[30px] ${
                                        isAssigned
                                          ? "bg-[#229938] text-white"
                                          : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                                      }`}
                                    >
                                      <span>{item.name}</span>
                                      {isAssigned && <Check className="w-3 h-3 ml-0.5" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* TABLE SERVICE / SADYA SUMMARY */
                  <div className="bg-[#0A261D] border border-white/15 rounded-2xl p-4 sm:p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-serif text-lg sm:text-xl text-white font-normal">
                          {selectedServiceStyle === "table-service" ? "Seated Table Service Plan" : "Authentic Kerala Sadya Sequence"}
                        </h4>
                        <p className="text-xs text-gray-300 font-light">
                          {selectedServiceStyle === "table-service"
                            ? `All ${selectedItems.length} dishes will be served and replenished course-by-course at tables.`
                            : `Served sequentially in time-honored traditional ceremony on fresh plantain leaves.`}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {Object.entries(selectedItemsByCategory).map(([catId, items]) => {
                        const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
                        return (
                          <div key={catId} className="bg-black/30 p-3 rounded-xl border border-white/10">
                            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                              {catObj?.name || catId} ({items.length})
                            </span>
                            <ul className="mt-1.5 space-y-1 text-xs text-gray-200">
                              {items.map((it) => (
                                <li key={it.id} className="flex items-center space-x-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>{it.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-4 sm:pt-6 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
                  >
                    <span>Review Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 4: REVIEW CATERING PLAN */}
            {/* ======================================================== */}
            {currentStep === 4 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3 sm:pb-4">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 04 · SUMMARY
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl text-white font-normal mt-0.5">
                    Review Your Catering Plan
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                    Check your selected service style, items, and stations before proceeding to enquiry.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#0A261D] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl">
                  {/* Service Format Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-white/10 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                        SERVICE FORMAT
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
                        {SERVICE_STYLES.find((s) => s.id === selectedServiceStyle)?.title}
                      </h3>
                      <p className="text-xs text-gray-300 font-light">
                        {SERVICE_STYLES.find((s) => s.id === selectedServiceStyle)?.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-center">
                        <span className="text-base sm:text-lg font-serif text-white font-bold block">
                          {selectedItems.length}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">
                          Dishes
                        </span>
                      </div>
                      {selectedServiceStyle === "buffet" && (
                        <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-center">
                          <span className="text-base sm:text-lg font-serif text-white font-bold block">
                            {counters.length}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-gray-400">
                            Counters
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Menu Breakdown by Category */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                        Selected Dishes ({selectedItems.length})
                      </h4>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                      >
                        Edit Menu →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {Object.entries(selectedItemsByCategory).map(([catId, items]) => {
                        const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
                        return (
                          <div
                            key={catId}
                            className="bg-black/30 p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5"
                          >
                            <span className="text-[10.5px] uppercase tracking-wider text-emerald-300 font-semibold block border-b border-white/10 pb-1">
                              {catObj?.name || catId} ({items.length})
                            </span>
                            <ul className="space-y-1">
                              {items.map((it) => (
                                <li
                                  key={it.id}
                                  className="text-xs text-gray-200 flex items-center justify-between"
                                >
                                  <span>{it.name}</span>
                                  {it.isSignature && (
                                    <span className="text-[9px] text-emerald-400 italic">
                                      Signature
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Planned Counters (Buffet) */}
                  {selectedServiceStyle === "buffet" && counters.length > 0 && (
                    <div className="space-y-2.5 pt-3 border-t border-white/10">
                      <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                        Planned Stations ({counters.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {counters.map((c, i) => (
                          <div key={c.id} className="bg-black/20 p-3 rounded-xl border border-white/10 text-xs">
                            <span className="font-semibold text-white block">
                              Station {i + 1}: {c.name}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {c.itemIds.length} assigned dishes
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="pt-4 sm:pt-6 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Menu</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <span>Continue to Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 5: EVENT DETAILS & WHATSAPP ENQUIRY */}
            {/* ======================================================== */}
            {currentStep === 5 && (
              <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3 sm:pb-4">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 05 · FINAL STEP
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl text-white font-normal mt-0.5">
                    Your Event Details & Quotation Request
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                    Provide basic event details. We will generate your complete pre-written plan to send directly to Green Apple on WhatsApp.
                  </p>
                </div>

                {/* Form Inputs */}
                <div className="bg-[#0A261D] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-3.5 sm:space-y-4 shadow-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Your Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Nair"
                        value={eventDetails.fullName}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, fullName: e.target.value })
                        }
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden min-h-[44px] ${
                          formErrors.fullName ? "border-red-400" : "border-white/20 focus:border-emerald-400"
                        }`}
                      />
                      {formErrors.fullName && (
                        <span className="text-[10px] text-red-400 mt-1 block">
                          {formErrors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Phone / WhatsApp Number <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={eventDetails.phone}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, phone: e.target.value })
                        }
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden min-h-[44px] ${
                          formErrors.phone ? "border-red-400" : "border-white/20 focus:border-emerald-400"
                        }`}
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] text-red-400 mt-1 block">
                          {formErrors.phone}
                        </span>
                      )}
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Event Type
                      </label>
                      <select
                        value={eventDetails.eventType}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, eventType: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-hidden focus:border-emerald-400 cursor-pointer min-h-[44px]"
                      >
                        <option value="Wedding">Wedding Reception / Betrothal</option>
                        <option value="Birthday">Birthday Gala / Jubilee</option>
                        <option value="Corporate">Corporate Conference / Annual Meet</option>
                        <option value="Housewarming">Housewarming / Gruhapravesam</option>
                        <option value="Family Gathering">Family Gathering / Social Reunion</option>
                        <option value="Other">Other Celebration</option>
                      </select>
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Event Date (or Approx Month)
                      </label>
                      <input
                        type="date"
                        value={eventDetails.eventDate}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, eventDate: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-hidden focus:border-emerald-400 min-h-[44px]"
                      />
                    </div>

                    {/* Guests Count */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Approx. Number of Guests <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 250 - 300"
                        value={eventDetails.guestCount}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, guestCount: e.target.value })
                        }
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden min-h-[44px] ${
                          formErrors.guestCount ? "border-red-400" : "border-white/20 focus:border-emerald-400"
                        }`}
                      />
                      {formErrors.guestCount && (
                        <span className="text-[10px] text-red-400 mt-1 block">
                          {formErrors.guestCount}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                        Event Location / Venue City <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kothamangalam, Muvattupuzha"
                        value={eventDetails.location}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, location: e.target.value })
                        }
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden min-h-[44px] ${
                          formErrors.location ? "border-red-400" : "border-white/20 focus:border-emerald-400"
                        }`}
                      />
                      {formErrors.location && (
                        <span className="text-[10px] text-red-400 mt-1 block">
                          {formErrors.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                      Anything else you would like us to know? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special dietary preferences, live counter ideas, decoration requests..."
                      value={eventDetails.additionalNotes}
                      onChange={(e) =>
                        setEventDetails({ ...eventDetails, additionalNotes: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-emerald-400"
                    />
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-3 space-y-2.5">
                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl shadow-emerald-950/70 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98 min-h-[48px]"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Send Complete Plan on WhatsApp →</span>
                    </button>

                    <button
                      onClick={handleCopySummary}
                      className="w-full py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[40px]"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Plan Copied to Clipboard!" : "Copy Catering Summary Text"}</span>
                    </button>
                  </div>
                </div>

                <div className="text-center text-[10.5px] sm:text-[11px] text-gray-400 font-light">
                  Our catering managers in Kothamangalam will review your menu selections and provide available options & custom quotation.
                </div>
              </div>
            )}
          </main>

          {/* ======================================================== */}
          {/* DESKTOP STICKY CATERING PLAN SIDEBAR */}
          {/* ======================================================== */}
          <aside className="hidden md:flex w-80 lg:w-96 flex-col bg-[#051812] border-l border-white/10 p-5 lg:p-6 overflow-y-auto justify-between flex-shrink-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[9.5px] uppercase tracking-widest text-emerald-400 font-semibold block">
                    YOUR CATERING PLAN
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal">
                    {SERVICE_STYLES.find((s) => s.id === selectedServiceStyle)?.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#229938] text-white">
                  {selectedItems.length} Items
                </span>
              </div>

              {/* Selected List */}
              <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-gray-400 font-light italic py-4">
                    No dishes selected yet. Browse categories to select your favorites.
                  </p>
                ) : (
                  Object.entries(selectedItemsByCategory).map(([catId, items]) => {
                    const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
                    return (
                      <div key={catId} className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-emerald-400/90 font-medium">
                          {catObj?.shortName || catId} ({items.length})
                        </span>
                        <div className="space-y-1">
                          {items.map((it) => (
                            <div
                              key={it.id}
                              className="text-xs text-gray-300 flex items-center justify-between bg-white/5 px-2.5 py-1.5 rounded-lg group"
                            >
                              <span className="truncate pr-2">{it.name}</span>
                              <button
                                onClick={() => handleToggleItem(it.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {selectedServiceStyle === "buffet" && (
                <div className="pt-2 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                  <span>Planned Stations:</span>
                  <span className="font-semibold text-emerald-400">{counters.length} Counters</span>
                </div>
              )}
            </div>

            {/* Quick Action in Sidebar */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950 transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px]"
                >
                  <span>{currentStep === 4 ? "Proceed to Enquiry →" : "Next Step →"}</span>
                </button>
              ) : (
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950 transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px]"
                >
                  <span>Send Enquiry on WhatsApp →</span>
                </button>
              )}
            </div>
          </aside>
        </div>

        {/* ======================================================== */}
        {/* MOBILE STICKY FLOATING BOTTOM BAR & DRAWER */}
        {/* ======================================================== */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#051812] border-t border-white/15 px-4 py-2.5 flex items-center justify-between shadow-2xl">
          <button
            onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
            className="flex items-center space-x-2 text-left cursor-pointer min-h-[44px]"
          >
            <div className="w-7 h-7 rounded-full bg-[#229938] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md">
              {selectedItems.length}
            </div>
            <div>
              <span className="text-[9.5px] uppercase tracking-wider text-emerald-400 font-semibold block leading-tight">
                YOUR CATERING PLAN
              </span>
              <span className="text-xs text-white font-medium flex items-center">
                {isMobileDrawerOpen ? "Hide Selected Plan" : "View Selected Items"}
                {isMobileDrawerOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-emerald-400" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5 ml-1 text-emerald-400" />
                )}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              if (currentStep < 5) setCurrentStep((prev) => prev + 1);
              else handleSendWhatsApp();
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md flex items-center space-x-1 cursor-pointer min-h-[40px]"
          >
            <span>{currentStep === 4 ? "Enquire" : currentStep === 5 ? "Send" : "Next"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Bottom Sheet Drawer */}
        {isMobileDrawerOpen && (
          <div className="md:hidden fixed inset-x-0 bottom-14 z-25 bg-[#072018] border-t border-white/20 rounded-t-3xl p-4 sm:p-5 max-h-[65vh] overflow-y-auto shadow-2xl space-y-3.5 animate-slideUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-1 bg-white/30 rounded-full mx-auto block mb-1" />
                <h3 className="font-serif text-base text-white">Your Selected Menu</h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-white/5 px-2 py-0.5 rounded-md">
                {selectedItems.length} dishes
              </span>
            </div>

            <div className="space-y-3">
              {selectedItems.length === 0 ? (
                <p className="text-xs text-gray-400 font-light italic py-2">No dishes chosen yet.</p>
              ) : (
                Object.entries(selectedItemsByCategory).map(([catId, items]) => {
                  const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
                  return (
                    <div key={catId} className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                        {catObj?.shortName || catId} ({items.length})
                      </span>
                      <div className="space-y-1">
                        {items.map((it) => (
                          <div
                            key={it.id}
                            className="text-xs text-gray-200 flex items-center justify-between bg-white/5 px-3 py-1.5 rounded-lg"
                          >
                            <span className="truncate pr-2">{it.name}</span>
                            <button
                              onClick={() => handleToggleItem(it.id)}
                              className="text-gray-400 hover:text-red-400 p-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-gray-300 bg-white/10 hover:bg-white/20 cursor-pointer"
              >
                Close Drawer
              </button>
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  if (currentStep < 5) setCurrentStep((prev) => prev + 1);
                  else handleSendWhatsApp();
                }}
                className="px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#229938] text-white cursor-pointer"
              >
                {currentStep === 4 ? "Go to Enquiry" : "Proceed →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

