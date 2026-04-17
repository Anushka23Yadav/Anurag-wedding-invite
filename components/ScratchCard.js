"use client";

import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCard({ revealContent, onReveal }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = container.getBoundingClientRect();

    // Set internal resolution to match display size
    canvas.width = width;
    canvas.height = height;

    const paintCanvas = () => {
      ctx.globalCompositeOperation = 'source-over';
      
      // Fill with golden shimmer texture
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#C9A84C');
      gradient.addColorStop(0.2, '#E8C15D');
      gradient.addColorStop(0.5, '#F1D279');
      gradient.addColorStop(0.8, '#E8C15D');
      gradient.addColorStop(1, '#C9A84C');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add shimmer noise
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const opacity = Math.random() * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add "Scratch" text hint on the canvas itself
      ctx.fillStyle = 'rgba(45, 80, 22, 0.5)';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH HERE', width / 2, height - 20);

      ctx.globalCompositeOperation = 'destination-out';
      setIsCanvasReady(true);
    };

    paintCanvas();

    // Handle resize
    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
      paintCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed || !isCanvasReady) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    ctx.lineWidth = 45;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Smooth drawing
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (pixels.length / 4)) * 100;

    if (percent > 55 && !isRevealed) {
      setIsRevealed(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#2D5016', '#FAF3E0'],
        gravity: 1.2,
        ticks: 300
      });
      if (onReveal) onReveal();
    }
  };

  if (!isMounted) return <div className="w-32 h-32 md:w-40 md:h-40 bg-gold/20 rounded-lg animate-pulse" />;

  return (
    <div 
      ref={containerRef}
      className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-gold shadow-lg group bg-gold"
    >
      {/* Target Content */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-cream text-forest p-2 text-center transition-opacity duration-300 ${isCanvasReady ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-2xl md:text-3xl font-bold font-heading">{revealContent}</span>
      </div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'} z-10`}
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={draw}
        onMouseLeave={() => setIsDrawing(false)}
        onTouchStart={(e) => { e.preventDefault(); setIsDrawing(true); }}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
      />
      
      {!isRevealed && isCanvasReady && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-white/20 backdrop-blur-[2px] px-3 py-1 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold text-forest uppercase tracking-widest">Scratch Here</p>
          </div>
        </div>
      )}
    </div>
  );
}
