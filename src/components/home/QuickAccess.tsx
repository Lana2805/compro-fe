// QuickAccess.tsx (File utama Anda)
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, BookOpen, Languages, Headphones } from 'lucide-react';
import { QuickAccessCard, QuickAccessItem } from '../QuickAccessCard'; // Sesuaikan path

const quickAccessItems: QuickAccessItem[] = [
    { id: 1, title: 'Website UIN Jakarta', icon: Globe, description: 'Portal utama UIN Syarif Hidayatullah Jakarta', url: 'https://uinjkt.ac.id', gradient: 'from-sky-400 via-sky-500 to-blue-500', shadowColor: 'shadow-sky-300/50' },
    { id: 2, title: 'Web LMS UIN Jakarta', icon: BookOpen, description: 'Learning Management System untuk pembelajaran online', url: 'https://lms.uinjkt.ac.id', gradient: 'from-orange-400 via-orange-500 to-red-500', shadowColor: 'shadow-orange-300/50' },
    { id: 3, title: 'Simulingo', icon: Languages, description: 'Platform pembelajaran bahasa interaktif', url: '#simulingo', gradient: 'from-cyan-400 via-sky-500 to-blue-600', shadowColor: 'shadow-cyan-300/50' },
    { id: 4, title: 'Website Layanan', icon: Headphones, description: 'Portal layanan akademik dan administrasi', url: '#layanan', gradient: 'from-orange-300 via-amber-400 to-orange-500', shadowColor: 'shadow-orange-300/50' },
    { id: 5, title: 'Pusat Informasi', icon: BookOpen, description: 'Berita dan pengumuman terbaru dari kampus', url: '#info', gradient: 'from-emerald-400 via-teal-500 to-green-600', shadowColor: 'shadow-emerald-300/50' },
    { id: 6, title: 'Kontak Kami', icon: Headphones, description: 'Hubungi kami untuk pertanyaan lebih lanjut', url: '#kontak', gradient: 'from-violet-400 via-purple-500 to-fuchsia-600', shadowColor: 'shadow-violet-300/50' },
];

export default function QuickAccess() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Tentukan jumlah item per slide berdasarkan ukuran layar
  const itemsPerSlide = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(quickAccessItems.length / itemsPerSlide);
  const maxIndex = totalSlides - 1;

  // Logika untuk swipe/drag manual
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (url: string) => {
    // Mencegah navigasi jika ada sedikit gerakan drag
    if (dragRef.current.isDragging) return;

    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (url.startsWith('#')) {
      document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 ">
        Quick Access
      </h2>
      
      <div className="relative flex items-center">
        {/* Tombol Kiri */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-yellow-500 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Kontainer Carousel */}
        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
          <div
            className="flex -mx-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {quickAccessItems.map((item) => (
              <QuickAccessCard key={item.id} item={item} onClick={handleCardClick} />
            ))}
          </div>
        </div>

        {/* Tombol Kanan */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20  bg-yellow-500 hover:bg-yellow-700 text-white  p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indikator Titik */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}