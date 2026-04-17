"use strict";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './Icons';

export default function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Play sound logic here or in parent
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-beige overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2D5016 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <motion.div 
        className="relative w-[90vw] max-w-[500px] h-[350px] preserve-3d"
        initial={{ y: 0, opacity: 1 }}
        animate={isOpen ? { y: 200, opacity: 0, scale: 0.8 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="text-center mb-8 absolute -top-24 w-full">
          <motion.p 
            className="font-script text-2xl text-gold mb-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to Reveal
          </motion.p>
        </div>

        {/* Envelope Body */}
        <div className="absolute inset-0 bg-white shadow-2xl border-2 border-gold/20 rounded-lg">
          {/* Internal Content (Wedding Card Preview) */}
          <div className="absolute inset-4 bg-beige/50 border border-gold/10 rounded flex items-center justify-center">
             <div className="text-forest/30 font-script text-4xl">To New Beginnings</div>
          </div>
        </div>

        {/* Left Flap */}
        <div 
          className="absolute inset-0 bg-zinc-50 shadow-inner"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' }}
        />
        
        {/* Right Flap */}
        <div 
          className="absolute inset-0 bg-zinc-50 shadow-inner"
          style={{ clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)' }}
        />

        {/* Bottom Flap */}
        <div 
          className="absolute inset-0 bg-zinc-100 shadow-inner border-t border-zinc-200"
          style={{ clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)' }}
        />

        {/* Top Flap (Animated) */}
        <motion.div 
          className="absolute inset-0 bg-zinc-100 shadow-2xl origin-top z-20"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%)' }}
          animate={isOpen ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <WaxSeal className="w-16 h-16" onClick={handleOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-8 absolute -bottom-16 w-full">
          <p className="font-script text-xl text-forest italic">To New Beginnings</p>
        </div>
      </motion.div>

      {/* Cinematic Flash */}
      <motion.div 
        className="fixed inset-0 bg-white z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, times: [0, 0.5, 1], ease: "easeInOut" }}
      />
    </div>
  );
}
