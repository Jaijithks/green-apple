"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Menu as MenuIcon, X, Utensils } from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

interface NavbarProps {
  onOpenQuote?: () => void;
  onOpenMenuBuilder?: () => void;
}

interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export default function Navbar({ onOpenQuote, onOpenMenuBuilder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCateringPage = pathname === "/catering";
  const isEventsPage = pathname === "/events";
  const isSubpage = isCateringPage || isEventsPage;

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
    { label: "ABOUT US", href: isSubpage ? "/#about" : "#about" },
    { label: "SERVICES", href: isSubpage ? "/#services" : "#services" },
    { label: "EVENTS", href: "/events" },
    { label: "MENUS", href: isSubpage ? "/#menu" : "#menu" },
  ];

  const rightNav: NavLinkItem[] = [
    { label: "GALLERY", href: isSubpage ? "/#gallery" : "#gallery" },
    { label: "CONTACT", href: isSubpage ? "/#contact" : "#contact" },
  ];

  const checkIsActive = (linkHref: string) => {
    if (linkHref === "/catering" && isCateringPage) return true;
    if (linkHref === "/events" && isEventsPage) return true;
    if (linkHref === "/" && pathname === "/") return true;
    return false;
  };

  return (
    <>
      {/* Sticky Floating Bar when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "translate-y-0 bg-[#072018]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5"
            : "-translate-y-full py-2.5 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative w-32 sm:w-36 h-11 sm:h-12 group-hover:scale-103 transition-transform flex items-center justify-center">
              <Image
                src="/logo/green apple logo vertical.png"
                alt="Green Apple Catering & Event Company"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 130px, 150px"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
            {[...leftNav, ...rightNav].map((link) => {
              const active = checkIsActive(link.href);
              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs tracking-widest uppercase font-medium transition-colors whitespace-nowrap ${
                    active
                      ? "text-emerald-400 font-semibold border-b-2 border-[#229938] pb-0.5"
                      : "text-gray-200 hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs tracking-widest uppercase font-medium transition-colors whitespace-nowrap ${
                    active
                      ? "text-emerald-400 font-semibold border-b-2 border-[#229938] pb-0.5"
                      : "text-gray-200 hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <button
              onClick={onOpenMenuBuilder}
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 mr-1.5" />
              <span>Build Menu</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md transition-all hover:scale-102 cursor-pointer"
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

      {/* Hero Integrated Navigation (Editorial Centered Composition) */}
      <nav className="w-full relative z-20 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Desktop Layout (lg and above): 5-2-5 Symmetric Grid */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center w-full min-h-[72px]">
          {/* ZONE 1: Left Wing (col-span-5) -> 5 Links, Right-Aligned */}
          <div className="lg:col-span-5 flex items-center justify-end space-x-4 xl:space-x-6 pr-4 xl:pr-6">
            {leftNav.map((item) => {
              const active = checkIsActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.18em] xl:tracking-[0.2em] uppercase transition-colors duration-200 drop-shadow-md whitespace-nowrap ${
                    active
                      ? "text-emerald-400 font-semibold border-b-2 border-[#229938] pb-0.5"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ZONE 2: Center Zone (col-span-2) -> Perfectly Centered Logo */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <Link
              href="/"
              className="group cursor-pointer flex items-center justify-center"
            >
              <div className="relative w-36 sm:w-40 md:w-44 h-16 sm:h-18 group-hover:scale-104 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src="/logo/green apple logo vertical.png"
                  alt="Green Apple Catering & Event Company"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
                  sizes="192px"
                />
              </div>
            </Link>
          </div>

          {/* ZONE 3: Right Wing (col-span-5) -> 2 Links + 2 Action Buttons, Left-Aligned */}
          <div className="lg:col-span-5 flex items-center justify-start space-x-3.5 xl:space-x-4 pl-4 xl:pl-6">
            {rightNav.map((item) => {
              const active = checkIsActive(item.href);
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.18em] xl:tracking-[0.2em] uppercase transition-colors duration-200 drop-shadow-md whitespace-nowrap ${
                    active
                      ? "text-emerald-400 font-semibold border-b-2 border-[#229938] pb-0.5"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.18em] xl:tracking-[0.2em] uppercase transition-colors duration-200 drop-shadow-md whitespace-nowrap ${
                    active
                      ? "text-emerald-400 font-semibold border-b-2 border-[#229938] pb-0.5"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={onOpenMenuBuilder}
              className="px-3.5 py-1.5 rounded-full text-[10px] xl:text-[10.5px] font-semibold uppercase tracking-[0.14em] bg-[#229938] hover:bg-[#1c822e] text-white transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap ml-1"
            >
              Build Menu
            </button>

            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full text-[10px] xl:text-[10.5px] font-semibold uppercase tracking-[0.14em] bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-xs transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Mobile Layout (< lg): [ ☰ (Left) | GREEN APPLE LOGO (Absolute Center) | GET A QUOTE (Right) ] */}
        <div className="relative flex lg:hidden items-center justify-between w-full h-12 sm:h-14">
          {/* LEFT: Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-start text-white/95 hover:text-white transition-all focus:outline-none cursor-pointer z-10 active:scale-95"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-6 h-6 stroke-[2]" />
          </button>

          {/* CENTER: Strictly Centered Relative to Viewport */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <Link
              href="/"
              className="flex items-center justify-center group"
            >
              <div className="relative w-28 sm:w-36 h-12 sm:h-14 transition-transform group-hover:scale-102 flex items-center justify-center">
                <Image
                  src="/logo/green apple logo vertical.png"
                  alt="Green Apple Catering & Event Company"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 640px) 120px, 150px"
                />
              </div>
            </Link>
          </div>

          {/* RIGHT: Compact Action Buttons */}
          <div className="flex items-center space-x-1.5 z-10">
            <button
              onClick={onOpenMenuBuilder}
              className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] text-white bg-[#229938] hover:bg-[#1c822e] transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
            >
              BUILD MENU
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#072018]/95 backdrop-blur-xl flex flex-col p-6 text-white animate-in fade-in duration-200 lg:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="relative w-36 h-14">
              <Image
                src="/logo/green apple logo vertical.png"
                alt="Green Apple Catering & Event Company"
                fill
                className="object-contain"
                sizes="150px"
              />
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
            {[...leftNav, ...rightNav].map((link) => {
              const active = checkIsActive(link.href);
              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-serif text-2xl transition-colors tracking-wide ${
                    active ? "text-emerald-400 font-bold" : "text-gray-100 hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-serif text-2xl transition-colors tracking-wide ${
                    active ? "text-emerald-400 font-bold" : "text-gray-100 hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenMenuBuilder) onOpenMenuBuilder();
              }}
              className="w-full py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-[#229938] text-white hover:bg-[#1c822e] transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
            >
              <Utensils className="w-4 h-4 mr-1" />
              <span>Build Custom Menu</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span>Get a Quote</span>
            </button>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center border border-white/10"
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

