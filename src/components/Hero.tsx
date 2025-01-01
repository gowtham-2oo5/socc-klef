"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
          <span className="bg-clip-text text-transparent bg-gradient-to-r w-16 from-primary to-secondary">
            <TypeAnimation
              sequence={[
                "Welcome to SOCC",
                1500,
                "Code. Compete. Conquer.",
                1500,
                "Where passion meets precision, and coding dreams come true.",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-muted-foreground">
          Unleash your coding potential with us
        </p>
        <Button
          className="text-lg px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          size="lg"
        >
          Start Coding
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8"
      >
        <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
