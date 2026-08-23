"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { processSteps } from "@/data/process";
import { ArrowRight } from "lucide-react";

export default function ProcessSection() {
  return (
    <section className="py-20 bg-[#F9F9F6] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="OUR PROCESS"
          title="From Start to Celebration"
          centered={true}
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {processSteps.map((step, idx) => {
            const isLast = idx === processSteps.length - 1;
            return (
              <div
                key={step.stepNumber}
                className="flex flex-col items-center text-center relative group p-4"
              >
                {/* Step Circle Badge */}
                <div className="w-16 h-16 rounded-full bg-white text-emerald-700 font-serif text-xl font-bold border-2 border-emerald-500 flex items-center justify-center shadow-md group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-5">
                  {step.stepNumber}
                </div>

                {/* Arrow Connector (Desktop) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-12 left-[65%] w-[70%] z-0 text-emerald-300">
                    <div className="flex items-center justify-center">
                      <div className="h-[1px] bg-emerald-300/70 w-full" />
                      <ArrowRight className="w-4 h-4 -ml-1 text-emerald-500 flex-shrink-0" />
                    </div>
                  </div>
                )}

                <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-light mt-2 max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
