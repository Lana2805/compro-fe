// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaYoutube } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f4f8f9] text-black py-10">
     {/* Kontak Section */}
      <div className="py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Kontak */}
          <div>
            <h2 className="font-semibold text-3xl mb-9">Hubungi Kami</h2>
            <ul className="space-y-14">
              <li className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-full border-5 border-[#3c679b] flex items-center justify-center bg-white">
                    <img
                      src="/images/phone.png"
                      alt="Phone Icon"
                      className="w-8 h-8"
                    />
                </div>
                <div>
                  <p className="text-xl font-light">Nomor Telepon</p>
                  <p>
                    <a href="tel:+62217493727" className="text-sm font-bold hover:text-[#3c679b]">
                      (021) 7493727
                    </a>
                  </p>
                  <p>
                    <a href="https://wa.me/089601276431" className="text-sm font-bold hover:text-[#3c679b]">
                      0896-0127-6431 (Whatsapp)
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-full border-5 border-[#3c679b] flex items-center justify-center bg-[#f4f8f9]">
                    <img
                    src="/images/email.png"
                    alt="Email Icon"
                    className="w-8 h-8"
                    />
                </div>
                <div>
                  <p className="text-xl font-light">Alamat Email</p>
                  <p>
                    <a href="mailto:pusatbahasa@apps.uinjkt.ac.id" className="text-sm font-bold hover:text-[#3c679b]">
                      pusatbahasa[@]apps.uinjkt.ac.id
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-full border-5 border-[#3c679b] flex items-center justify-center bg-[#f4f8f9]">
                    <img
                    src="/images/address.png"
                    alt="Address Icon"
                    className="w-8 h-8"
                    />
                </div>
                <div>
                  <p className="text-xl font-light">Alamat Kampus</p>
                  <p className='text-sm font-semibold max-w-xs'>
                    Jalan Kertamukti No. 5, Pisangan, Ciputat Timur, Cireundeu,
                    Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15419
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Media Sosial & Maps */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-6">Media Sosial</h2>
            <div className="flex gap-4 mb-6">
              <a href="https://www.instagram.com/uinjktofficial" target="_blank" rel="noopener noreferrer">
                < FaInstagram className="text-3xl text-[#3c679b] hover:text-pink-500" />
              </a>
              <a href="https://www.youtube.com/@UINSyarifHidayatullahJakarta" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-3xl text-[#3c679b] hover:text-red-500" />
              </a>
            </div>
            <div className="w-full h-[350px] overflow-hidden rounded-lg shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.819621542202!2d106.75781023849486!3d-6.311033732462815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efd007f9ad35%3A0x49ee0256c8bb0dd4!2sPusat%20Pengembangan%20Bahasa%20UIN%20Syarif%20Hidayatullah%20Jakarta!5e0!3m2!1sid!2sid!4v1728972693962!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#3c679b] text-white text-center py-8">
        <p className="text-sm">
          2025 ©{" "}
          <a href="https://uinjkt.ac.id" target="_blank" rel="noopener noreferrer" className="underline">
            UIN Syarif Hidayatullah Jakarta
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;