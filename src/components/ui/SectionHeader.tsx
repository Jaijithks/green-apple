import React from "react";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  theme?: "light" | "dark";
}

export default function SectionHeader({
  subtitle,
  title,
  titleHighlight,
  description,
  centered = true,
  theme = "light",
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div className={`space-y-3 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}>
      {subtitle && (
        <div className={`flex items-center space-x-3 text-xs tracking-widest uppercase font-semibold ${centered ? "justify-center" : ""}`}>
          <span className={`h-[1px] w-6 ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}></span>
          <span className={isDark ? "text-emerald-400" : "text-emerald-700"}>{subtitle}</span>
          <span className={`h-[1px] w-6 ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}></span>
        </div>
      )}

      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}{" "}
        {titleHighlight && (
          <span className={`italic font-normal ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className={`text-base sm:text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
