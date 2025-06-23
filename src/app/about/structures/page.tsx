// src/app/about/structures/page.tsx

"use client";

import { useEffect, useState } from "react";

interface Structure {
  id: number;
  nama: string;
  jabatan: string;
  detail?: string | null;
  gambar: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_IMG = process.env.NEXT_PUBLIC_API_BASE_IMG;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const ProfileCard = ({
  nama = "",
  jabatan = "",
  detail = "",
  gambar = "",
}: Structure) => (
  <div className="w-40 sm:w-48 md:w-52 shadow-xl rounded-lg overflow-hidden">
    <img
      src={`${BASE_IMG}${gambar}`}
      alt={nama}
      className="w-full h-auto object-cover"
    />
    <div className="bg-[#51a3f1] font-semibold text-white py-2 px-2 text-ml  text-center">
      {nama}
      <br />
      <span className="text-sm font-light ">{jabatan}</span>
    </div>
  </div>
);

export default function StrukturOrganisasi() {
  const [data, setData] = useState<Structure[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/v1/structures`, {
      headers: {
        "X-API-KEY": API_KEY!,
        "Content-Type": "application/json",
  },
})
      .then((res) => res.json())
      .then((res) => {
        console.log("Response", res);
        setData(res.data); // sesuai dengan strukturnya
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const kepala = data.filter((d) => d.jabatan.toLowerCase() === "kepala pusat pengembangan bahasa");
  const koordinator = data.filter((d) =>
    d.jabatan.toLowerCase().includes("koordinator")
  );
  const staf = data.filter(
    (d) =>
      !["kepala pusat pengembangan bahasa"].includes(d.jabatan.toLowerCase()) &&
      !d.jabatan.toLowerCase().includes("koordinator")
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-center">
      <h1 className="text-black text-5xl font-bold mb-10 underline decoration-[#ffcc33] underline-offset-18">Struktur PPB</h1>

      {/* Kepala */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-black mb-12">Kepala PPB</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {kepala.map((person) => (
            <ProfileCard key={person.id} {...person} />
          ))}
        </div>
      </section>

      {/* Koordinator */}
      <section className="mb-20">
        <h2 className="text-3xl text-black font-semibold mb-12">Koordinator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {koordinator.map((person) => (
            <ProfileCard key={person.id} {...person} />
          ))}
        </div>
      </section>

      {/* Staf */}
      <section className="mb-20">
        <h2 className="text-3xl text-black font-semibold mb-14">Staf</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {staf.map((person) => (
            <ProfileCard key={person.id} {...person} />
          ))}
        </div>
      </section>
    </div>
  );
}
