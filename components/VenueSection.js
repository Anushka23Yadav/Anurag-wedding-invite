"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VenueSection() {
  return (
    <section className="py-20 px-6 bg-cream/50">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="font-script text-5xl text-gold">Find Us Here</h2>
          <p className="font-heading text-xl opacity-60 italic">We'd love to have you with us</p>
        </div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.840748281358!2d77.2773!3d28.6304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcad675a6c3d%3A0xc4e5907409f6e695!2sLaxmi%20Nagar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1713370000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2) invert(0.05)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Address Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 border border-gold/10"
        >
          <div className="bg-gold/10 p-4 rounded-full text-gold">
            <MapPin size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-2xl font-bold">The Grand Palace</h3>
            <p className="font-heading text-lg text-forest/70 max-w-sm mx-auto">
              Main Venue Road, Laxmi Nagar,<br />
              New Delhi, Delhi - 110092
            </p>
          </div>
          <a 
            href="https://maps.app.goo.gl/..." 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 bg-forest text-beige rounded-full font-heading font-bold hover:bg-gold hover:text-forest transition-colors shadow-lg"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
