import React from "react";

export function GreenAppleLogoIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Apple outline with leaf */}
      <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-current drop-shadow-md">
        {/* Leaf */}
        <path d="M50 8 C58 0, 70 5, 68 18 C60 22, 50 18, 50 8 Z" fill="#22C55E" />
        {/* Apple Body */}
        <path d="M50 25 C30 25, 10 38, 10 63 C10 85, 32 96, 48 96 C50 96, 52 96, 54 96 C70 96, 90 85, 90 63 C90 38, 70 25, 50 25 Z" fill="#15803D" />
        {/* Red Accent GA Circle */}
        <circle cx="50" cy="60" r="24" fill="#DC2626" />
        <text x="50" y="66" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif">
          GA
        </text>
      </svg>
    </div>
  );
}

export function RingsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-5-3h10M9 3h6" />
      <circle cx="9" cy="12" r="3.5" />
      <circle cx="15" cy="12" r="3.5" />
    </svg>
  );
}

export function CateringDishIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v2m-7 8a7 7 0 0114 0H5zm-1 3h16m-14 3h12" />
    </svg>
  );
}

export function DecorationFlowerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a2.5 2.5 0 00-2.5 2.5c0 1.5 2.5 4.5 2.5 4.5s2.5-3 2.5-4.5A2.5 2.5 0 0012 4.5zM19.5 12a2.5 2.5 0 00-2.5-2.5c-1.5 0-4.5 2.5-4.5 2.5s3 2.5 4.5 2.5a2.5 2.5 0 002.5-2.5zM12 19.5a2.5 2.5 0 002.5-2.5c0-1.5-2.5-4.5-2.5-4.5s-2.5 3-2.5 4.5a2.5 2.5 0 002.5 2.5zM4.5 12a2.5 2.5 0 002.5 2.5c1.5 0 4.5-2.5 4.5-2.5s-3-2.5-4.5-2.5A2.5 2.5 0 004.5 12z" />
    </svg>
  );
}

export function EventsCalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

export function ChefHatIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 19h12M6 16h12m-9.5-3a4 4 0 01-2-7.5 4 4 0 017-2.2A4 4 0 0117.5 5a4 4 0 01-2 7.5V16H8.5v-3z" />
    </svg>
  );
}

export function UsersGroupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export function ServingDishIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m-7 8a7 7 0 0114 0H5zm-1 3h16" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );
}

export function AwardBadgeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="9" r="6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 14.5L18 22l-6-3-6 3 2.5-7.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.545 1.777.82 2.796.821 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.768-5.769-5.768zm3.393 8.163c-.144.405-.837.774-1.17.823-.312.045-.694.06-2.023-.49-1.698-.703-2.774-2.454-2.859-2.568-.084-.113-.687-.914-.687-1.743 0-.829.435-1.237.59-1.407.155-.17.34-.212.453-.212.113 0 .227.001.326.006.104.005.244-.04.382.291.144.344.49 1.196.533 1.283.043.088.072.19.014.305-.058.115-.088.187-.174.288-.087.1-.183.224-.261.301-.088.086-.18.18-.077.357.103.176.458.756.983 1.224.675.602 1.244.788 1.42.875.176.088.279.073.383-.046.104-.118.446-.519.566-.697.12-.178.24-.148.404-.088.165.06 1.046.493 1.226.583.18.089.3.134.344.209.044.075.044.437-.1.842zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.438 5.176L2 22l4.974-1.39A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182c-1.636 0-3.155-.478-4.434-1.298l-.318-.204-2.957.826.837-2.874-.223-.332A8.14 8.14 0 013.818 12c0-4.511 3.67-8.182 8.182-8.182 4.511 0 8.182 3.671 8.182 8.182 0 4.511-3.671 8.182-8.182 8.182z"/>
    </svg>
  );
}

export function WhatsAppSolidIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.015-1.099z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LocationPinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 21s-7-5.5-7-11.5a7 7 0 0 1 14 0c0 6-7 11.5-7 11.5z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

