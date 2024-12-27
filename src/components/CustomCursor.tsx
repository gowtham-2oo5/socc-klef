"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = React.memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorTrail) return;

    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      cursor.style.setProperty("--cursor-x", `${clientX}px`);
      cursor.style.setProperty("--cursor-y", `${clientY}px`);

      rafId = requestAnimationFrame(() => {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const scale = Math.max(0.5, Math.min(1, 1 - speed * 0.01));

        cursor.style.setProperty("--cursor-scale", scale.toString());
        cursorTrail.style.setProperty("--trail-x", `${clientX}px`);
        cursorTrail.style.setProperty("--trail-y", `${clientY}px`);

        lastX = clientX;
        lastY = clientY;
      });
    };

    const updateCursorType = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const cursorType = window.getComputedStyle(element).cursor;
        setIsPointer(cursorType === "pointer");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", updateCursorType);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", updateCursorType);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{ scale: isPointer ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          left: "var(--cursor-x, -100px)",
          top: "var(--cursor-y, -100px)",
          transform: "translate(-50%, -50%) scale(var(--cursor-scale, 1))",
        }}
      >
        <div className="w-5 h-5 rounded-full border-2 border-white" />
      </motion.div>
      <div
        ref={cursorTrailRef}
        className="fixed pointer-events-none z-40 mix-blend-difference"
        style={{
          left: "var(--trail-x, -100px)",
          top: "var(--trail-y, -100px)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white opacity-50" />
      </div>
    </>
  );
});

CustomCursor.displayName = "CustomCursor";

export default CustomCursor;
