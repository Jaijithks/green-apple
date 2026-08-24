"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Send, Calendar, Users, Phone, User, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/site";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Wedding Reception",
    guests: "250-500",
    eventDate: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const message = `*New Event Inquiry - Green Apple Catering*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Estimated Guests:* ${formData.guests}\n` +
      `*Event Date:* ${formData.eventDate || "To be decided"}\n` +
      `*Notes:* ${formData.notes || "None"}`;

    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      onClose();
      setSubmitted(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#072018] text-white border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="relative w-44 h-11 bg-white/95 px-2.5 py-1 rounded-xl shadow-md flex items-center justify-center">
            <Image
              src="/logo/green apple full logo.png"
              alt="Green Apple Catering & Event Company"
              fill
              className="object-contain p-0.5"
              sizes="180px"
            />
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-medium block">
              Direct Inquiry
            </span>
            <span className="text-xs text-gray-300 font-light">
              Kothamangalam, Kerala
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-600/30 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl text-white">Opening WhatsApp...</h4>
            <p className="text-xs text-gray-300">
              Connecting you directly with our catering team for menu customization.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varghese"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                  Occasion Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E362A] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                >
                  <option value="Wedding Reception">Wedding Reception</option>
                  <option value="Traditional Sadhya">Traditional Sadhya</option>
                  <option value="Engagement Banquet">Engagement Banquet</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Birthday & Social Gathering">Birthday & Social Gathering</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                  Estimated Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0E362A] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                  >
                    <option value="50-150">50 - 150 Guests</option>
                    <option value="150-300">150 - 300 Guests</option>
                    <option value="300-600">300 - 600 Guests</option>
                    <option value="600-1200">600 - 1200+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                  Target Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E362A] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium mb-1">
                Specific Menu or Venue Details (Optional)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  placeholder="e.g. Venue location in Kothamangalam, live seafood counters required..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-101 cursor-pointer"
              >
                <WhatsAppSolidIcon className="w-4 h-4" />
                <span>Send Inquiry via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
