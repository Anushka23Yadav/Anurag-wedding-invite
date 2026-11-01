"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ImageIcon } from 'lucide-react';
import { FloralDivider } from './Icons';
import weddingConfig from '../data/weddingConfig.json';

const storyPhotos = weddingConfig.ourStory.photos;

export default function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % storyPhotos.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + storyPhotos.length) % storyPhotos.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <FloralDivider />
          <div className="pt-4 space-y-3">
            <div className="inline-flex items-center gap-2 bg-gold/10 px-5 py-2 rounded-full border border-gold/20">
              <Heart size={14} className="text-gold" fill="currentColor" />
              <p className="font-heading text-sm uppercase tracking-[0.3em] text-gold font-bold">Our Journey</p>
              <Heart size={14} className="text-gold" fill="currentColor" />
            </div>
            <h2 className="font-script text-5xl md:text-6xl text-gold">Our Story</h2>
            <p className="font-heading text-xl opacity-60 italic max-w-lg mx-auto">
              A glimpse into the beautiful moments Anurag & Garima have shared together
            </p>
          </div>
        </motion.div>

        {/* Photo Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Main carousel frame */}
          <div className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/30 bg-cream">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              {/* Blurred Ambient Background */}
              <Image
                src={storyPhotos[currentIndex].image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
              />

              {/* Uncropped Foreground Image */}
              <Image
                src={storyPhotos[currentIndex].image}
                alt={storyPhotos[currentIndex].caption}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain p-2 md:p-4 z-10 drop-shadow-2xl"
                priority
              />

              {/* Gradient Overlay for Caption readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-15 pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-center z-20">
                {storyPhotos[currentIndex].tag && (
                  <motion.div
                    key={`tag-${currentIndex}`}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block mb-1.5 md:mb-2"
                  >
                    <span className="px-3.5 py-1 rounded-full text-[11px] md:text-xs font-heading font-bold uppercase tracking-[0.2em] bg-gold/90 text-forest shadow-md border border-white/30 backdrop-blur-sm">
                      {storyPhotos[currentIndex].tag}
                    </span>
                  </motion.div>
                )}
                <motion.p 
                  key={storyPhotos[currentIndex].caption}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-script text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {storyPhotos[currentIndex].caption}
                </motion.p>
              </div>
            </motion.div>

            {/* Previous Button */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20 z-20"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20 z-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {storyPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gold shadow-md'
                    : 'w-3 h-3 bg-gold/30 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
