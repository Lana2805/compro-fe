'use client'

import { useState } from "react";
import Image from "next/image";

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("id");

  const languages = [
    { code: "id", name: "Indonesia", flag: "/flags/id.png" },
    { code: "en", name: "English", flag: "/flags/en.png" },
    { code: "ar", name: "Arabic", flag: "/flags/ar.png" }
  ];

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setOpen(false);

    // Kalau pakai i18n, tambahkan router push ke halaman dengan locale berbeda
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-3 py-2 bg-[#5fa4f4] hover:bg-[#3c679b] rounded"
      >
        <Image
          src={languages.find(l => l.code === selectedLang)?.flag || "/flags/id.png"}
          alt={selectedLang}
          width={20}
          height={20}
          className="mr-2"
        />
        <span className="text-sm">{selectedLang.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-32 bg-[#414141] border rounded shadow">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#5fa4f4]"
            >
              <Image src={lang.flag} alt={lang.name} width={20} height={20} className="mr-2" />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
