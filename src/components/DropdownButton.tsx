'use client';

import { useState, useRef, useEffect } from 'react';

type DropdownButtonProps = {
  title: string;
  items: { label: string; href: string }[];
};

const DropdownButton: React.FC<DropdownButtonProps> = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tutup menu jika klik di luar
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2"
      >
        {title}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
