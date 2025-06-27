// src/app/visi-misi/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Ambil Environment Variables
// Pastikan NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_BASE_IMG, NEXT_PUBLIC_API_KEY
// sudah didefinisikan di file .env.local kamu.
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_IMG = process.env.NEXT_PUBLIC_API_BASE_IMG;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Interface untuk data Visi Misi
interface VisiMisi {
  id: number;
  visi: string;
  misi: string;
}

// Komponen LocalVisiMisiCard (Didefinisikan secara lokal di dalam file halaman ini)
interface LocalVisiMisiCardProps {
  visiText: string;
  misiText?: string; // Change: Make misiText optional with '?'
}

const LocalVisiMisiCard: React.FC<LocalVisiMisiCardProps> = ({
  visiText,
  misiText,
}) => {
  // Function untuk mengkonversi HTML misi menjadi array list
  // Change: Allow misiHtml to be undefined, and add a check
  const parseMisiToList = (misiHtml: string | undefined) => {
    if (!misiHtml) { // If misiHtml is null or undefined, return an empty array
      return [];
    }
    // Hapus tag <p> dan split berdasarkan nomor
    const cleanMisi = misiHtml.replace(/<\/?p>/g, '');
    const misiItems = cleanMisi.split(/\d+\.\s*/).filter(item => item.trim());
    return misiItems;
  };

  // Change: Provide a default empty string if misiText is undefined
  const misiList = parseMisiToList(misiText || '');

  return (
    <div className="bg-white py-2">
      <div className="container mx-auto px-4">
        {/* Judul Halaman / Bagian */}
       <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4 pt-8"> 
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 leading-tight tracking-wide">
                Visi dan Misi 
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-800 leading-normal mt-2 tracking-wide"> 
                Pusat Pengembangan Bahasa UIN Syarif Hidayatullah Jakarta
            </h2>
            <div className="mt-6 md:mt-8 w-2/3 md:w-1/2 max-w-lg mx-auto h-1.5 bg-yellow-400 rounded-full"></div> 
        </div>

        {/* Konten Visi & Misi: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bagian Visi */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#51a3f1] text-white px-6 py-4">
              <h3 className="text-xl font-semibold text-center">Visi</h3>
            </div>
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed text-justify">
                {visiText}
              </div>
            </div>
          </div>

          {/* Bagian Misi */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#51a3f1] text-white px-6 py-4">
              <h3 className="text-xl font-semibold text-center">Misi</h3>
            </div>
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed">
                <ul className="space-y-4">
                  {/* Change: Add a conditional render for misiList to show a fallback if empty */}
                  {misiList.length > 0 ? (
                    misiList.map((misi, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#51a3f1] font-semibold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <span className="text-justify">{misi.trim()}</span>
                      </li>
                    ))
                  ) : (
                    <li>Misi tidak tersedia.</li> // Fallback message
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        {/* <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div> */}
      </div>
    </div>
  );
};

// Halaman Visi & Misi
export default function VisiMisiPage() {
  const [visiMisiData, setVisiMisiData] = useState<VisiMisi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);

  // === FETCHING DATA DENGAN useEffect ===
  useEffect(() => {
    if (!BASE_URL || !API_KEY) { // Cek env var yang diperlukan
      setHasError("Environment variables for API are not set. Please check .env.local.");
      setIsLoading(false);
      return;
    }

    // Debug: Log environment variables dan URL
    console.log('BASE_URL:', BASE_URL);
    console.log('API_KEY:', API_KEY);
    console.log('Full URL:', `${BASE_URL}/v1/visimisi`);

    fetch(`${BASE_URL}/v1/visimisi`, { // Endpoint untuk visi misi
      method: 'GET',
      headers: {
        "X-API-KEY": API_KEY, // Pastikan ini sesuai dengan yang diharapkan backend
        "Content-Type": "application/json",
        "Accept": "application/json", // Pastikan server tahu kita mau JSON
      },
    })
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        console.log('Response URL:', res.url);

        // Cek content type response
        const contentType = res.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!res.ok) {
          // Jika response bukan JSON, log sebagai text
          if (contentType && contentType.includes('application/json')) {
            return res.json().then(err => {
              throw new Error(err.message || `HTTP error! status: ${res.status} ${res.statusText}`);
            });
          } else {
            return res.text().then(text => {
              console.log('Error response (HTML):', text.substring(0, 500)); // Log 500 karakter pertama
              throw new Error(`HTTP error! status: ${res.status} ${res.statusText} - Response is not JSON`);
            });
          }
        }

        // Pastikan response adalah JSON
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        } else {
          return res.text().then(text => {
            console.log('Non-JSON response:', text.substring(0, 500));
            throw new Error('Response is not JSON format');
          });
        }
      })
      .then((res) => {
        console.log('API Response:', res);
        // Asumsi data yang dikembalikan adalah objek tunggal atau di dalam properti 'data'
        // This line is fine, but ensure your API actually returns 'data' or the direct object
        setVisiMisiData(res.data && res.data.length > 0 ? res.data[0] : null);
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
          <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat data Visi & Misi: {hasError}</p>
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
  if (!visiMisiData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Data Visi & Misi tidak ditemukan.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 block">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12">
        {/* Menggunakan komponen LocalVisiMisiCard dengan data yang diambil dari API */}
        <LocalVisiMisiCard
          visiText={visiMisiData.visi}
          misiText={visiMisiData.misi} // This is now safely passed, even if it was undefined
        />
      </main>
    </div>
  );
}