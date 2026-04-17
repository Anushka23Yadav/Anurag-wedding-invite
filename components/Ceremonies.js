"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloralDivider } from './Icons';

const EventCard = ({ title, date, time, venue, dressCode, color, image, details }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={`relative overflow-hidden rounded-3xl shadow-2xl border-2 border-gold/20 p-8 flex flex-col items-center text-center gap-4 ${color}`}
  >
    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
      <Image src={image} fill className="object-cover" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
    </div>
    
    <h2 className="font-script text-4xl text-forest">{title}</h2>
    <div className="flex flex-col gap-1 font-heading text-lg">
      <p className="font-bold">{date}</p>
      <p>{time}</p>
    </div>
    
    <div className="space-y-2 text-forest/80">
      <p className="font-bold">Dress Code:</p>
      <p className="text-xl">{dressCode}</p>
    </div>

    <div className="mt-4 pt-4 border-t border-forest/10 w-full">
      <p className="text-sm uppercase tracking-widest font-bold">Venue</p>
      <p className="font-heading">{venue}</p>
    </div>
  </motion.div>
);

export default function Ceremonies() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto space-y-24">
      {/* Day 1 Heading */}
      <div className="text-center space-y-4">
        <FloralDivider />
        <h2 className="font-script text-5xl text-gold pt-4">Day 1</h2>
        <p className="font-heading text-xl opacity-60 italic">23rd November 2026 — Sunday</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <EventCard 
          title="Haldi Ceremony"
          date="23rd Nov 2026"
          time="1:00 PM"
          dressCode="💛 Yellow Attire"
          venue="Grand Palace, Laxmi Nagar, Delhi"
          color="bg-[#FFF9C4]" // Light Yellow
          image={'/assets/haldi.jpeg'}
        />
        <EventCard 
          title="Sangeet & Mehndi"
          date="23rd Nov 2026"
          time="7:00 PM"
          dressCode="💚 Green/Ethnic Attire"
          venue="Grand Palace, Laxmi Nagar, Delhi"
          color="bg-[#E8F5E9]" // Light Green
          image={'/assets/sangeet.jpg'}
        />
      </div>

      {/* Wedding Day */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <FloralDivider />
          <h2 className="font-script text-5xl text-gold pt-4">The Wedding Day</h2>
          <p className="font-heading text-xl opacity-60 italic">24th November 2026 — Monday</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl group"
        >
          {/* Sunrise Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-200 via-rose-300 to-sky-400" />
          
          {/* Subtle Sun */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full blur-[100px] opacity-40" />

          {/* Ram-Sita Silhouette */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative w-full h-full">
              <video 
  src="/assets/ramsita.mp4"
  autoPlay 
  muted 
  loop 
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-black/20" /> {/* Added overlay for text legibility */}
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-20 text-white gap-4">
                <motion.h3 
                  className="font-script text-7xl text-gold drop-shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Subh Vivah
                </motion.h3>
                <p className="font-heading text-3xl tracking-[0.2em] font-light">Garima & Anurag</p>
                <div className="w-1 bg-gold h-12" />
                <p className="font-heading text-xl uppercase tracking-widest">Joining Two Souls Into One</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
