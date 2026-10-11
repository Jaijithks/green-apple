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
  FoodTypeId,
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

const STORAGE_KEY = "green_apple_catering_plan_v3";

export function resolveFoodType(name: string, category: string, rawType?: string): FoodTypeId {
  if (rawType && ["veg", "non-veg", "seafood", "beverage", "dessert", "live"].includes(rawType)) {
    return rawType as FoodTypeId;
  }
  const lowerName = (name || "").toLowerCase();
  const lowerCat = (category || "").toLowerCase();

  if (
    lowerName.includes("chicken") ||
    lowerName.includes("beef") ||
    lowerName.includes("pork") ||
    lowerName.includes("duck") ||
    lowerName.includes("mutton") ||
    lowerName.includes("nuggets") ||
    lowerName.includes("pops")
  ) {
    return "non-veg";
  }

  if (
    lowerName.includes("fish") ||
    lowerName.includes("meen") ||
    lowerName.includes("prawn") ||
    lowerName.includes("chemmin") ||
    lowerName.includes("chemmeen") ||
    lowerName.includes("vattichathu") ||
    lowerName.includes("moilee") ||
    lowerName.includes("moly")
  ) {
    return "seafood";
  }

  if (
    lowerCat.includes("drink") ||
    lowerCat.includes("beverage") ||
    lowerName.includes("juice") ||
    lowerName.includes("kulukki") ||
    lowerName.includes("lime") ||
    lowerName.includes("mojito") ||
    lowerName.includes("water") ||
    lowerName.includes("tea") ||
    lowerName.includes("coffee")
  ) {
    return "beverage";
  }

  if (
    lowerCat.includes("dessert") ||
    lowerCat.includes("payasam") ||
    lowerName.includes("ice cream") ||
    lowerName.includes("pudding") ||
    lowerName.includes("payasam") ||
    lowerName.includes("halwa") ||
    lowerName.includes("pastry") ||
    lowerName.includes("cake") ||
    lowerName.includes("jamun") ||
    lowerName.includes("പാലട")
  ) {
    return "dessert";
  }

  if (
    lowerCat.includes("thattukada") ||
    lowerName.includes("dosa counter") ||
    lowerName.includes("counter") ||
    lowerName.includes("cart") ||
    lowerName.includes("station")
  ) {
    return "live";
  }

  return "veg";
}

export function FoodTypeBadge({
  type,
  compact = false,
}: {
  type?: FoodTypeId;
  compact?: boolean;
}) {
  switch (type) {
    case "veg":
      return compact ? (
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-500 rounded-[3px] p-[1.5px] flex-shrink-0 bg-black/40"
          title="Vegetarian"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </span>
      ) : (
        <div className="flex items-center space-x-1.5 bg-emerald-950/70 border border-emerald-500/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-3.5 h-3.5 border border-emerald-500 rounded-[3px] p-[1.5px] flex items-center justify-center flex-shrink-0 bg-black/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold text-emerald-300 tracking-wider">VEG</span>
        </div>
      );

    case "non-veg":
      return compact ? (
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 border border-rose-500 rounded-[3px] p-[1.5px] flex-shrink-0 bg-black/40"
          title="Non-Vegetarian"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        </span>
      ) : (
        <div className="flex items-center space-x-1.5 bg-rose-950/70 border border-rose-500/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-3.5 h-3.5 border border-rose-500 rounded-[3px] p-[1.5px] flex items-center justify-center flex-shrink-0 bg-black/50">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </span>
          <span className="text-[10px] font-bold text-rose-300 tracking-wider">NON-VEG</span>
        </div>
      );

    case "seafood":
      return compact ? (
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 border border-cyan-400 rounded-[3px] p-[1.5px] flex-shrink-0 bg-black/40"
          title="Seafood / Fish"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </span>
      ) : (
        <div className="flex items-center space-x-1.5 bg-cyan-950/70 border border-cyan-400/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-3.5 h-3.5 border border-cyan-400 rounded-[3px] p-[1.5px] flex items-center justify-center flex-shrink-0 bg-black/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </span>
          <span className="text-[10px] font-bold text-cyan-300 tracking-wider">SEAFOOD</span>
        </div>
      );

    case "beverage":
      return compact ? (
        <span
          className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-400 flex-shrink-0"
          title="Beverage / Live Drink"
        />
      ) : (
        <div className="flex items-center space-x-1.5 bg-indigo-950/70 border border-indigo-400/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[10px] font-bold text-indigo-300 tracking-wider">DRINK</span>
        </div>
      );

    case "dessert":
      return compact ? (
        <span
          className="inline-block w-2.5 h-2.5 rounded-full bg-pink-400 flex-shrink-0"
          title="Dessert & Sweets"
        />
      ) : (
        <div className="flex items-center space-x-1.5 bg-pink-950/70 border border-pink-400/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          <span className="text-[10px] font-bold text-pink-300 tracking-wider">DESSERT</span>
        </div>
      );

    case "live":
      return compact ? (
        <span
          className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0"
          title="Live Station"
        />
      ) : (
        <div className="flex items-center space-x-1.5 bg-amber-950/70 border border-amber-400/40 px-2 py-1 rounded-lg flex-shrink-0 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] font-bold text-amber-300 tracking-wider">LIVE</span>
        </div>
      );

    default:
      return compact ? (
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
      ) : (
        <div className="flex items-center space-x-1 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-lg">
          <span className="text-[10px] font-bold text-emerald-300">ITEM</span>
        </div>
      );
  }
}

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
    customRequestedDishes: "",
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
    if (selectedItemIds.length > 0 || counters.length > 0 || eventDetails.customRequestedDishes) {
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
            malayalamName: item.malayalamName,
            category: item.category,
            foodType: resolveFoodType(item.name, item.category, item.foodType),
            description: item.description,
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

  const currentCatIndex = availableCategories.findIndex((c: any) => c.id === activeCategoryId);
  const safeCatIndex = currentCatIndex >= 0 ? currentCatIndex : 0;
  const hasPrevCategory = safeCatIndex > 0;
  const hasNextCategory = safeCatIndex < availableCategories.length - 1;
  const nextCategory = hasNextCategory ? availableCategories[safeCatIndex + 1] : null;
  const prevCategory = hasPrevCategory ? availableCategories[safeCatIndex - 1] : null;

  const handleNextCategory = () => {
    if (nextCategory) {
      setActiveCategoryId(nextCategory.id);
    }
  };

  const handlePrevCategory = () => {
    if (prevCategory) {
      setActiveCategoryId(prevCategory.id);
    } else {
      setCurrentStep(1);
    }
  };

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
      ["welcome-drinks", "snacks-starters"].includes(i.category)
    );
    const mainItems = selectedItems.filter((i) =>
      ["curries-gravies", "rice-biryani", "meat-seafood-specials", "vegetable-sides"].includes(i.category)
    );
    const breadLiveItems = selectedItems.filter((i) =>
      ["breads", "thattukada-live"].includes(i.category)
    );
    const dessertItems = selectedItems.filter((i) =>
      ["desserts", "beverages-water"].includes(i.category)
    );

    const generated: CateringCounter[] = [];
    if (starterItems.length > 0) {
      generated.push({
        id: `counter-starters`,
        name: "Welcome Drinks & Snack Lounge",
        itemIds: starterItems.map((i) => i.id),
      });
    }
    if (breadLiveItems.length > 0) {
      generated.push({
        id: `counter-breads-live`,
        name: "Live Appams, Porattas & Thattukada Station",
        itemIds: breadLiveItems.map((i) => i.id),
      });
    }
    if (mainItems.length > 0) {
      generated.push({
        id: `counter-mains`,
        name: "Grand Feasts, Roasts & Biryani Counter",
        itemIds: mainItems.map((i) => i.id),
      });
    }
    if (dessertItems.length > 0) {
      generated.push({
        id: `counter-desserts`,
        name: "Artisanal Dessert & Chilled Sweet Corner",
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
    msg += `*Event:* ${eventDetails.eventType === "Other" ? eventDetails.customEventType || "Custom Occasion" : eventDetails.eventType}\n`;
    msg += `*Date:* ${eventDetails.eventDate || "TBD"}\n`;
    msg += `*Guests:* ${eventDetails.guestCount}\n`;
    msg += `*Location:* ${eventDetails.location}\n`;
    msg += `*Style:* ${styleObj?.title || "Selected Style"}\n\n`;
    msg += `*--- SELECTED MENU (${selectedItems.length} ITEMS) ---*\n`;

    Object.entries(selectedItemsByCategory).forEach(([catId, items]) => {
      const catObj = allCategories.find((c: any) => c.id === catId);
      msg += `\n*${catObj?.name || catId.toUpperCase()}:*\n`;
      items.forEach((item) => {
        const typeTag = item.foodType ? `[${item.foodType.toUpperCase()}] ` : "";
        const malTag = item.malayalamName ? ` (${item.malayalamName})` : "";
        msg += `• ${typeTag}${item.name}${malTag}\n`;
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

    if (eventDetails.customRequestedDishes && eventDetails.customRequestedDishes.trim()) {
      msg += `\n*--- SPECIAL DISH ENQUIRIES (NOT LISTED IN MENU) ---*\n`;
      msg += `${eventDetails.customRequestedDishes.trim()}\n`;
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
        
        {/* Header */}
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
                className="hidden sm:flex text-[11px] text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Reset all choices"
              >
                Clear
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close custom menu planner"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* Clear confirmation alert banner */}
        {isClearConfirmOpen && (
          <div className="bg-red-950/80 border-b border-red-500/40 px-4 py-2 flex items-center justify-between text-xs text-red-200 z-30">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Are you sure you want to clear your selected menu and start fresh?</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleClearAll}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold cursor-pointer"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setIsClearConfirmOpen(false)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Multi-step progress bar */}
        <div className="flex-shrink-0 bg-[#092219] border-b border-white/10 px-3 sm:px-6 py-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[360px] sm:min-w-0 max-w-4xl mx-auto">
            {STEPS.map((step, idx) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => {
                      if (isPast || (step.id === 2 && selectedServiceStyle)) {
                        setCurrentStep(step.id);
                      }
                    }}
                    className={`flex items-center space-x-1.5 sm:space-x-2 text-left cursor-pointer transition-colors ${
                      isActive
                        ? "text-emerald-400 font-bold"
                        : isPast
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-400 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold ${
                        isActive
                          ? "bg-[#229938] text-white shadow-md shadow-emerald-900"
                          : isPast
                          ? "bg-white/20 text-emerald-300"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                    </div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider hidden xs:inline">
                      {step.short}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider hidden sm:inline">
                      {step.label}
                    </span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 mx-1.5 sm:mx-3 h-[1px] transition-colors ${
                        currentStep > idx + 1 ? "bg-[#229938]" : "bg-white/15"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-7 pb-24 md:pb-7">
            
            {/* STEP 1: SERVICE STYLE SELECTION */}
            {currentStep === 1 && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                    STEP 01 · DINING FORMAT
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

            {/* STEP 2: DISH SELECTION (NO IMAGES REQUIRED - CLEAN DIETARY INDICATORS) */}
            {currentStep === 2 && (
              <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2.5 gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold block">
                        STEP 02 · {selectedServiceStyle.toUpperCase()}
                      </span>
                      {availableCategories.length > 1 && (
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-300/80 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                          Section {safeCatIndex + 1} of {availableCategories.length}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-lg sm:text-2xl text-white font-normal mt-0.5">
                      Select Dishes: <span className="text-emerald-400 font-medium">{activeCategory.name}</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">
                      <span className="font-bold text-white">{selectedItems.length}</span> items chosen
                    </div>
                  </div>
                </div>

                {/* Sticky Category Pills */}
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

                {/* Dish items list (with type indication badges, no images) */}
                <div className="space-y-2 pt-1">
                  {categoryItems.map((item) => {
                    const isSelected = selectedItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleItem(item.id)}
                        className={`group relative rounded-2xl border p-3 sm:p-3.5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[#092A20] border-[#229938] shadow-md ring-1 ring-[#229938]/30"
                            : "bg-[#0A261D]/70 border-white/10 hover:border-white/20 hover:bg-[#0A261D]"
                        }`}
                      >
                        {/* Food Type Indicator Badge */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FoodTypeBadge type={item.foodType} />

                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex items-center flex-wrap gap-1.5">
                              <h3 className="font-serif text-base sm:text-lg text-white font-normal leading-snug group-hover:text-emerald-300 transition-colors">
                                {item.name}
                              </h3>
                              {item.malayalamName && (
                                <span className="text-xs text-emerald-400 font-medium font-sans">
                                  ({item.malayalamName})
                                </span>
                              )}
                              {item.isSignature && (
                                <span className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-semibold tracking-wider uppercase bg-[#229938]/20 text-emerald-300 border border-[#229938]/40">
                                  SIGNATURE
                                </span>
                              )}
                            </div>

                            {item.description && (
                              <p className="text-xs text-gray-300 font-light mt-1 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Checkbox toggle */}
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

                {/* Section navigation buttons */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={handlePrevCategory}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center justify-center space-x-1.5 cursor-pointer min-h-[44px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{hasPrevCategory ? `PREV: ${prevCategory?.shortName || "SECTION"}` : "BACK"}</span>
                  </button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    {hasNextCategory && (
                      <button
                        onClick={handleNextCategory}
                        className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-400/40 hover:border-emerald-400 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                      >
                        <span>NEXT: {nextCategory?.shortName || "NEXT"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                    >
                      <span>PROCEED TO STATIONS →</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: COUNTERS & LAYOUT */}
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
                      ? "Group your chosen dishes into physical stations (e.g. Welcome Drinks, Thattukada Station, Biryani Counter, Desserts)."
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
                          placeholder="e.g. Live Thattukada Station, Dessert Lounge..."
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

            {/* STEP 4: REVIEW PLAN (INCLUDES SPECIAL DISH ENQUIRY) */}
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
                        const catObj = allCategories.find((c: any) => c.id === catId);
                        return (
                          <div
                            key={catId}
                            className="bg-black/30 p-3 sm:p-4 rounded-xl border border-white/10 space-y-1.5"
                          >
                            <span className="text-[10.5px] uppercase tracking-wider text-emerald-300 font-semibold block border-b border-white/10 pb-1">
                              {catObj?.name || catId} ({items.length})
                            </span>
                            <ul className="space-y-1.5">
                              {items.map((it) => (
                                <li
                                  key={it.id}
                                  className="text-xs text-gray-200 flex items-center justify-between gap-2"
                                >
                                  <div className="flex items-center space-x-1.5 truncate">
                                    <FoodTypeBadge type={it.foodType} compact={true} />
                                    <span className="truncate">{it.name}</span>
                                    {it.malayalamName && (
                                      <span className="text-[11px] text-emerald-400/80">({it.malayalamName})</span>
                                    )}
                                  </div>
                                  {it.isSignature && (
                                    <span className="text-[9px] text-emerald-400 italic flex-shrink-0">
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

                  {/* SPECIAL DISH ENQUIRY BOX (ITEMS NOT MENTIONED IN MENU) */}
                  <div className="mt-4 pt-4 border-t border-white/10 bg-[#051812]/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9.5px] uppercase tracking-widest text-emerald-400 font-bold block">
                          BESPOKE CULINARY REQUESTS
                        </span>
                        <h4 className="font-serif text-base sm:text-lg text-white font-normal mt-0.5">
                          Enquire about dishes not listed in our menu
                        </h4>
                        <p className="text-xs text-gray-300 font-light mt-0.5">
                          Want specific heritage delicacies, meat roasts, live pasta/chaat counters, or family specialties? Specify them below and we will prepare a customized quotation.
                        </p>
                      </div>
                      <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="e.g. Rabbit Roast, Beef Ularthiyathu, Malabar Chemmeen Biryani, Live Pasta Counter, specific Kerala Payasam..."
                      value={eventDetails.customRequestedDishes || ""}
                      onChange={(e) =>
                        setEventDetails({ ...eventDetails, customRequestedDishes: e.target.value })
                      }
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-emerald-400 transition-colors"
                    />
                    {eventDetails.customRequestedDishes && eventDetails.customRequestedDishes.trim() && (
                      <div className="text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg px-3 py-1.5 flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Included in your WhatsApp inquiry summary.</span>
                      </div>
                    )}
                  </div>
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

            {/* STEP 5: EVENT DETAILS & WHATSAPP ENQUIRY */}
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
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400 font-medium mb-1">
                          Specify Your Occasion <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Baptism, Jubilee, Engagement..."
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

                  {/* CUSTOM DISHES ENQUIRY FIELD */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400 font-medium mb-1 flex items-center justify-between">
                      <span>Enquire About Custom / New Food Items (Not in Menu)</span>
                      <span className="text-[10px] text-gray-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rabbit Roast, Mutton Kuruma, Live Chaat Stall, Meen Pollichathu..."
                      value={eventDetails.customRequestedDishes || ""}
                      onChange={(e) =>
                        setEventDetails({ ...eventDetails, customRequestedDishes: e.target.value })
                      }
                      className="w-full bg-black/40 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-emerald-400 min-h-[44px]"
                    />
                    <span className="text-[10.5px] text-gray-400 mt-1 block font-light">
                      Specify any specialty dishes or live counters you would like our catering team to quote for.
                    </span>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                      Anything else you would like us to know? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special dietary preferences, venue access times, decoration or service requests..."
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

          {/* DESKTOP STICKY CATERING PLAN SIDEBAR */}
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

              {/* Selected List with Compact Dietary Indicator */}
              <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-gray-400 font-light italic py-4">
                    No dishes selected yet. Browse categories to select your favorites.
                  </p>
                ) : (
                  Object.entries(selectedItemsByCategory).map(([catId, items]) => {
                    const catObj = allCategories.find((c: any) => c.id === catId);
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
                              <div className="flex items-center space-x-1.5 truncate pr-2">
                                <FoodTypeBadge type={it.foodType} compact={true} />
                                <span className="truncate">{it.name}</span>
                              </div>
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

              {eventDetails.customRequestedDishes && eventDetails.customRequestedDishes.trim() && (
                <div className="pt-2 border-t border-white/10 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                    Custom Dish Enquiries:
                  </span>
                  <p className="text-gray-300 line-clamp-2 italic text-[11px] mt-0.5">
                    {eventDetails.customRequestedDishes}
                  </p>
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

        {/* MOBILE STICKY FLOATING BOTTOM BAR & DRAWER */}
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
                  const catObj = allCategories.find((c: any) => c.id === catId);
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
                            <div className="flex items-center space-x-1.5 truncate pr-2">
                              <FoodTypeBadge type={it.foodType} compact={true} />
                              <span className="truncate">{it.name}</span>
                            </div>
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
