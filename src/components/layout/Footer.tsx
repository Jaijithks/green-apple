"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import {
  ArrowRight,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="bg-[#072018] text-white border-t border-emerald-900/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-emerald-700/80 border-2 border-emerald-400 flex items-center justify-center shadow-md">
                <span className="font-serif text-lg font-bold tracking-tighter text-white">
                  G<span className="text-emerald-300">A</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                  Green Apple
                </span>
                <span className="text-[9px] tracking-widest uppercase text-emerald-400 font-semibold mt-1">
                  Catering & Event Company
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {siteConfig.welcomeHeading} {siteConfig.description}
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.location}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-900/70 hover:bg-emerald-600 border border-emerald-700/40 flex items-center justify-center text-white transition-colors"
                aria-label="Location"
              >
                <MapPin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Contact Info
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300 font-light">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Kothamangalam, Ernakulam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  {siteConfig.contact.phonePrimary}, {siteConfig.contact.phoneSecondary}
                </span>
              </div>
              <div className="flex items-center space-x-2 pt-1 text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                <span>FSSAI Lic No: {siteConfig.contact.fssai}</span>
              </div>
            </div>
          </div>

          {/* Column 5: Get In Touch */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-emerald-400 uppercase">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phonePrimary}`}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>{siteConfig.contact.phonePrimary}</span>
              </a>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-[11px] text-gray-400 font-light">
          © 2025 Green Apple Catering & Event Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
