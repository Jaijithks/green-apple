"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { servicesData } from "@/data/services";
import { ArrowRight, Users, Calendar, ConciergeBell, Utensils } from "lucide-react";

export default function ServicesSection() {
  const iconMap = {
    Users,
    Calendar,
    ConciergeBell,
    Utensils,
  };

  return (
    <section className="py-20 bg-[#F9F9F6] text-gray-900 border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="OUR SERVICES"
          title="Our Services"
          description="Delicious food for every occasion."
          centered={true}
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => {
            const IconComponent =
              iconMap[service.iconName as keyof typeof iconMap] || Users;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
              >
                {/* Image Banner with Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Circular Badge Icon Overlay */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-emerald-700 shadow-md border-2 border-emerald-500 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 pb-6 px-6 flex-1 flex flex-col items-center text-center space-y-3">
                  <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-600 pt-2 tracking-wide uppercase group-hover:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
