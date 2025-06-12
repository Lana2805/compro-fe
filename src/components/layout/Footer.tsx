// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f3f8f9] text-black py-10">
      {/* Kontak Section */}
      <div className="pt-20 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kontak Kiri */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <img
                  src="https://www.uinjkt.ac.id/assets/images/phone.png"
                  alt="Phone"
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <p className="font-semibold text-sm">Nomor Telepon</p>
                  <a href="tel:+62217401925" className="text-blue-600 text-sm">
                    (021) 7401925 ext 1829
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <img
                  src="https://www.uinjkt.ac.id/assets/images/email.png"
                  alt="Email"
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <p className="font-semibold text-sm">Alamat Email</p>
                  <a
                    href="mailto:humas@apps.uinjkt.ac.id"
                    className="text-blue-600 text-sm"
                  >
                    humas[@]apps.uinjkt.ac.id
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <img
                  src="https://www.uinjkt.ac.id/assets/images/address.png"
                  alt="Address"
                  className="w-6 h-6 mt-1"
                />
                <div>
                  <p className="font-semibold text-sm">Alamat Kampus</p>
                  <p className="text-sm">
                    Jl. Ir. H. Djuanda No. 95 Ciputat, Kota Tangerang Selatan
                    15412
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Sosial Media + Maps */}
          <div>
            <h2 className="text-xl font-bold mb-6">Media Sosial</h2>
            <div className="flex space-x-4 mb-6">
              <a href="https://web.facebook.com/uinjktofficial" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-square fa-2x text-blue-600" />
              </a>
              <a href="https://twitter.com/uinjktofficial" target="_blank" rel="noreferrer">
                <i className="fab fa-square-x-twitter fa-2x text-black" />
              </a>
              <a href="https://www.instagram.com/uinjktofficial" target="_blank" rel="noreferrer">
                <i className="fab fa-square-instagram fa-2x text-pink-600" />
              </a>
              <a href="https://www.youtube.com/@uinjktofficial" target="_blank" rel="noreferrer">
                <i className="fab fa-square-youtube fa-2x text-red-600" />
              </a>
              <a href="https://www.tiktok.com/@uinjktofficial" target="_blank" rel="noreferrer">
                <i className="fab fa-tiktok fa-2x text-black" />
              </a>
            </div>

            <div className="w-full h-[350px]">
              <iframe
                src="https://maps.google.com/maps?q=universitas%20islam%20negeri%20syarif&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#3c679b]  text-center py-4 text-sm text-white">
        © 2025{" "}
        <a
          href="https://uinjkt.ac.id"
          className="hover:underline text-white"
          target="_blank"
          rel="noreferrer"
        >
          UIN Syarif Hidayatullah Jakarta
        </a>
      </div>
    </footer>
  );
};

export default Footer;