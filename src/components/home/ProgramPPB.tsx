"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Program {
  id: number;
  gambar_program: string;
  nama_program: string;
  slug: string;
  deskripsi: string;
  status: string;
}

export default function ProgramPPB() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/programs", {
        headers: {
          'X-API-KEY': 'mysecretapippb123987',
        },
      })
      .then((res) => {
        setPrograms(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Heading + Tombol Selengkapnya */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Program Pusat Bahasa</h2>
        <Link
          href="/program"
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          View All Programs
        </Link>
      </div>

      {/* 3 Program Pertama */}
      <div className="flex flex-wrap gap-4 justify-center">
        {programs.slice(0, 3).map((program) => (
          <div
            key={program.id}
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
          >
            <Image
              src={`http://127.0.0.1:8000/storage/${program.gambar_program}`}
              alt={program.nama_program}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              {program.nama_program}
            </h3>

            <div
              className="text-gray-700 mb-4 text-sm"
              dangerouslySetInnerHTML={{ __html: program.deskripsi }}
            />

        <Link
          href={`/program/${program.slug}`}
          className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200 text-center"
        >
          Lihat Program
        </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

