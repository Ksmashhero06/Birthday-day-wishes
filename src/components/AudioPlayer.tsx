/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Royal-free, dreamy emotional background music (soft piano/orchestral track)
  const musicUrl = 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-1111.mp3';

  useEffect(() => {
    // Setup audio object
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25; // Gentle low volume
    audioRef.current.muted = false;

    // Listen to custom event to start music from any user gesture
    const handleGlobalPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowNotification(false);
          })
          .catch((err) => {
            console.log('Playback blocked by browser policy. Waiting for gesture.', err);
          });
      }
    };

    window.addEventListener('play-birthday-music', handleGlobalPlay);

    // Auto-dismiss the friendly tip after 7 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 7000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('play-birthday-music', handleGlobalPlay);
      clearTimeout(timer);
    };
  }, []);

  const playMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setShowNotification(false);
      })
      .catch((err) => {
        console.log('Playback blocked by browser policy. Waiting for gesture.', err);
      });
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2">
      {/* Soft, magical reminder popup asking the user to activate music */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 px-3.5 py-1.5 glass-panel rounded-full shadow-md border border-white/60 mb-1"
          >
            <Sparkles size={13} className="text-gold-accent animate-spin-slow" />
            <span className="text-[11px] font-sans text-pastel-rose-deep tracking-wide font-medium">
              Listen to magical birthday melody ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mini Music Controller Bar in the bottom-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel-dark border border-white/40 shadow-lg shadow-pastel-rose-deep/5"
      >
        {/* Animated music note icon */}
        <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-full mr-1.5 overflow-visible">
          {isPlaying && (
            <>
              {/* Floating magical music notes */}
              <motion.span
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: -20, opacity: [0, 1, 0], scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                className="absolute text-pastel-rose-deep text-[10px] pointer-events-none font-bold"
                style={{ left: '10%' }}
              >
                ♪
              </motion.span>
              <motion.span
                initial={{ y: 2, opacity: 0, scale: 0.5 }}
                animate={{ y: -16, opacity: [0, 1, 0], scale: 1 }}
                transition={{ repeat: Infinity, duration: 2.3, delay: 0.7, ease: 'easeOut' }}
                className="absolute text-gold-deep text-[9px] pointer-events-none font-bold"
                style={{ right: '10%' }}
              >
                ♫
              </motion.span>
            </>
          )}

          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="text-pastel-rose-deep"
          >
            <Music size={15} />
          </motion.div>
        </div>

        {/* 1. Play Button */}
        <motion.button
          onClick={playMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isPlaying}
          className={`p-1.5 rounded-full transition-all duration-300 focus:outline-none ${
            isPlaying
              ? 'text-pastel-rose-deep/30 cursor-not-allowed'
              : 'text-pastel-rose-deep hover:bg-white/35 bg-white/10'
          }`}
          title="Play Music"
          aria-label="Play Music"
        >
          <Play size={14} className="fill-current" />
        </motion.button>

        {/* 2. Pause Button */}
        <motion.button
          onClick={pauseMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={!isPlaying}
          className={`p-1.5 rounded-full transition-all duration-300 focus:outline-none ${
            !isPlaying
              ? 'text-pastel-rose-deep/30 cursor-not-allowed'
              : 'text-pastel-rose-deep hover:bg-white/35 bg-white/10'
          }`}
          title="Pause Music"
          aria-label="Pause Music"
        >
          <Pause size={14} className="fill-current" />
        </motion.button>

        {/* 3. Mute/Unmute Button */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-full text-pastel-rose-deep hover:bg-white/35 bg-white/10 transition-all duration-300 focus:outline-none"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </motion.button>
      </motion.div>
    </div>
  );
};
