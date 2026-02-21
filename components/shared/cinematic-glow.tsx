"use client";

import { motion } from "framer-motion";

export function CinematicGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Tia sáng 1: Trôi bồng bềnh bên góc trái */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3], 
          scale: [1, 1.2, 1],
          x: ["-10%", "5%", "-10%"],
          y: ["-10%", "5%", "-10%"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[10%] w-[45vw] h-[45vw] bg-primary/30 dark:bg-primary/20 rounded-full blur-[100px]"
      />
      
      {/* Tia sáng 2: Trôi chậm hơn ở góc phải dưới */}
      <motion.div
        animate={{ 
          opacity: [0.2, 0.5, 0.2], 
          scale: [0.8, 1.3, 0.8],
          x: ["10%", "-5%", "10%"],
          y: ["10%", "-5%", "10%"]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[10%] w-[55vw] h-[55vw] bg-secondary/40 dark:bg-blue-600/30 rounded-full blur-[120px]"
      />
    </div>
  );
}