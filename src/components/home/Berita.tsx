'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Berita {
  id: number;
  judul: string;
  slug: string;
  excerpt: string;
  kategori: string;
  penulis: string;
  tanggal_publish: string;
  tanggal_publish_formatted: string;
  gambar: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Berita[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

const ProgramSection: React.FC = () => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Ambil data berita dari API menggunakan Axios
  useEffect(() => {
    const fetchBerita = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get<ApiResponse>('http://127.0.0.1:8000/api/v1/berita', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':  'mysecretapippb123987',
          },
          timeout: 10000, // 10 detik timeout
        });

        const result = response.data;
        
        if (result.success && result.data) {
          setBerita(result.data);
        } else {
          throw new Error('Format data tidak sesuai');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Server responded with error status
            setError(`Server Error: ${err.response.status} - ${err.response.statusText}`);
          } else if (err.request) {
            // Request was made but no response received
            setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
          } else {
            // Something else happened
            setError(`Request Error: ${err.message}`);
          }
        } else {
          setError(err instanceof Error ? err.message : 'Terjadi error yang tidak diketahui');
        }
        console.error('Error fetching berita:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  // Filter berita berdasarkan kategori
  const filteredBerita = selectedCategory === 'all' 
    ? berita 
    : berita.filter((item: Berita) => item.kategori.toLowerCase() === selectedCategory.toLowerCase());

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(berita.map((item: Berita) => item.kategori))];

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Filter Tabs */}
        <div className="flex space-x-2 flex-wrap">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
              }`}
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          ))}
        </div>
        
        {/* View All Link */}
        <button className="text-gray-600 hover:text-gray-800 font-medium transition-colors">
          View All
        </button>
      </div>

      {/* Berita Cards Grid */}
      {filteredBerita.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada berita yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBerita.map((beritaItem: Berita) => (
            <div 
              key={beritaItem.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Card Image */}
              <div className="aspect-video w-full overflow-hidden relative">
                <Image
                  src={beritaItem.gambar}
                  alt={beritaItem.judul}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x225/e5e7eb/6b7280?text=No+Image';
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-4">
                {/* Category & Date */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {beritaItem.kategori}
                  </span>
                  <span className="text-xs text-gray-500">
                    {beritaItem.tanggal_publish_formatted}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">
                  {beritaItem.judul}
                </h3>
                
                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {beritaItem.excerpt}
                </p>
                
                {/* Author */}
                <p className="text-xs text-gray-500 mb-4">
                  By: {beritaItem.penulis}
                </p>
                
                {/* Action Button */}
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200">
                  Lihat Artikel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramSection;