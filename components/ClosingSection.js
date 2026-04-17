"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LotusIcon, FloralDivider } from './Icons';

export default function ClosingSection() {
  return (
    <section className="py-32 px-6 bg-beige border-t-4 border-gold/10 overflow-hidden relative">
      {/* Decorative Rotating Mandala Background */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-[0.03] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[800px] h-[800px] border-[2px] border-forest rounded-full flex items-center justify-center">
            <div className="w-[600px] h-[600px] border-[1px] border-forest rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <LotusIcon className="w-20 h-20 text-gold animate-pulse-soft" />
          
          <h2 className="font-script text-5xl md:text-6xl text-forest leading-tight max-w-2xl">
            "With joy in our hearts, we invite you to be a part of this beautiful beginning."
          </h2>
          
          <FloralDivider className="w-full max-w-md" />
          
          <p className="font-heading text-2xl text-forest/70 max-w-xl italic">
            Your presence will make our celebration complete. Please do grace us with your blessings.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="space-y-4 pt-12"
        >
          <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold font-bold">Waiting for You</p>
          <h3 className="font-script text-6xl text-forest">Garima & Anurag</h3>
        </motion.div>
        
        <div className="pt-20 opacity-30 font-heading text-xs tracking-widest text-forest">
          <p>Handcrafted for Garima & Anurag • 2026</p>
        </div>
      </div>
    </section>
  );
}
