"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import EventsSummary from "@/components/EventsSummary";
import Hero from "@/components/Hero";
import OpeningAnimation from "@/components/OpeningAnimation";
import TeamSummary from "@/components/TeamSummary";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationDone(true);
    }, 6000); // Matching timeout with the animation duration
  }, []);

  return (
    <div className="relative">
      {/* Opening animation appears first */}
      {!animationDone && <OpeningAnimation />}

      {/* Content fades in after animation is done */}
      <AnimatePresence>
        {animationDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth fade-in for page content
          >
            <Hero />
            <About />
            <EventsSummary />
            <TeamSummary />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
