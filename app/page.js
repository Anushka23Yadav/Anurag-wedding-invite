"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

import Envelope from '../components/Envelope';
import BlessingSection from '../components/BlessingSection';
import ScratchCard from '../components/ScratchCard';
import Countdown from '../components/Countdown';
import Ceremonies from '../components/Ceremonies';
import VenueSection from '../components/VenueSection';
import ClosingSection from '../components/ClosingSection';
import { FloralDivider } from '../components/Icons';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Howl for background music
    // Using a stable traditional Indian music track from Archive.org
    audioRef.current = new Howl({
      src: ['/assets/song.mp3'], 
      loop: true,
      volume: 0.5,
      html5: true,
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.unload();
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen bg-beige selection:bg-gold/30 selection:text-forest">
      <AnimatePresence>
        {!isOpened && (
          <Envelope key="envelope" onOpen={handleOpen} />
        )}
      </AnimatePresence>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative pt-20"
        >
          {/* Floating Music Control */}
          <button 
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 z-40 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-gold/20 text-gold hover:scale-110 transition-transform active:scale-90"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>

          {/* Wedding Card Content */}
          <article className="max-w-[100vw] overflow-x-hidden">
            <BlessingSection />

            {/* Scratch to Reveal Section */}
            <section className="py-20 bg-forest/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
               <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                  <div className="space-y-4">
                    <h2 className="font-script text-5xl text-gold">Save the Date</h2>
                    <p className="font-heading text-xl opacity-60 italic">Scratch to unveil our special day</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <ScratchCard revealContent="24" />
                    <ScratchCard revealContent="November" />
                    <ScratchCard revealContent="2026" />
                  </div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-script text-3xl text-forest pt-8"
                  >
                    We can't wait to see you!
                  </motion.p>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </section>

            <section className="py-20 px-6 text-center space-y-8">
               <div className="space-y-4">
                  <h2 className="font-script text-5xl text-gold">Time for Togetherness</h2>
                  <p className="font-heading text-xl opacity-60 italic">The wait is almost over...</p>
               </div>
               <Countdown />
            </section>

            <Ceremonies />
            
            <VenueSection />

            <ClosingSection />
          </article>
        </motion.div>
      )}
    </main>
  );
}
