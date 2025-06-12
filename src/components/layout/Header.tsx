
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownButton from '../DropdownButton'; 
const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Kiri: Logo + Judul */}
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo.png"
            alt="Logo UIN"
            width={50}
            height={50}
          />
          <span className="font-bold text-lg text-gray-800">
            UPT Pusat Bahasa
          </span>
        </div>

        {/* Tengah: Dropdown Menu */}
           <nav className="flex gap-6">
          <DropdownButton
            title="Layanan"
            items={[
              { label: 'Program Tes Bahasa', href: '/layanan/konsultasi' },
              { label: 'Kursus Bahasa', href: '/layanan/daftar-tes' },
              { label: 'Penerjemahan & Proofreading', href: '/layanan/konsultasi' },
              { label: 'Layanan Kerjasama', href: '/layanan/daftar-tes' },
              { label: 'Kesempatan kerja', href: '/layanan/konsultasi' },
            ]}
          />
          <DropdownButton
            title="Tentang Kami"
            items={[
              { label: 'Sambutan Pemimpin', href: '/tes/toefl' },
              { label: 'Visi & Misi', href: '/tes/ielts' },
              { label: 'Struktur', href: '/tes/toafl' },
              { label: 'Program Kerja', href: '/tes/ielts' },
              { label: 'Indikator Kerja', href: '/tes/toafl' },
            ]}
          />
          <DropdownButton
            title="Data & Informasi"
            items={[
              { label: 'Latihan TOEFL', href: '/materi/toefl' },
              { label: 'Video Pembelajaran', href: '/materi/video' },
            ]}
          />
        </nav>

        {/* Kanan: Ganti Bahasa + Search */}
        <div className="flex items-center space-x-4">
          <button className="border px-3 py-1 rounded hover:bg-gray-100 text-sm">
            ID / EN
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              className="w-5 h-5"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
