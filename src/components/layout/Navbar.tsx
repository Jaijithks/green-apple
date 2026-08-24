"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Menu as MenuIcon, X, ArrowRight } from "lucide-react";
import { GreenAppleLogoIcon, WhatsAppSolidIcon } from "@/components/ui/Icons";

interface NavbarProps {
  onOpenQuote?: () => void;
}

interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNav: NavLinkItem[] = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "MENUS", href: "#menu" },
  ];

  const rightNav: NavLinkItem[] = [
    { label: "OUR EVENTS", href: "#events" },
    { label: "GALLERY", href: "https://www.instagram.com/_green_apple_catering_/?hl=en", external: true },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Sticky Floating Bar when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "translate-y-0 bg-[#072018]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "-translate-y-full py-3 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <GreenAppleLogoIcon className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                Green Apple
              </span>
              <span className="text-[8px] tracking-widest uppercase text-emerald-400 font-semibold mt-0.5">
                Catering & Events • Kothamangalam
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {[...leftNav, ...rightNav].map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-gray-200 hover:text-emerald-400 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-gray-200 hover:text-emerald-400 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-800 transition-all"
            >
              <WhatsAppSolidIcon className="w-3.5 h-3.5 mr-1.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              Get a Quote
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white md:hidden hover:bg-white/10 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Integrated Navigation (Matches Pinterest Reference Editorial Composition) */}
      <nav className="w-full relative z-20 pt-6 sm:pt-8 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-12 lg:items-center">
          {/* ZONE 1: Left Nav (Desktop) */}
          <div className="hidden lg:flex items-center justify-end space-x-6 xl:space-x-7 lg:col-span-5">
            {leftNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white/85 hover:text-white transition-colors duration-200 drop-shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ZONE 2: Centered Logo */}
          <div className="flex items-center justify-start lg:justify-center lg:col-span-2">
            <Link
              href="/"
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="flex items-center space-x-1.5">
                <GreenAppleLogoIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                <span className="font-serif text-2xl sm:text-[26px] text-white font-normal tracking-wide drop-shadow-md leading-none">
                  Green Apple
                </span>
              </div>
              <span className="text-[7.5px] sm:text-[8px] tracking-[0.28em] uppercase text-emerald-300/85 font-light mt-0.5 drop-shadow-sm">
                CATERING & EVENTS
              </span>
            </Link>
          </div>

          {/* ZONE 3: Right Nav (Desktop) */}
          <div className="hidden lg:flex items-center justify-start space-x-5 xl:space-x-6 lg:col-span-5 pl-4">
            {rightNav.map((item) => (
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white/85 hover:text-white transition-colors duration-200 drop-shadow-sm"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white/85 hover:text-white transition-colors duration-200 drop-shadow-sm"
                >
                  {item.label}
                </Link>
              )
            ))}

            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1 rounded-full text-[10px] xl:text-[10.5px] font-semibold uppercase tracking-[0.15em] bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-xs transition-all duration-200 shadow-xs cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Right Action Area */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <WhatsAppSolidIcon className="w-4 h-4 fill-current" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#072018]/95 backdrop-blur-xl flex flex-col p-6 text-white animate-in fade-in duration-200 lg:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <GreenAppleLogoIcon className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wide text-white">
                  Green Apple
                </span>
                <span className="text-[8px] tracking-widest uppercase text-emerald-400">
                  Catering & Events • Kothamangalam
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-full focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 py-8 flex-1 justify-center items-center text-center">
            {[...leftNav, ...rightNav].map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-gray-100 hover:text-emerald-400 transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-gray-100 hover:text-emerald-400 transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="w-full py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-[#229938] text-white hover:bg-[#1c822e] transition-colors flex items-center justify-center shadow-lg cursor-pointer"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center border border-white/15"
            >
              <WhatsAppSolidIcon className="w-4 h-4 mr-2 text-emerald-400" />
              <span>WhatsApp: {siteConfig.contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
