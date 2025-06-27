// components/QuickAccessCard.tsx
'use client';

import type { LucideIcon } from 'lucide-react';

// Definisikan tipe untuk item
export interface QuickAccessItem {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  url: string;
  gradient: string;
  shadowColor: string;
}

interface QuickAccessCardProps {
  item: QuickAccessItem;
  onClick: (url: string) => void;
}

export function QuickAccessCard({ item, onClick }: QuickAccessCardProps) {
  const IconComponent = item.icon;

  return (
    // w-1/4 untuk desktop, w-full untuk mobile
    <div className="flex-none w-full md:w-1/4 min-w-0 px-3">
      <div
        className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-6 text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl ${item.shadowColor} group h-56 flex flex-col justify-between relative overflow-hidden border border-white/20`}
        onClick={() => onClick(item.url)}
      >
        {/* Elemen dekoratif tetap sama */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-500"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="bg-white/25 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300 border border-white/20">
            <IconComponent className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-100 transition-colors duration-300">
            {item.title}
          </h3>
        </div>
        <p className="text-sm opacity-90 text-center group-hover:opacity-100 transition-opacity duration-300 relative z-10 bg-black/10 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          {item.description}
        </p>
      </div>
    </div>
  );
}