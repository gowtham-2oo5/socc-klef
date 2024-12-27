"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Brain,
  Users,
  ChevronRight,
  Terminal,
  Sparkles,
} from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const cards = [
    {
      title: "Competitive Coding",
      description:
        "Level up your skills through intense coding battles and algorithmic challenges",
      icon: Code2,
      stats: "45+ Competitions",
      gradient: "from-[#1a44ff] via-[#4169ff] to-[#638dff]",
      shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(26,68,255,0.3)]",
    },
    {
      title: "Skill Development",
      description:
        "Master advanced algorithms and ace technical interviews with structured learning",
      icon: Brain,
      stats: "100+ Problems",
      gradient: "from-[#ff1a8c] via-[#ff4169] to-[#ff638d]",
      shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(255,26,140,0.3)]",
    },
    {
      title: "Community",
      description:
        "Join a thriving community of coders, mentors, and future tech leaders",
      icon: Users,
      stats: "500+ Members",
      gradient: "from-[#ffb01a] via-[#ffc041] to-[#ffd063]",
      shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(255,176,26,0.3)]",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-[#030712]"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4"
      >
        {/* Glowing Header */}
        <div className="relative flex flex-col items-center mb-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"
          />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 justify-center mb-4"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500" />
              <span className="text-blue-500 font-mono text-sm">DISCOVER</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 font-mono">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                What is SOCC?
              </span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 justify-center text-muted-foreground"
            >
              <Terminal className="w-4 h-4" />
              <code className="font-mono text-sm">
                Society of Competitive Coders
              </code>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="group relative"
            >
              {/* Animated border gradient */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md" />

              <Card
                className={`relative h-full border-0 bg-black/40 backdrop-blur-sm transition-all duration-500 ${card.shadow}`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon with glow effect */}
                  <div className="mb-6 w-fit">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} group-hover:scale-110 transition-transform duration-500`}
                    >
                      <card.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold mb-3 font-mono transition-all duration-500 ease-out">
                    <span
                      className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:opacity-100 group-hover:text-transparent transition-opacity duration-500`}
                    >
                      {card.title}
                    </span>
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow">
                    {card.description}
                  </p>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm font-mono opacity-60">
                      {card.stats}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
