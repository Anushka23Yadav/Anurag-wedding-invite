"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloralDivider, MandalaIcon } from './Icons';

import weddingConfig from '../data/weddingConfig.json';

export default function BlessingSection() {
  const { couple, assets } = weddingConfig;

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
            src={assets.ganeshImage}
            alt="Shri Ganesh Ji"
            fill
            sizes="160px"
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
          {couple.blessingHeadline}
        </motion.p>
        
        <div className="space-y-4">
          <p className="text-2xl font-heading text-gold italic gold-gradient">
            "{couple.shloka}"
          </p>
          <p className="text-sm tracking-widest text-forest/60 uppercase">
            {couple.shlokaTranslation}
          </p>
        </div>

        <FloralDivider className="my-8" />

        <div className="space-y-6 md:space-y-8">
          {/* Couple Monogram Crest */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-2 drop-shadow-md"
          >
            <Image
              src="/assets/anurima-logo.png"
              alt="Anurima Monogram"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Couple Names */}
          <div className="space-y-4 pt-2 md:pt-4">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-alex text-7xl md:text-9xl text-gold drop-shadow-sm leading-tight md:leading-normal"
            >
              {couple.coupleTitle}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Groom Side */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold/20 shadow-md space-y-4"
            >
              <p className="font-alex text-5xl md:text-6xl text-forest">{couple.groom.name}</p>
              <div className="h-[1px] w-16 bg-gold/30 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold font-bold">Grandson of</p>
                <p className="font-heading font-semibold text-lg md:text-xl text-forest/90">
                  {couple.groom.grandparents}
                </p>
              </div>

              <div className="h-[1px] w-12 bg-gold/20 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold font-bold">Son of</p>
                <p className="font-heading font-bold text-xl uppercase tracking-tighter text-forest">
                  {couple.groom.parents}
                </p>
              </div>
            </motion.div>

            {/* Bride Side */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold/20 shadow-md space-y-4"
            >
              <p className="font-alex text-5xl md:text-6xl text-forest">{couple.bride.name}</p>
              <div className="h-[1px] w-16 bg-gold/30 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold font-bold">Granddaughter of</p>
                <p className="font-heading font-semibold text-lg md:text-xl text-forest/90">
                  {couple.bride.grandparents}
                </p>
              </div>

              <div className="h-[1px] w-12 bg-gold/20 mx-auto" />

              <div className="space-y-1">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold font-bold">Daughter of</p>
                <p className="font-heading font-bold text-xl uppercase tracking-tighter text-forest">
                  {couple.bride.parents}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <FloralDivider className="my-8" />
      </motion.div>
    </section>
  );
}
