"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OpeningAnimation() {
  const [icons, setIcons] = useState<{ skill: string; x: number; y: number }[]>(
    []
  );
  const [isVisible, setIsVisible] = useState(true); // State to track visibility

  useEffect(() => {
    const skills = [
      "java",
      "c",
      "cpp",
      "python",
      "javascript",
      "codechef",
      "leetcode",
      "codeforces",
    ];

    const desiredCenterX = window.innerWidth / 2;
    const desiredCenterY = window.innerHeight / 2;
    const radius = Math.min(desiredCenterX, desiredCenterY) - 100;
    const angleStep = (2 * Math.PI) / skills.length;

    const newIcons = skills.map((skill, index) => {
      const angle = index * angleStep;
      const x = desiredCenterX + radius * Math.cos(angle) - 32;
      const y = desiredCenterY + radius * Math.sin(angle) - 32;

      return { skill, x, y };
    });

    setIcons(newIcons);

    // Hide the animation after it finishes (timeout duration based on animation)
    setTimeout(() => {
      setIsVisible(false);
    }, 6000); // Adjust the timeout value to match the animation duration
  }, []);

  const getImageSrc = (skill: string) => {
    switch (skill) {
      case "codechef":
        return "/codechef.png";
      case "leetcode":
        return "/leetcode.png";
      case "codeforces":
        return "/codeforces.png";
      default:
        return `https://skillicons.dev/icons?i=${skill}`;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Smooth fade-out when leaving
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img
                src="/SOCC-LOGO.jpg"
                width={150}
                height={150}
                alt="SOCC Logo"
                style={{ borderRadius: "20px" }}
              />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl font-bold text-center mb-2"
            >
              SOCC
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xl text-center mb-4 text-gray-400"
            >
              School of Competitive Coding
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-center text-primary-foreground/80 mb-6 text-gray-500"
            >
              Empowering future coders
            </motion.p>
            {icons.map((icon, index) => (
              <motion.div
                key={index}
                className="absolute w-20 h-20 flex items-center justify-center rounded-full bg-gray-800/60 shadow-lg"
                style={{ left: icon.x, top: icon.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: Math.random() * 0.5 + 1.5,
                  type: "spring",
                  stiffness: 50,
                }}
              >
                <img
                  src={getImageSrc(icon.skill)}
                  alt={`${icon.skill} icon`}
                  className="w-12 h-12"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
