"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { WhatsAppSolidIcon, InstagramIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#072018] text-white border-t border-emerald-900/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Brand Identity */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block group">
              <div className="relative w-40 sm:w-48 h-16 sm:h-20 group-hover:scale-103 transition-transform flex items-center">
                <Image
                  src="/logo/green apple logo vertical.png"
                  alt="Green Apple Catering & Event Company"
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
            </Link>

            <p className="font-serif italic text-sm text-gray-300 leading-relaxed font-light max-w-sm">
              &ldquo;Make your moments memorable with flavours.&rdquo;
            </p>

            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              Premier catering & bespoke celebration management based in Kothamangalam, serving traditional feasts and gourmet multi-cuisine dining across Kerala.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp Us"
              >
                <WhatsAppSolidIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.location}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="Find us on Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-emerald-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-emerald-400 transition-colors">
                  Curated Menus
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-emerald-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-emerald-400 transition-colors">
                  Client Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/catering" className="hover:text-emerald-400 transition-colors font-medium text-emerald-300/90">
                  Artisanal Catering →
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors font-medium text-emerald-300/90">
                  Events & Styling →
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-emerald-400 transition-colors">
                  Kerala Sadya Feasts
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-emerald-400 transition-colors">
                  Wedding Banquets
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-emerald-400 transition-colors">
                  Custom Menu Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs text-gray-300 font-light">
              <a
                href={siteConfig.social.location}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 group hover:text-emerald-300 transition-colors"
              >
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>Near Shobana English Medium Public School, Kothamangalam, Kerala 686691</span>
              </a>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phonePrimary}`} className="hover:text-emerald-300 transition-colors font-medium">
                  +91 {siteConfig.contact.phonePrimary}
                </a>
              </div>

              <div className="flex items-center space-x-2 pt-0.5 text-[11px] text-emerald-300/90">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                <span>FSSAI Lic No: {siteConfig.contact.fssai}</span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                    "Hello Green Apple team, I would like to inquire about your catering and event services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all hover:scale-102"
                >
                  <WhatsAppSolidIcon className="w-3.5 h-3.5 mr-1.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-light gap-2">
          <div>
            © {new Date().getFullYear()} Green Apple Catering & Event Company. All Rights Reserved.
          </div>
          <div className="text-gray-500">
            Kothamangalam • Ernakulam • Kerala
          </div>
        </div>
      </div>
    </footer>
  );
}
