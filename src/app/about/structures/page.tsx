// src/app/about/structures/page.tsx

"use client";

import { useEffect, useState } from "react";

// Consider using lucide-react for icons if needed for more visual flair in the future
// import { User, Briefcase, Users } from 'lucide-react'; // Example icons

interface Structure {
  id: number;
  nama: string;
  jabatan: string;
  detail?: string | null;
  gambar: string;
}

// Environment variables for API and Image paths
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_IMG = process.env.NEXT_PUBLIC_API_BASE_IMG;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ProfileCard Component - Now with smooth transitions and adjusted shadows
const ProfileCard = ({
  nama = "",
  jabatan = "",
  detail = "", // Not used in current rendering, but good to keep
  gambar = "",
}: Structure) => (
  // Added transition classes here for smooth hover effect
  <div className="w-40 sm:w-48 md:w-52 
                  shadow-2xl rounded-lg overflow-hidden  {/* Changed shadow-xl to shadow-2xl for more visibility */}
                  transform transition-all duration-300 ease-in-out 
                  hover:shadow-xl hover:scale-105 cursor-pointer"> {/* Adjusted hover shadow to shadow-xl */}
    <img
      src={`${BASE_IMG}${gambar}`}
      alt={nama}
      className="w-full h-auto object-cover"
    />
    {/* Adjusted font size from text-ml to text-lg, and text-sm for role */}
    <div className="bg-[#51a3f1] font-semibold text-white py-2 px-2 text-lg text-center">
      {nama}
      <br />
      <span className="text-sm font-light">{jabatan}</span>
    </div>
  </div>
);

export default function StrukturOrganisasi() {
  const [data, setData] = useState<Structure[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/v1/structures`, {
      headers: {
        "X-API-KEY": API_KEY!,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log("Response", res);
        // Ensure res.data is an array before setting
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("API response data is not an array:", res.data);
          setData([]); // Set to empty array to prevent issues
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false)); // Hide loading indicator
  }, []);

  // Filter data based on jabatan (ensure consistent casing for filtering)
  const kepala = data.filter(
    (d) => d.jabatan.toLowerCase() === "kepala pusat pengembangan bahasa"
  );
  const koordinator = data.filter((d) =>
    d.jabatan.toLowerCase().includes("koordinator")
  );
  const staf = data.filter(
    (d) =>
      !["kepala pusat pengembangan bahasa"].includes(d.jabatan.toLowerCase()) &&
      !d.jabatan.toLowerCase().includes("koordinator")
  );

  return (
    // Main container with a subtle background and padding
    <div className="max-w-6xl mx-auto px-4 py-10 text-center bg-gray-50 rounded-lg shadow-inner"> {/* Added bg-gray-50 and shadow-inner */}
      {/* Main Title Block */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4 pt-8">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 leading-tight tracking-wide"> {/* Changed text-gray-800 to text-gray-900 for H1 */}
          Struktur Organisasi
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-normal mt-2 tracking-wide"> {/* Slightly adjusted H2 font sizes and color */}
          Pusat Pengembangan Bahasa UIN Syarif Hidayatullah Jakarta
        </h2>
        <div className="mt-6 md:mt-8 w-2/3 md:w-1/2 max-w-lg mx-auto h-1.5 bg-yellow-400 rounded-full"></div>
      </div>

      {isLoading ? (
        <div className="text-center text-lg text-gray-600 py-20">Loading organizational structure...</div>
      ) : (
        <>
          {/* Kepala */}
          {kepala.length > 0 && (
            <section className="mb-16"> {/* Reduced mb-20 to mb-16 for tighter spacing */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">Kepala PPB</h3> {/* Changed h2 to h3, text-black to text-gray-900, reduced mb */}
              <div className="flex justify-center flex-wrap gap-6">
                {kepala.map((person) => (
                  <ProfileCard key={person.id} {...person} />
                ))}
              </div>
              <div className="border-t border-gray-800 w-1/2 mx-auto my-10"></div> {/* Reduced my-12 to my-10, border-gray-500 to border-gray-200 */}
            </section>
          )}

          {/* Koordinator */}
          {koordinator.length > 0 && (
            <section className="mb-16"> {/* Reduced mb-20 to mb-16 */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">Koordinator</h3> {/* Changed h2 to h3, text-black to text-gray-900, reduced mb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                {koordinator.map((person) => (
                  <ProfileCard key={person.id} {...person} />
                ))}
              </div>
              {staf.length > 0 && ( // Only show divider if Staff section exists
                <div className="border-t border-gray-800 w-1/2 mx-auto my-10"></div>
              )}
            </section>
          )}

          {/* Staf */}
          {staf.length > 0 && (
            <section className="mb-16"> {/* Reduced mb-20 to mb-16 */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">Staf</h3> {/* Changed h2 to h3, text-black to text-gray-900, reduced mb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {staf.map((person) => (
                  <ProfileCard key={person.id} {...person} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
