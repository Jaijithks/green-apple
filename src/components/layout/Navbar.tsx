"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowRight, Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { GreenAppleLogoIcon, WhatsAppSolidIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#072018]/95 backdrop-blur-md text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <GreenAppleLogoIcon className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-emerald-500 leading-none">
              Green Apple
            </span>
            <span className="text-[9px] tracking-widest uppercase text-gray-300 font-medium mt-1">
              Catering & Event Company
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {siteConfig.navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors py-1 flex items-center ${
                  link.href === "/"
                    ? "text-white font-semibold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2.5px] after:bg-emerald-500"
                    : "text-gray-200 hover:text-emerald-400"
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-300 group-hover:text-emerald-400 transition-transform group-hover:rotate-180" />
                )}
              </Link>
            </div>
          ))}
        </nav>

        {/* Desktop Right CTA Area */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Phone / WhatsApp Pill Button */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-xs"
          >
            <WhatsAppSolidIcon className="w-4 h-4 mr-2 text-emerald-400" />
            <span>{siteConfig.contact.phonePrimary}</span>
          </a>

          {/* Get a Quote Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold bg-[#229938] hover:bg-[#1c822e] text-white transition-all shadow-md group"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Header Right Buttons */}
        <div className="flex sm:hidden items-center space-x-3">
          {/* Circular Green WhatsApp Button */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#229938] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            aria-label="WhatsApp Us"
          >
            <WhatsAppSolidIcon className="w-5 h-5 fill-current" />
          </a>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#051812] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400 transition-colors py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-3">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold bg-[#229938] text-white hover:bg-[#1c822e] transition-colors flex items-center justify-center"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <WhatsAppSolidIcon className="w-4 h-4 mr-2 text-emerald-400" />
              <span>WhatsApp: {siteConfig.contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
