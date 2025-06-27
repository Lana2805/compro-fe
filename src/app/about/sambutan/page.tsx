// src/app/sambutan-kepala-ppb/page.tsx
"use client"; 

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Structure } from '@/lib/types'; // Import interface Structure dari lib/types.ts

// Ambil Environment Variables
// Pastikan NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_BASE_IMG, NEXT_PUBLIC_API_KEY
// sudah didefinisikan di file .env.local kamu.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_IMG = process.env.NEXT_PUBLIC_API_BASE_IMG;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Komponen LocalWelcomeMessageCard (Didefinisikan secara lokal di dalam file halaman ini)
interface LocalWelcomeMessageCardProps {
  personName: string; // Akan diisi dari field 'nama' API
  personTitle: string; // Akan diisi dari field 'jabatan' API
  welcomeText: string | null | undefined; // Isi sambutan (dari field 'detail' API)
  personImageUrl: string; // Akan diisi dari field 'gambar' API
}

const LocalWelcomeMessageCard: React.FC<LocalWelcomeMessageCardProps> = ({
  personName,
  personTitle,
  welcomeText,
  personImageUrl,
}) => {
  return (
    <div className="bg-white py-2">
      <div className="container mx-auto px-4">
        {/* Judul Halaman / Bagian */}
       <div className="text-center mb-16 md:mb-20 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Sambutan Kepala Pusat Pengembangan Bahasa
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
                Universitas Islam Negeri Syarif Hidayatullah Jakarta
            </h2>
             <div className="mt-6 md:mt-8 w-2/3 md:w-1/2 max-w-lg mx-auto h-1.5 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Konten Sambutan: Gambar & Teks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
          {/* Bagian Gambar Profil */}
          <div className="relative rounded-md shadow-lg overflow-hidden flex justify-center items-center p-4 bg-gray-100">
            {/* Sudut kuning di kiri atas */}
            <div className="absolute top-5 left-5 bg-yellow-400 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-sm"></div>
            
            <img
              src={personImageUrl}
              alt={personName}
              width={600} // Sesuaikan lebar yang sesuai dengan gambar aslinya
              height={600} // Sesuaikan tinggi yang sesuai dengan gambar aslinya
              className="object-cover rounded-xl z-10" // z-10 agar di atas sudut kuning
            />

            {/* Sudut kuning di kanan bawah */}
            <div className="absolute bottom-0 right-0 bg-yellow-400 w-48 h-48 translate-x-1/2 translate-y-1/2 rounded-sm"></div>
          </div>

          {/* Bagian Teks Sambutan */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">{personName}</h2>
            <p className="text-2xl text-gray-700 italic mb-6">{personTitle}</p>
            <div className="whitespace-pre-line text-gray-600 text-l text-justify leading-relaxed prose max-w-none">
              {/* PENTING: dangerouslySetInnerHTML ini digunakan karena `detail` dari API
                  mungkin mengandung HTML. Pastikan konten ini AMAN dari XSS (sudah disanitasi)
                  di sisi backend Laravel kamu sebelum disimpan ke database. */}
              <div dangerouslySetInnerHTML={{ __html: welcomeText || '' }} /> {/* Fallback ke string kosong jika welcomeText null/undefined */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Halaman Sambutan Kepala PPB
export default function SambutanKepalaPpbPage() {
  const [kepalaPpbData, setKepalaPpbData] = useState<Structure | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);

  // === KONFIGURASI API ===
  // Asumsi ID untuk Kepala Pusat Pengembangan Bahasa adalah 8
  const KEPALA_PPB_ID = 8; 

  // Base URL untuk folder 'storage' di Laravel
  const API_BASE_URL_FOR_STORAGE = BASE_URL?.replace('/api', '') || 'http://localhost:8000';


  // === FETCHING DATA DENGAN useEffect ===
  useEffect(() => {
    if (!BASE_URL || !API_KEY || !BASE_IMG) { // Cek semua env var
      setHasError("Environment variables for API are not set. Please check .env.local.");
      setIsLoading(false);
      return;
    }

    fetch(`${BASE_URL}/v1/structures/${KEPALA_PPB_ID}`, { // Endpoint untuk satu struktur berdasarkan ID
      headers: {
        "X-API-KEY": API_KEY, // Pastikan ini sesuai dengan yang diharapkan backend
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          // Coba parse error body dari respons API
          return res.json().then(err => { 
            throw new Error(err.message || `HTTP error! status: ${res.status} ${res.statusText}`); 
          });
        }
        return res.json();
      })
      .then((res) => {
        // Asumsi data yang dikembalikan adalah objek tunggal atau di dalam properti 'data'
        setKepalaPpbData(res.data || res); 
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setHasError(err.message || "Failed to fetch data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Dependensi kosong, hanya berjalan sekali saat komponen di-mount


  // === PENANGANAN LOADING STATE ===
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // === PENANGANAN ERROR STATE ===
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat data Kepala PPB: {hasError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // === PENANGANAN DATA TIDAK DITEMUKAN ===
  if (!kepalaPpbData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Sambutan Kepala Pusat Pengembangan Bahasa tidak ditemukan.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 block">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  // === PERSIAPAN DATA UNTUK KOMPONEN WelcomeMessageCard ===
  // Membangun URL gambar lengkap
  const personImageUrl = kepalaPpbData.gambar
    ? `${API_BASE_URL_FOR_STORAGE}/storage/${kepalaPpbData.gambar}`
    : '/images/default-profile.jpg'; // Ganti dengan path gambar default kamu jika perlu


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12">
        {/* Menggunakan komponen LocalWelcomeMessageCard dengan data yang diambil dari API */}
        <LocalWelcomeMessageCard
          personName={kepalaPpbData.nama}
          personTitle={kepalaPpbData.jabatan}
          welcomeText={kepalaPpbData.detail}
          personImageUrl={personImageUrl}
        />
      </main>
    </div>
  );
}