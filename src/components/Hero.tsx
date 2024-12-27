"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030712]"
    >
      {/* Cyber Grid Background */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
            <TypeAnimation
              sequence={[
                "Welcome to SOCC",
                1000,
                "Code. Compete. Conquer.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Unleash your coding potential with the Society of Competitive Coders
        </p>
        <Button
          className="text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          size="lg"
        >
          <span className="relative z-10">Start Coding with Us</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Button>
      </motion.div>
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div> */}
    </section>
  );
};

export default Hero;
