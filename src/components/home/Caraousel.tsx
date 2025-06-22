'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - Anda bisa mengganti dengan data universitas yang sebenarnya
  const slides = [
    {
      id: 1,
      image: "",
      bgColor: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      image: "",
      bgColor: "from-green-400 to-green-600"
    },
    {
      id: 3,
      image: "",
      bgColor: "from-purple-400 to-purple-600"
    }
  ];
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto lg:h-[600px]  h-[500px] overflow-hidden rounded-lg shadow-2xl">
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative"
          >
           {/* ambil gambar dari const slide */}
            <Image
              width={800}
              height={500}
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-50`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Slide {slide.id}
            </div>
           
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-yellow-500 scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-20">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carousel;