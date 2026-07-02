/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PageId, PageDefinition } from '../types';
import * as Icons from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  pages: PageDefinition[];
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  pages,
}) => {
  const currentIndex = pages.findIndex((p) => p.id === currentPage);
  const progressPercent = ((currentIndex) / (pages.length - 1)) * 100;

  // Resolve Lucide Icon dynamically
  const getIcon = (id: PageId, size: number = 18) => {
    switch (id) {
      case 'welcome':
        return <Icons.Mail size={size} />;
      case 'journey':
        return <Icons.Compass size={size} />;
      case 'wishes':
        return <Icons.Heart size={size} />;
      case 'canvas':
        return <Icons.Sparkles size={size} />;
      case 'celebration':
        return <Icons.Cake size={size} />;
      default:
        return <Icons.Compass size={size} />;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
      {/* Journey Progress Line above navigation */}
      <div className="w-full px-4 mb-2">
        <div className="h-[2px] w-full bg-pastel-rose/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-pastel-rose via-pastel-rose-deep to-gold-accent"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Floating Glassmorphic Container */}
      <div className="glass-panel-dark rounded-full px-3 py-2 flex items-center justify-between shadow-lg shadow-pastel-rose-deep/5 border border-white/40">
        {pages.map((page, index) => {
          const isActive = page.id === currentPage;
          return (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className="relative p-3 flex flex-col items-center justify-center rounded-full transition-colors group cursor-pointer focus:outline-none"
              aria-label={page.label}
            >
              {/* Active backing bubble */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-white/70 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <span
                className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-pastel-rose-deep' : 'text-pastel-rose-deep/50 hover:text-pastel-rose-deep/80'
                }`}
              >
                {getIcon(page.id, 19)}
              </span>

              {/* Subtle Active glow indicator dot */}
              {isActive && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-gold-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Tooltip on Hover for desktop */}
              <span className="absolute bottom-14 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-white/95 text-pastel-rose-deep text-xs font-sans py-1 px-2.5 rounded-lg shadow-md border border-pastel-rose-light pointer-events-none whitespace-nowrap">
                {page.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
