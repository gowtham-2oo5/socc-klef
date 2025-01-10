"use client";

import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Code2,
  Sparkles,
  Terminal,
  Users,
  Trophy,
  Laptop,
  Calendar,
} from "lucide-react";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

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
        "Participate in intense coding battles and algorithmic challenges to sharpen your skills.",
      icon: Code2,
      stats: "45+ Competitions Annually",
      gradient: "from-primary via-primary/80 to-primary/60",
      shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]",
    },
    {
      title: "Skill Development",
      description:
        "Master advanced algorithms and data structures through structured learning programs.",
      icon: Brain,
      stats: "100+ Curated Problems",
      gradient: "from-secondary via-secondary/80 to-secondary/60",
      shadow:
        "group-hover:shadow-[0_0_30px_-5px_rgba(var(--secondary-rgb),0.3)]",
    },
    {
      title: "Thriving Community",
      description:
        "Connect with fellow coders, mentors, and industry experts in our vibrant tech ecosystem.",
      icon: Users,
      stats: "500+ Active Members",
      gradient: "from-accent via-accent/80 to-accent/60",
      shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(var(--accent-rgb),0.3)]",
    },
  ];

  const features = [
    { icon: Trophy, text: "Regular coding contests" },
    { icon: Laptop, text: "Hands-on workshops" },
    { icon: Calendar, text: "Tech talks and seminars" },
    { icon: Users, text: "Networking opportunities" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-background text-foreground"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-grid-small-primary opacity-10" />

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
            className="absolute -top-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px]"
          />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 justify-center mb-4"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary" />
              <span className="text-primary font-mono text-sm">DISCOVER</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 font-display">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
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
                School of Competitive Coding
              </code>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SOCC is a student-led initiative dedicated to fostering excellence
            in competitive programming and algorithmic problem-solving. We aim
            to create a collaborative environment where coding enthusiasts can
            learn, grow, and excel together.
          </p>
        </motion.div>

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
                className={`relative h-full border-0 bg-card/40 backdrop-blur-sm transition-all duration-500 ${card.shadow}`}
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
                      <card.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold mb-3 font-display transition-all duration-500 ease-out">
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
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <span className="text-sm font-mono text-muted-foreground">
                      {card.stats}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 font-display">
            What We Offer
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4 font-display">
            Ready to Level Up Your Coding Skills?
          </h3>
          <p className="text-muted-foreground mb-8">
            Join SOCC today and embark on your journey to becoming a coding
            champion!
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/80 transition-colors duration-300">
            Join SOCC Now
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
