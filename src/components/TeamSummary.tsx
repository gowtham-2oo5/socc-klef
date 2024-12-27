"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead Instructor",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Sarah Lee",
    role: "Algorithm Specialist",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Michael Chen",
    role: "Competitive Programming Coach",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Emily Taylor",
    role: "Community Manager",
    image: "/placeholder.svg?height=120&width=120",
  },
];

const TeamSummary = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="team" className="py-20 bg-[#030712] relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center font-mono">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
            Our Team
          </span>
        </h2>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
              }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-0 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  <div className="mb-4 p-1 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 font-mono text-white group-hover:text-blue-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/team">
            <Button
              variant="outline"
              size="lg"
              className="group overflow-hidden relative border-blue-500 text-blue-500 hover:text-white"
            >
              <span className="relative z-10">View Full Team</span>
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSummary;
