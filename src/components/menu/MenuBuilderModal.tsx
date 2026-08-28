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
  AlertTriangle,
  Menu as MenuIcon,
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
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

interface MenuBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreset?: PresetMenu | null;
}

const STEPS = [
  { id: 1, label: "SERVICE STYLE", short: "Style" },
  { id: 2, label: "BUILD MENU", short: "Menu" },
  { id: 3, label: "COUNTERS & PLAN", short: "Plan" },
  { id: 4, label: "REVIEW PLAN", short: "Review" },
  { id: 5, label: "ENQUIRE", short: "Enquire" },
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
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [presetNotice, setPresetNotice] = useState<string | null>(null);

  const [eventDetails, setEventDetails] = useState<EventDetails>({
    fullName: "",
    phone: "",
    eventType: "Wedding",
    customEventType: "",
    eventDate: "",
    guestCount: "",
    location: "",
    additionalNotes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.serviceStyle) setSelectedServiceStyle(parsed.serviceStyle);
        if (parsed.itemIds) setSelectedItemIds(parsed.itemIds);
        if (parsed.counters) setCounters(parsed.counters);
        if (parsed.eventDetails) setEventDetails(parsed.eventDetails);
      }
    } catch {
      // ignore
    }
  }, [initialPreset, isOpen]);

  useEffect(() => {
    if (selectedItemIds.length > 0 || counters.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            serviceStyle: selectedServiceStyle,
            itemIds: selectedItemIds,
            counters,
            eventDetails,
          })
        );
      } catch {
        // ignore
      }
    }
  }, [selectedServiceStyle, selectedItemIds, counters, eventDetails]);

  const [dynamicItems, setDynamicItems] = useState<MenuItem[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/menu/items?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: MenuItem[] = data.data.map((item: any) => ({
            id: item.slug || item._id,
            name: item.name,
            category: item.category,
            description: item.description,
            image: item.image,
            serviceStyles: item.serviceStyles,
            isSignature: item.isSignature || item.isPopular,
          }));
          setDynamicItems(mapped);
        }
      })
      .catch(() => {});

    fetch("/api/menu/categories?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((cat: any, idx: number) => ({
            id: cat.slug,
            number: cat.number || `${idx + 1}`.padStart(2, "0"),
            name: cat.name,
            shortName: cat.shortName || cat.name,
            serviceStyles: cat.serviceStyles,
            description: cat.description,
          }));
          setDynamicCategories(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const allCategories = dynamicCategories.length > 0 ? dynamicCategories : MENU_CATEGORIES;
  const allItems = dynamicItems.length > 0 ? dynamicItems : MENU_ITEMS;

  const availableCategories = useMemo(() => {
    return allCategories.filter((cat: any) =>
      !cat.serviceStyles || cat.serviceStyles.includes(selectedServiceStyle)
    );
  }, [selectedServiceStyle, allCategories]);

  useEffect(() => {
    if (
      availableCategories.length > 0 &&
      !availableCategories.some((c: any) => c.id === activeCategoryId)
    ) {
      setActiveCategoryId(availableCategories[0].id);
    }
  }, [selectedServiceStyle, availableCategories, activeCategoryId]);

  const activeCategory = useMemo(() => {
    return (
      allCategories.find((c: any) => c.id === activeCategoryId) ||
      availableCategories[0] ||
      allCategories[0]
    );
  }, [activeCategoryId, availableCategories, allCategories]);

  const categoryItems = useMemo(() => {
    return allItems.filter(
      (item) =>
        item.category === activeCategoryId &&
        (!item.serviceStyles || item.serviceStyles.includes(selectedServiceStyle))
    );
  }, [activeCategoryId, selectedServiceStyle, allItems]);

  const selectedItems = useMemo(() => {
    return allItems.filter((i) => selectedItemIds.includes(i.id));
  }, [selectedItemIds, allItems]);

  const selectedItemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};
    selectedItems.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return grouped;
  }, [selectedItems]);

  const handleToggleItem = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectServiceStyle = (styleId: ServiceStyleId) => {
    setSelectedServiceStyle(styleId);
    if (selectedItemIds.length === 0) {
      const defaultItems = allItems
        .filter((i) => (!i.serviceStyles || i.serviceStyles.includes(styleId)) && i.isSignature)
        .slice(0, 6)
        .map((i) => i.id);
      setSelectedItemIds(defaultItems);
    }
  };

  const handleClearAll = () => {
    setSelectedItemIds([]);
    setCounters([]);
    setPresetNotice(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsClearConfirmOpen(false);
  };

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

  const handleRemoveCounter = (id: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleItemInCounter = (counterId: string, itemId: string) => {
    setCounters((prev) =>
      prev.map((c) => {
        if (c.id !== counterId) return c;
        const exists = c.itemIds.includes(itemId);
        return {
          ...c,
          itemIds: exists ? c.itemIds.filter((id) => id !== itemId) : [...c.itemIds, itemId],
        };
      })
    );
  };

  const handleAutoOrganizeCounters = () => {
    const starterItems = selectedItems.filter((i) =>
      ["welcome-drinks", "starters"].includes(i.category)
    );
    const mainItems = selectedItems.filter((i) =>
      ["mains", "rice", "sides"].includes(i.category)
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
        name: "Welcome Drinks & Appetizer Lounge",
        itemIds: starterItems.map((i) => i.id),
      });
    }
    if (mainItems.length > 0) {
      generated.push({
        id: `counter-mains`,
        name: "Grand Main Feast & Biryani Station",
        itemIds: mainItems.map((i) => i.id),
      });
    }
    if (breadLiveItems.length > 0) {
      generated.push({
        id: `counter-breads`,
        name: "Live Appam & Fresh Breads Station",
        itemIds: breadLiveItems.map((i) => i.id),
      });
    }
    if (dessertItems.length > 0) {
      generated.push({
        id: `counter-desserts`,
        name: "Artisanal Dessert & Sweet Counter",
        itemIds: dessertItems.map((i) => i.id),
      });
    }
    setCounters(generated);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!eventDetails.fullName.trim()) errors.fullName = "Name is required";
    if (!eventDetails.phone.trim()) errors.phone = "Phone is required";
    if (!eventDetails.guestCount.trim()) errors.guestCount = "Guest count is required";
    if (!eventDetails.location.trim()) errors.location = "Location is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const styleObj = SERVICE_STYLES.find((s) => s.id === selectedServiceStyle);
    let msg = `*NEW CATERING ENQUIRY — GREEN APPLE*\n\n`;
    msg += `*Client:* ${eventDetails.fullName || "Valued Guest"}\n`;
    msg += `*Phone:* ${eventDetails.phone || "N/A"}\n`;
    msg += `*Event:* ${eventDetails.eventType}\n`;
    msg += `*Date:* ${eventDetails.eventDate || "TBD"}\n`;
    msg += `*Guests:* ${eventDetails.guestCount}\n`;
    msg += `*Location:* ${eventDetails.location}\n`;
    msg += `*Style:* ${styleObj?.title || "Selected"}\n\n`;
    msg += `*--- SELECTED MENU (${selectedItems.length}) ---*\n`;

    Object.entries(selectedItemsByCategory).forEach(([catId, items]) => {
      const catObj = MENU_CATEGORIES.find((c) => c.id === catId);
      msg += `\n*${catObj?.name || catId.toUpperCase()}:*\n`;
      items.forEach((item) => {
        msg += `• ${item.name}\n`;
      });
    });

    if (selectedServiceStyle === "buffet" && counters.length > 0) {
      msg += `\n*--- CATERING COUNTERS LAYOUT ---*\n`;
      counters.forEach((cnt) => {
        const cItems = selectedItems.filter((i) => cnt.itemIds.includes(i.id));
        msg += `\n*${cnt.name}* (${cItems.length} items):\n`;
        cItems.forEach((ci) => {
          msg += `  - ${ci.name}\n`;
        });
      });
    }

    if (eventDetails.additionalNotes.trim()) {
      msg += `\n*Additional Notes / Preferences:*\n${eventDetails.additionalNotes}\n`;
    }

    msg += `\n_Generated via Green Apple Interactive Catering Planner_`;
    return msg;
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    const msg = generateWhatsAppMessage();
    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  const handleCopySummary = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-3 md:p-4 overflow-hidden animate-fadeIn">
      <div className="relative w-full h-full sm:h-[95vh] sm:max-w-6xl bg-[#072018] border-0 sm:border border-white/15 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        <header className="flex-shrink-0 px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#229938]/20 border border-[#229938]/60 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Utensils className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-emerald-400 font-bold truncate block">
                  GREEN APPLE CATERING
                </span>
              </div>
              <h1 className="font-serif text-sm sm:text-lg lg:text-xl text-white font-normal leading-tight mt-0.5 truncate">
                Build Your Custom Menu
              </h1>
              {presetNotice && (
                <div className="mt-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Preset: {presetNotice}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#229938]/20 border border-[#229938]/50 text-emerald-300 text-[11px] font-semibold flex items-center space-x-1">
              <span>{selectedItems.length}</span>
              <span>Items</span>
            </div>

            {selectedItems.length > 0 && (
              <button
                onClick={() => setIsClearConfirmOpen(true)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-300 border border-white/10 hover:border-red-400/40 text-[10px] font-medium transition-all flex items-center space-x-1 cursor-pointer"
                title="Clear all selected items and reset menu"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Close menu builder"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        <nav className="flex-shrink-0 px-3 sm:px-6 py-2.5 bg-[#051812]/90 border-b border-white/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between max-w-2xl mx-auto min-w-[320px] px-1">
            {STEPS.map((s, idx) => {
              const isCurrent = currentStep === s.id;
              const isCompleted = currentStep > s.id;
              const isLast = idx === STEPS.length - 1;

              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => setCurrentStep(s.id)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-hidden"
                  >
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all duration-200 ${
                        isCurrent
                          ? "bg-[#229938] text-white ring-2 ring-[#229938]/50 shadow-md shadow-emerald-950"
                          : isCompleted
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/60"
                          : "bg-white/10 text-gray-400 border border-white/15"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3 text-emerald-300 stroke-[3]" /> : s.id}
                    </div>

                    <span
                      className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-semibold mt-1 transition-colors text-center leading-tight ${
                        isCurrent
                          ? "text-emerald-400"
                          : isCompleted
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>

                  {!isLast && (
                    <div
                      className={`flex-1 h-[1px] mx-1 sm:mx-2 transition-colors -mt-4 ${
                        currentStep > s.id ? "bg-emerald-500/60" : "bg-white/15"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>

        <div className="flex-1 flex overflow-hidden relative">
          <main className="flex-1 overflow-y-auto px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-5 pb-28 sm:pb-8">
            
            {currentStep === 1 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="text-center sm:text-left border-b border-white/10 pb-3">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 01
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl text-white font-normal mt-0.5">
                    Choose How Your Catering is Served
                  </h2>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    Select the service style that matches your celebration style and guest experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  {SERVICE_STYLES.map((style) => {
                    const isSelected = selectedServiceStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => handleSelectServiceStyle(style.id)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-400/50 shadow-xl"
                            : "border-white/15 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <div className="relative h-32 sm:h-40 w-full overflow-hidden">
                          <Image
                            src={style.image}
                            alt={style.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#072018] via-transparent to-transparent" />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase bg-black/60 text-emerald-300 border border-white/20 backdrop-blur-md">
                              {style.badge}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#229938] text-white flex items-center justify-center shadow-lg">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="p-3.5 sm:p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-lg text-white font-normal">{style.title}</h3>
                            <span className="text-[10px] text-emerald-400 font-medium block">{style.subtitle}</span>
                            <p className="text-xs text-gray-300 font-light mt-1 line-clamp-3">{style.description}</p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            <span>{isSelected ? "Selected Style" : "Choose Style"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <span>PROCEED TO BUILD MENU</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold block">
                      STEP 02 · {selectedServiceStyle.toUpperCase()}
                    </span>
                    <h2 className="font-serif text-lg sm:text-2xl text-white font-normal mt-0.5">
                      Select Dishes & Specialties
                    </h2>
                  </div>
                  <div className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">
                    <span className="font-bold text-white">{selectedItems.length}</span> chosen
                  </div>
                </div>

                <div className="sticky top-0 z-10 bg-[#072018] py-1.5 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {availableCategories.map((cat) => {
                      const isActive = cat.id === activeCategoryId;
                      const countInCat = (selectedItemsByCategory[cat.id] || []).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategoryId(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer flex-shrink-0 ${
                            isActive
                              ? "bg-[#229938] text-white shadow-md shadow-emerald-950"
                              : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                          }`}
                        >
                          <span className="uppercase tracking-wider">{cat.shortName}</span>
                          {countInCat > 0 && (
                            <span
                              className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                isActive
                                  ? "bg-white text-[#229938]"
                                  : "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                              }`}
                            >
                              {countInCat}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11.5px] text-gray-400 italic mt-1.5 font-light leading-snug">
                    {activeCategory.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {categoryItems.map((item) => {
                    const isSelected = selectedItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleItem(item.id)}
                        className={`group relative rounded-2xl overflow-hidden border p-2.5 sm:p-3 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[#092A20] border-[#229938] shadow-md"
                            : "bg-[#0A261D]/70 border-white/10 hover:border-white/20 hover:bg-[#0A261D]"
                        }`}
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                          <Image
                            src={item.image || "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="96px"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-1">
                          <h3 className="font-serif text-base sm:text-lg text-white font-normal leading-snug group-hover:text-emerald-300 transition-colors">
                            {item.name}
                          </h3>

                          {item.isSignature && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-semibold tracking-wider uppercase bg-[#229938]/20 text-emerald-300 border border-[#229938]/40 mt-1">
                              SIGNATURE
                            </span>
                          )}

                          <p className="text-xs text-gray-300 font-light mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex-shrink-0 pl-1">
                          {isSelected ? (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#229938] text-white flex items-center justify-center shadow-md">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 flex items-center justify-center hover:border-emerald-400 transition-colors" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <span>ORGANIZE PLAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 03 · CATERING LAYOUT
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
                    {selectedServiceStyle === "buffet"
                      ? "Organize Your Catering Counters"
                      : selectedServiceStyle === "table-service"
                      ? "Table Service Course Plan"
                      : "Traditional Sadya Serving Sequence"}
                  </h2>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    {selectedServiceStyle === "buffet"
                      ? "Group your chosen dishes into physical stations (e.g. Welcome Drinks, Biryani Station, Live Counter, Desserts)."
                      : selectedServiceStyle === "table-service"
                      ? "Your dishes will be served and replenished table-side by our hospitality team."
                      : "Items will be served in the authentic Kerala sequential order on fresh banana leaves."}
                  </p>
                </div>

                {selectedServiceStyle === "buffet" ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10">
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
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white flex items-center space-x-1 cursor-pointer flex-shrink-0 min-h-[40px]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>

                      <button
                        onClick={handleAutoOrganizeCounters}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-emerald-300 border border-white/10 flex items-center justify-center space-x-1.5 cursor-pointer flex-shrink-0 min-h-[40px]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Auto-Suggest Stations</span>
                      </button>
                    </div>

                    {counters.length === 0 ? (
                      <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-white/20 bg-white/5 space-y-2">
                        <Layers className="w-6 h-6 text-emerald-400/60 mx-auto" />
                        <h4 className="font-serif text-base text-white">No catering stations created yet</h4>
                        <p className="text-xs text-gray-400 max-w-md mx-auto font-light">
                          Click <strong>Auto-Suggest Stations</strong> or type a counter name above to organize your {selectedItems.length} dishes.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {counters.map((counter, idx) => (
                          <div
                            key={counter.id}
                            className="bg-[#0A261D] border border-white/15 rounded-2xl p-3.5 space-y-2 shadow-lg"
                          >
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <div>
                                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold block">
                                  STATION 0{idx + 1}
                                </span>
                                <h4 className="font-serif text-base text-white font-normal">
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

                            <div className="space-y-1 min-h-[40px]">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                                Assigned Dishes ({counter.itemIds.length}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {selectedItems.map((item) => {
                                  const isAssigned = counter.itemIds.includes(item.id);
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => handleToggleItemInCounter(counter.id, item.id)}
                                      className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                                        isAssigned
                                          ? "bg-[#229938] text-white"
                                          : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                                      }`}
                                    >
                                      <span>{item.name}</span>
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
                  <div className="bg-[#0A261D] border border-white/15 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Utensils className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-serif text-lg text-white font-normal">
                          {selectedServiceStyle === "table-service" ? "Seated Table Service Plan" : "Authentic Kerala Sadya Sequence"}
                        </h4>
                        <p className="text-xs text-gray-300 font-light">
                          {selectedServiceStyle === "table-service"
                            ? `All ${selectedItems.length} dishes will be served and replenished course-by-course at tables.`
                            : `Served sequentially in time-honored traditional ceremony on fresh plantain leaves.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                  >
                    <span>REVIEW PLAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                      STEP 04 · SUMMARY
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
                      Review Your Catering Plan
                    </h2>
                  </div>
                  <button
                    onClick={handleCopySummary}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-emerald-300 border border-white/10 flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Summary"}</span>
                  </button>
                </div>

                <div className="bg-[#0A261D] border border-white/15 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                        CHOSEN SERVICE STYLE
                      </span>
                      <h3 className="font-serif text-xl text-white font-normal">
                        {SERVICE_STYLES.find((s) => s.id === selectedServiceStyle)?.title}
                      </h3>
                      <p className="text-xs text-emerald-400/90 font-medium">
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

                    {/* Custom Event Type when Other is selected */}
                    {eventDetails.eventType === "Other" && (
                      <div className="sm:col-span-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400 font-medium mb-1">
                          Specify Your Occasion <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          autoFocus
                          placeholder="e.g. Housewarming, Anniversary, Baptism, Jubilee..."
                          value={eventDetails.customEventType || ""}
                          onChange={(e) =>
                            setEventDetails({ ...eventDetails, customEventType: e.target.value })
                          }
                          className="w-full bg-black/40 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-emerald-400 min-h-[44px]"
                        />
                      </div>
                    )}

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

