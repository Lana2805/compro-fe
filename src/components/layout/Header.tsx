'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownButton from '../DropdownButton'; 
import LanguageSelector from "../LanguageSelector";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when mobile menu is toggled
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between">
          {/* Kiri: Logo + Judul */}
          <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo UIN"
              width={60}
              height={60}
              className="md:w-20 md:h-20 lg:w-20 lg:h-16 "
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-bold text-black">UPT</span>
              <span className="text-sm md:text-base text-[#5c5c5c] tracking-wide">PUSAT BAHASA</span>
            </div>
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <nav className="hidden lg:flex gap-6">
            <DropdownButton
              title="Layanan"
              items={[
                { label: 'Program Tes Bahasa', href: '/layanan/konsultasi' },
                { label: 'Kursus Bahasa', href: '/layanan/daftar-tes' },
                { label: 'Penerjemahan & Proofreading', href: '/layanan/konsultasi' },
<<<<<<< HEAD
=======
                
>>>>>>> DaffaMalik12/daffadev
              ]}
            />
            <DropdownButton
              title="Tentang Kami"
              items={[
                { label: 'Sambutan Pemimpin', href: '/about/sambutan' },
                { label: 'Visi & Misi', href: '/about/visimisi' },
                { label: 'Struktur', href: '/about/structures' },
                { label: 'Program Kerja', href: '/tes/ielts' },
<<<<<<< HEAD
                { label: 'Indikator Kerja', href: '/tes/toafl' },
              ]}
            />
=======
              ]}
            />
           
>>>>>>> DaffaMalik12/daffadev
          </nav>

          {/* Kanan: Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Selector - Hidden on small mobile */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
            
            {/* Search Button */}
            <button className="text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#5fa4f4] hover:bg-[#4a93e3] transition-colors">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>

            {/* Mobile Menu Button - Only show on lg and below */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shows below header on mobile */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="py-4 border-t border-gray-200">
            {/* Mobile Language Selector - Show on small screens */}
            <div className="sm:hidden mb-4 px-2">
              <LanguageSelector />
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-2">
              {/* Layanan */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleDropdown('layanan')}
                  className="flex items-center justify-between w-full px-2 py-3 text-left text-gray-700 hover:text-[#5fa4f4] font-medium"
                >
                  Layanan
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === 'layanan' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'layanan' && (
                  <div className="pl-4 space-y-2">
                    <Link href="/layanan/konsultasi" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Program Tes Bahasa
                    </Link>
                    <Link href="/layanan/daftar-tes" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Kursus Bahasa
                    </Link>
                    <Link href="/layanan/konsultasi" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Penerjemahan & Proofreading
                    </Link>
                    <Link href="/layanan/daftar-tes" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Layanan Kerjasama
                    </Link>
                    <Link href="/layanan/konsultasi" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Kesempatan kerja
                    </Link>
                  </div>
                )}
              </div>

              {/* Tentang Kami */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleDropdown('tentang')}
                  className="flex items-center justify-between w-full px-2 py-3 text-left text-gray-700 hover:text-[#5fa4f4] font-medium"
                >
                  Tentang Kami
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === 'tentang' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'tentang' && (
                  <div className="pl-4 space-y-2">
                    <Link href="/tes/toefl" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Sambutan Pemimpin
                    </Link>
                    <Link href="/tes/ielts" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Visi & Misi
                    </Link>
                    <Link href="/about/structures" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Struktur
                    </Link>
                    <Link href="/tes/ielts" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Program Kerja
                    </Link>
                    <Link href="/tes/toafl" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Indikator Kerja
                    </Link>
                  </div>
                )}
              </div>

              {/* Data & Informasi */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleDropdown('data')}
                  className="flex items-center justify-between w-full px-2 py-3 text-left text-gray-700 hover:text-[#5fa4f4] font-medium"
                >
                  Data & Informasi
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === 'data' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'data' && (
                  <div className="pl-4 space-y-2">
                    <Link href="/materi/toefl" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Latihan TOEFL
                    </Link>
                    <Link href="/materi/video" className="block py-2 text-sm text-gray-600 hover:text-[#5fa4f4]">
                      Video Pembelajaran
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;