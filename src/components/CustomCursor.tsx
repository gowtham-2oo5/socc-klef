"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CodingCustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    // Check if hover is supported
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverSupported(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsHoverSupported(e.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!isHoverSupported) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Attach event listener for mousemove
    window.addEventListener("mousemove", moveCursor);

    return () => {
      // Clean up event listener
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isHoverSupported]);

  if (!isHoverSupported) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Outer glow with binary effect */}
        <div
          className="absolute top-0 left-0 w-8 h-8 bg-transparent border-2 border-primary rounded-full 
          animate-pulse -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0 text-[8px] text-primary flex items-center justify-center font-mono">
            {"<>"} 
          </div>
        </div>

        {/* Central dot for precision */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </motion.div>
  );
};

export default CodingCustomCursor;
