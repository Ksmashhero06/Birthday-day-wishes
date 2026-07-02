/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingPetalConfig, SparkleConfig } from '../types';

export const BackgroundEffects: React.FC = () => {
  const [petals, setPetals] = useState<FloatingPetalConfig[]>([]);
  const [sparkles, setSparkles] = useState<SparkleConfig[]>([]);

  // Seed initial sparkles and petals
  useEffect(() => {
    // Generate gentle golden twinkles
    const initialSparkles: SparkleConfig[] = Array.from({ length: 15 }).map((_, i) => ({
      id: `sparkle-${i}-${Math.random()}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      color: Math.random() > 0.5 ? '#e5c384' : '#f3a3b2',
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setSparkles(initialSparkles);

    // Generate falling soft rose/gold petals
    const initialPetals: FloatingPetalConfig[] = Array.from({ length: 12 }).map((_, i) => ({
      id: `petal-${i}-${Math.random()}`,
      x: Math.random() * 100,
      y: Math.random() * -50, // start above screen
      size: Math.random() * 14 + 10,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: Math.random() * 12 + 10,
      horizontalDrift: Math.random() * 40 - 20,
    }));
    setPetals(initialPetals);
  }, []);

  // Periodic particle replenishment
  useEffect(() => {
    const petalInterval = setInterval(() => {
      setPetals((prev) => {
        // Keep active count to 15 max
        const active = prev.filter((p) => p.y < 110);
        if (active.length < 15) {
          const newPetal: FloatingPetalConfig = {
            id: `petal-spawn-${Date.now()}-${Math.random()}`,
            x: Math.random() * 100,
            y: -10,
            size: Math.random() * 12 + 8,
            rotation: Math.random() * 360,
            delay: 0,
            duration: Math.random() * 10 + 10,
            horizontalDrift: Math.random() * 30 - 15,
          };
          return [...active, newPetal];
        }
        return active;
      });
    }, 4000);

    return () => clearInterval(petalInterval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-gradient-to-tr from-pastel-blush via-[#FFFDFD] to-pastel-lavender-light">
      
      {/* Dreamy Blurred Background Orbs */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-pastel-rose-light/50 filter blur-[80px] md:blur-[120px] animate-pulse-dreamy" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full bg-pastel-lavender/35 filter blur-[90px] md:blur-[140px] animate-pulse-dreamy" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-pastel-gold-light/40 filter blur-[70px] md:blur-[100px] animate-pulse-dreamy" style={{ animationDelay: '1.2s' }} />

      {/* Twinkling Magical Sparkles */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {sparkles.map((sparkle) => (
          <g key={sparkle.id}>
            <circle
              cx={`${sparkle.x}%`}
              cy={`${sparkle.y}%`}
              r={sparkle.size / 2}
              fill={sparkle.color}
              className="animate-sparkle"
              style={{
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                filter: `drop-shadow(0 0 ${sparkle.size / 2}px ${sparkle.color})`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Floating/Falling Rose Petals (using Framer Motion for precise physical drift) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ 
                x: `${petal.x}%`, 
                y: '-10%', 
                rotate: petal.rotation, 
                opacity: 0 
              }}
              animate={{ 
                x: [`${petal.x}%`, `${petal.x + petal.horizontalDrift}%`],
                y: '110%',
                rotate: petal.rotation + 360,
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{ 
                duration: petal.duration, 
                ease: 'easeInOut',
                times: [0, 0.1, 0.9, 1]
              }}
              style={{
                position: 'absolute',
                width: petal.size,
                height: petal.size,
              }}
            >
              {/* Petal shape SVGs (some rose, some gold) */}
              {petal.size % 2 === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(243,163,178,0.15)]">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18C8.5 18 6 15 6 12C6 9 8.5 6 12 6C15.5 6 18 9 18 12C18 15 15.5 18 12 18Z" fill="#FCE4E6" fillOpacity="0.85" />
                  <path d="M12 6C9.5 6 7.5 8.5 7.5 12C7.5 15.5 9.5 18 12 18C14.5 18 16.5 15.5 16.5 12C16.5 8.5 14.5 6 12 6Z" fill="#F3A3B2" fillOpacity="0.65" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(229,195,132,0.15)]">
                  <path d="M12 2C15 7 22 12 22 15C22 18.5 17.5 22 12 22C6.5 22 2 18.5 2 15C2 12 9 7 12 2Z" fill="#FAF5E6" fillOpacity="0.8" />
                  <path d="M12 5C14 9 18 13 18 15C18 17 15 19 12 19C9 19 6 17 6 15C6 13 10 9 12 5Z" fill="#E5C384" fillOpacity="0.5" />
                </svg>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ambient Radial Vignette for Elegance */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-pastel-rose-light/10 pointer-events-none" />
    </div>
  );
};
