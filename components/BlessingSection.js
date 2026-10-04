"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloralDivider, MandalaIcon } from './Icons';

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

      {/* Floating Petals */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${10 + i * 15}%`,
            backgroundColor: ['#FF9933', '#C9A84C', '#F9E4D4', '#FFD700', '#FF6B6B', '#FFA07A'][i],
            opacity: 0.4,
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Ganesh Ji Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl animate-glow"
        >
          <Image
            src="/assets/ganesh.jpg"
            alt="Shri Ganesh Ji"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-heading text-lg text-saffron tracking-widest uppercase"
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>
        
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
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-script text-7xl md:text-9xl text-gold drop-shadow-sm"
            >
              Garima & Anurag
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Bride Side */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="font-script text-3xl text-forest">Garima</p>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
              <p className="font-heading text-lg">Daughter of</p>
              <p className="font-heading font-bold text-xl uppercase tracking-tighter">
                 Mr. Pawan Khanka & Mrs. Arti Khanka
              </p>
            </motion.div>

            {/* Groom Side */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2"
            >
              <p className="font-script text-3xl text-forest">Anurag</p>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
              <p className="font-heading text-lg">Son of</p>
              <p className="font-heading font-bold text-xl uppercase tracking-tighter">
                Mr. Satyaveer Sharma & Mrs. Anita Sharma
              </p>
            </motion.div>
          </div>
        </div>

        <FloralDivider className="my-8" />
      </motion.div>
    </section>
  );
}
