// src/lib/types.ts
export interface Program { // Dari kode yang kamu berikan
  id: string; // Ubah ke number jika ID dari backend adalah number
  title: string;
  description: string;
  image: string;
  category: 'ppb' | 'akademik' | string; // Tambahkan `string` jika ada kategori lain yang mungkin
  isActive: boolean;
  tags?: string[];
}

export interface NavigationItem { // Dari kode yang kamu berikan
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeroSlide { // Dari kode yang kamu berikan
  id: string; // Ubah ke number jika ID dari backend adalah number
  title: string;
  subtitle: string;
  description: string;
  image: string;
  overlay?: boolean;
  // Tambahkan ini jika ada tombol/link di slide
  buttonText?: string;
  buttonLink?: string;
}

export interface TabItem { // Dari kode yang kamu berikan
  id: string;
  label: string;
  isActive: boolean;
}

// Interfaces yang sudah kita diskusikan sebelumnya (sesuaikan ID type-nya)
export interface Berita {
  id: number; // Sesuaikan jika ID dari backend adalah string
  judul: string;
  slug: string;
  isi: string;
  gambar_url: string;
  tanggal_publish: string;
  kategori: string;
}

export interface Structure {
  id: number; // Sesuaikan jika ID dari backend adalah string
  nama: string;
  jabatan: string;
  detail?: string;
  gambar?: string;
}

export interface Pengumuman {
  id: number; // Sesuaikan jika ID dari backend adalah string
  judul: string;
  isi: string;
  tanggal_pengumuman: string;
}

export interface DataStatistik {
  id: number; // Sesuaikan jika ID dari backend adalah string
  nama_data: string;
  nilai: number;
  unit: string;
  deskripsi?: string;
}