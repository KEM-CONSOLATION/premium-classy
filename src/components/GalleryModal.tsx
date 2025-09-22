"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types";
import { urlFor } from "@/lib/sanity";
import { getPortfolioImages } from "@/lib/portfolio-images";
import { modalAnimation } from "@/lib/animations";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio;
}

export function GalleryModal({ isOpen, onClose, portfolio }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get images from portfolio or use placeholder images
  const images = portfolio.images && portfolio.images.length > 0 
    ? portfolio.images.map(img => ({
        url: urlFor(img).width(1200).height(800).url(),
        alt: img.alt || portfolio.title,
        caption: img.caption || portfolio.title,
      }))
    : portfolio.gallery && portfolio.gallery.length > 0
    ? portfolio.gallery.map(img => ({
        url: urlFor(img).width(1200).height(800).url(),
        alt: img.alt || portfolio.title,
        caption: img.caption || portfolio.title,
      }))
    : getPortfolioImages(portfolio.eventType, 6);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative z-10 w-full max-w-6xl mx-4"
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            <h3 className="text-2xl font-bold">{portfolio.title}</h3>
            <p className="text-gray-300">{portfolio.eventType} • {portfolio.location}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Image Display */}
        <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            priority
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="text-center mt-4">
            <span className="text-white">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? "border-amber-500 scale-110" 
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Caption */}
        {images[currentIndex].caption && (
          <div className="text-center mt-4">
            <p className="text-gray-300">{images[currentIndex].caption}</p>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
