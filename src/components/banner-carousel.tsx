"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_IMAGES = [
  "https://res.cloudinary.com/dmwvniqxk/image/upload/v1768728501/Cambridge_ldhocb.jpg",
  "https://res.cloudinary.com/dmwvniqxk/image/upload/v1768728657/iitd_u9yyi5.jpg",
  "https://res.cloudinary.com/dmwvniqxk/image/upload/v1768728721/oxford_aansre.jpg",
];

export function BannerCarousel({ images: propImages }: { images?: string[] }) {
  const images = propImages && propImages.length > 0 ? propImages : DEFAULT_IMAGES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Valid college banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Navigation - Hidden on small screens to keep it clean */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
