"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GaneshaIcon, FloralDivider, MandalaIcon } from './Icons';

export default function BlessingSection() {
  return (
    <section className="relative py-20 px-6 text-center space-y-12 overflow-hidden">
      {/* Background Mandalas */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <MandalaIcon className="w-80 h-80 animate-spin-slow" />
      </div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-5">
        <MandalaIcon className="w-80 h-80 animate-spin-slow" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <GaneshaIcon className="w-24 h-24 text-gold" />
        
        <div className="space-y-4">
          <p className="text-2xl font-heading text-gold italic gold-gradient">
            "धर्मेच अर्थेच कामेच नाति चरामि"
          </p>
          <p className="text-sm tracking-widest text-forest/60 uppercase">
            In Dharma, Wealth, and Love — I shall not forsake you
          </p>
        </div>

        <FloralDivider className="my-8" />

        <div className="space-y-12">
          {/* Couple Names */}
          <div className="space-y-4">
            <h1 className="font-script text-7xl md:text-9xl text-gold drop-shadow-sm">
              Garima & Anurag
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Bride Side */}
            <div className="space-y-2">
              <p className="font-script text-3xl text-forest">Garima</p>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
              <p className="font-heading text-lg">Daughter of</p>
              <p className="font-heading font-bold text-xl uppercase tracking-tighter">
                 Mr. Pawan Khanka & Mrs. Arti Khanka
              </p>
            </div>

            {/* Groom Side */}
            <div className="space-y-2">
              <p className="font-script text-3xl text-forest">Anurag</p>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
              <p className="font-heading text-lg">Son of</p>
              <p className="font-heading font-bold text-xl uppercase tracking-tighter">
                Mr. Satyaveer Sharma & Mrs. Anita Sharma
              </p>
            </div>
          </div>
        </div>

        <FloralDivider className="my-8" />
      </motion.div>
    </section>
  );
}
