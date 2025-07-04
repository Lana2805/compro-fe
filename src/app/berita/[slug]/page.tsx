"use client";
// File: app/baca-berita/[slug]/page.tsx

import { type Metadata } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { use } from "react";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface Berita {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  kategori: string;
  penulis: string;
  tanggal_publish: string;
  tanggal_publish_formatted: string;
  gambar: string;
}

export default function BacaBerita({
  params,
}: {
  params: Promise<Props["params"]>;
}) {
  const { slug } = use(params);
  const [berita, setBerita] = useState<Berita>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  console.info(berita);
  // Ambil data berita dari API menggunakan Axios
  useEffect(() => {
    const fetchBerita = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/berita/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            timeout: 10000, // 10 detik timeout
          }
        );

        const result = response.data;

        if (result.success && result.data) {
          setBerita(result.data);
        } else {
          throw new Error("Format data tidak sesuai");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Server responded with error status
            setError(
              `Server Error: ${err.response.status} - ${err.response.statusText}`
            );
          } else if (err.request) {
            // Request was made but no response received
            setError(
              "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
            );
          } else {
            // Something else happened
            setError(`Request Error: ${err.message}`);
          }
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi error yang tidak diketahui"
          );
        }
        console.error("Error fetching berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      {/* Card Content */}
      <div className="p-4">
        {/* Image */}
        <div className="aspect-video w-full overflow-hidden relative bg-gray-100 flex items-center justify-center">
          {!imgError ? (
            <Image
              src={berita!.gambar}
              alt={berita!.judul}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="text-center text-gray-500 text-sm">
              <span className="text-4xl">🖼️</span>
              <p>Gambar tidak tersedia</p>
            </div>
          )}
        </div>

        {/* Category & Date */}
        <div className="flex items-center mb-2 gap-3 mt-5">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {berita!.kategori}
          </span>
          <span className="text-xs text-gray-500">
            {berita!.tanggal_publish_formatted}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-semibold text-gray-800 mb-2 line-clamp-2 capitalize">
          {berita!.judul}
        </h3>

        {/* Author */}
        <p className="text-xs text-gray-500 mb-4">By: {berita!.penulis}</p>

        {/* Excerpt */}
        <div
          className="berita-isi  max-w-none mt-5"
          dangerouslySetInnerHTML={{ __html: berita!.isi }}
        />
      </div>
    </div>
  );
}
