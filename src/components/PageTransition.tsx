/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const transitionVariants = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(10px)',
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out curve
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(10px)',
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.7, 0, 0.84, 0], // Custom elegant ease-in curve
    },
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants}
      className="w-full h-full flex flex-col items-center justify-start min-h-[70vh]"
    >
      {children}
    </motion.div>
  );
};
